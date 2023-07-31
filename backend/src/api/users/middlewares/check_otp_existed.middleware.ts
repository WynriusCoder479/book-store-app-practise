import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
	BadRequestException,
	Inject,
	Injectable,
	NestMiddleware,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { NextFunction, Request, Response } from 'express';
import { USERS_SERVICE } from '../services';
import { IUserService } from '../services/interfaces';

@Injectable()
export class CheckOtpExistedMiddleware implements NestMiddleware {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cache: Cache,
		@Inject(USERS_SERVICE) private readonly userService: IUserService,
	) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const otp = req.params.otp;

		const email = await this.cache.get(otp);

		if (!email) throw new BadRequestException('Otp is wrong');

		res.locals.email = email;

		return next();
	}
}
