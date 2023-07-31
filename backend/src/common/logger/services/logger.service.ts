import { Inject, Injectable } from '@nestjs/common';
import { ILoggerService } from '../interfaces';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerService implements ILoggerService {
	constructor(
		@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
	) {}

	public info(message: any): void {
		this.logger.info(message);
	}

	public error(message: string, stack?: string): void {
		this.logger.error(message, stack);
	}

	public warn(message: string): void {
		this.logger.warn(message);
	}

	public http(message: string): void {
		this.logger.http(message);
	}

	public debug(message: string): void {
		this.logger.debug(message);
	}
}
