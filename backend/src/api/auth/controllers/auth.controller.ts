import { CreateUserDto } from '@api/users/dtos';
import { UserDto } from '@api/users/dtos/user.dto';
import { ResponseType } from '@common/types';
import { USERS_SERVICE } from '@api/users/services';
import { IUserService } from '@api/users/services/interfaces';
import {
	Body,
	Controller,
	HttpStatus,
	Inject,
	Post,
	Res,
} from '@nestjs/common';
import { Response } from 'express';
import * as argon2 from 'argon2';
import { plainToClass } from 'class-transformer';

import { MAILER_SERVICE } from '@common/mailer';
import { IMailerService } from '@common/mailer/interfaces';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { genOtp } from '@common/utils';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject(USERS_SERVICE) private readonly userService: IUserService,
		@Inject(MAILER_SERVICE) private readonly mailerService: IMailerService,
		@Inject(CACHE_MANAGER) private readonly cache: Cache,
	) {}

	@Post('sign-up')
	async signUp(
		@Body() createUserDto: CreateUserDto,
		@Res() res: Response<ResponseType<UserDto>>,
	) {
		const newUser = await this.userService.create({
			...createUserDto,
			hashedPassword: await argon2.hash(createUserDto.password),
		});

		const otp = genOtp();

		await this.cache.set(otp, newUser.email, 1800 * 1000);

		this.mailerService.sendOtpMail(newUser.email, otp);

		return res.status(HttpStatus.CREATED).json({
			status: HttpStatus.CREATED,
			message: 'User signed up successfully',
			data: plainToClass(UserDto, newUser, { excludeExtraneousValues: true }),
		});
	}
}
