import { MAILER_SERVICE } from '@/common/mailer';
import { IMailerService } from '@/common/mailer/interfaces';
import { ResponseType } from '@/common/types';
import { genOtp } from '@/common/utils';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
	Controller,
	Get,
	HttpStatus,
	Inject,
	Param,
	Patch,
	Res,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Response } from 'express';
import { User } from '../decorators';
import { UserModel } from '../models';
import { USERS_SERVICE } from '../services';
import { IUserService } from '../services/interfaces';

@Controller('users')
export class UsersController {
	constructor(
		@Inject(MAILER_SERVICE) private readonly mailerService: IMailerService,
		@Inject(USERS_SERVICE) private readonly userService: IUserService,
		@Inject(CACHE_MANAGER) private readonly cache: Cache,
	) {}

	@Get('otp/:email')
	async resendOtp(@User() user: UserModel, @Res() res: Response<ResponseType>) {
		const otp = genOtp();

		await this.cache.set(otp, user.email, 1800 * 1000);

		this.mailerService.sendOtpMail(user.email, otp);

		return res.status(HttpStatus.OK).json({
			status: HttpStatus.OK,
			message: 'Resend OTP successfully',
		});
	}

	@Patch('active/:otp')
	async activeUsers(
		@Param('otp') otp: string,
		@User() user: UserModel,
		@Res() res: Response<ResponseType>,
	) {
		await this.userService.updateById(user.id, {
			isActive: true,
		});

		this.cache.del(otp);

		return res.status(HttpStatus.OK).json({
			status: HttpStatus.OK,
			message: 'Active user successfully',
		});
	}
}
