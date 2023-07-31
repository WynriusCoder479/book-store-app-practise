import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { LOGGER_SERVICE } from '../logger';
import { ILoggerService } from '../logger/interfaces';
import { ResponseType } from '../types';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	constructor(
		@Inject(LOGGER_SERVICE) private readonly logger: ILoggerService,
	) {}

	catch(exception: HttpException, host: ArgumentsHost) {
		const response = host.switchToHttp().getResponse<Response<ResponseType>>();

		const exceptionData = exception.getResponse();

		this.logger.error(exceptionData['message']);

		return response.status(exception.getStatus()).json({
			status: exception.getStatus(),
			message: exception.name.replace(/([a-z])([A-Z])/g, '$1 $2'),
			errors: exceptionData['message'],
		});
	}
}
