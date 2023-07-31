import { ResponseType } from '@/common/types';
import {
	BadRequestException,
	Inject,
	Injectable,
	NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { USERS_SERVICE } from '../services';
import { IUserService } from '../services/interfaces';

@Injectable()
export class CheckUserExistedMiddleware implements NestMiddleware {
	constructor(
		@Inject(USERS_SERVICE) private readonly userService: IUserService,
	) {}

	async use(req: Request, res: Response<ResponseType>, next: NextFunction) {
		const email =
			req.params.email !== undefined ? req.params.email : res.locals.email;

		const user = await this.userService.findOne({
			email,
		});

		if (!user) throw new BadRequestException('User not found');

		res.locals.user = user;

		return next();
	}
}
