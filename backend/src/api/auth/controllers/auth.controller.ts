import { CreateUserDto } from '@api/users/dtos';
import { UserDto } from '@api/users/dtos/user.dto';
import { ResponseType } from '@common/types';
import {
	Body,
	Controller,
	HttpStatus,
	Inject,
	Post,
	Res,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Response } from 'express';

import { AUTH_SERVICE } from '..';
import { IAuthService } from '../services/interfaces/IAuthService';
import { SignInDto } from '../dtos';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject(AUTH_SERVICE) private readonly authService: IAuthService,
	) {}

	@Post('sign-up')
	async signUp(
		@Body() createUserDto: CreateUserDto,
		@Res() res: Response<ResponseType<UserDto>>,
	) {
		const newUser = await this.authService.signUp(createUserDto);

		return res.status(HttpStatus.CREATED).json({
			status: HttpStatus.CREATED,
			message: 'User signed up successfully',
			data: plainToClass(UserDto, newUser, { excludeExtraneousValues: true }),
		});
	}

	@Post('sign-in')
	async signIn(
		@Body() signInDto: SignInDto,
		@Res()
		res: Response<
			ResponseType<{ user: UserDto; accessToken: string; refreshToken: string }>
		>,
	) {
		const userSignInData = await this.authService.signIn(signInDto);

		return res.status(HttpStatus.OK).json({
			status: HttpStatus.OK,
			message: 'User signed in successfully',
			data: {
				user: plainToClass(UserDto, userSignInData.user, {
					excludeExtraneousValues: true,
				}),
				accessToken: userSignInData.accessToken,
				refreshToken: userSignInData.refreshToken,
			},
		});
	}
}
