import { LoggerConfig } from '@common/config/data';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
	WinstonModuleOptionsFactory,
	WinstonModuleOptions,
	utilities as WinstonModuleUtilities,
} from 'nest-winston';

import { addColors, format, transports } from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class WinstonConfigurationService
	implements WinstonModuleOptionsFactory
{
	constructor(
		@Inject(LoggerConfig.KEY)
		private readonly loggerConfig: ConfigType<typeof LoggerConfig>,
	) {}

	private levels: Record<string, number> = {
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		debug: 4,
	};

	private colors: Record<string, string> = {
		error: 'red',
		warn: 'yellow',
		info: 'green',
		debug: 'white',
		http: 'magenta',
	};

	private formatConsole = format.combine(
		format.splat(),
		format.timestamp({
			format: this.loggerConfig.datetimePartern,
		}),
		format.colorize({
			all: true,
		}),
		WinstonModuleUtilities.format.nestLike('server', {
			colors: true,
			prettyPrint: true,
		}),
	);

	private formatFile = format.combine(
		format.splat(),
		format.colorize(),
		format.timestamp(),
		format.prettyPrint(),
	);

	public createWinstonModuleOptions(): WinstonModuleOptions {
		addColors(this.colors);

		return {
			levels: this.levels,
			transports: [
				new transports.Console({
					level: 'debug',
					format: this.formatConsole,
				}),
				new transports.DailyRotateFile({
					level: 'error',
					filename: this.loggerConfig.errorLogsFilePath,
					datePattern: this.loggerConfig.datePartern,
					zippedArchive: false,
					maxFiles: this.loggerConfig.expiredFile,
					format: this.formatFile,
				}),
				new transports.DailyRotateFile({
					filename: this.loggerConfig.combineLogsFilePath,
					datePattern: this.loggerConfig.datePartern,
					zippedArchive: false,
					maxFiles: this.loggerConfig.expiredFile,
					format: this.formatFile,
				}),
			],
		};
	}
}
