import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from '@common/config/interfaces';
import { APP_CONFIG } from '@common/config/data';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ILoggerService } from '@common/logger/interfaces';
import { LOGGER_SERVICE } from '@common/logger';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { HttpExceptionFilter } from './common/filters';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: '*',
			credentials: true,
		},
		bodyParser: true,
	});

	const appConfig = app.get(ConfigService).get<IAppConfig>(APP_CONFIG);

	const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

	const loggerService = app.get<ILoggerService>(LOGGER_SERVICE);

	app.useLogger(logger);

	app.setGlobalPrefix(appConfig.apiPrefix);

	app.useGlobalPipes(new ValidationPipe());

	app.useGlobalFilters(new HttpExceptionFilter(loggerService));

	app.use(
		morgan(':method :url :status :res[content-length] - :response-time ms', {
			stream: {
				write: (message) => loggerService.http(message),
			},
		}),
	);

	await app.listen(appConfig.port);
}
bootstrap();
