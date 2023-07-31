import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerService, WinstonConfigurationService } from './services';
import { LOGGER_SERVICE } from '.';

@Module({
	imports: [
		WinstonModule.forRootAsync({
			useClass: WinstonConfigurationService,
		}),
	],
	providers: [
		{
			provide: LOGGER_SERVICE,
			useClass: LoggerService,
		},
	],
	exports: [
		{
			provide: LOGGER_SERVICE,
			useClass: LoggerService,
		},
	],
})
export class LoggerModule {}
