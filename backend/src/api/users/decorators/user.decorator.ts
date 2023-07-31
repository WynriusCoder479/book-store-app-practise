import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Response } from 'express';
import { UserDto } from '../dtos';

export const User = createParamDecorator(
	(data: unknown, context: ExecutionContext) => {
		const response = context.switchToHttp().getResponse<Response>();

		return plainToClass(UserDto, response.locals.user);
	},
);

export const Email = createParamDecorator(
	(data: unknown, context: ExecutionContext) => {
		const response = context.switchToHttp().getResponse<Response>();

		return response.locals.email;
	},
);

export const Otp = createParamDecorator(
	(data: unknown, context: ExecutionContext) => {
		const response = context.switchToHttp().getResponse<Response>();

		return response.locals.otp;
	},
);
