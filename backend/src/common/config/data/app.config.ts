import { registerAs } from '@nestjs/config';
import { APP_CONFIG } from '.';
import { IAppConfig } from '../interfaces';

export const AppConfig = registerAs(
	APP_CONFIG,
	(): IAppConfig => ({
		nodeEnv: process.env.NODE_ENV,
		port: parseInt(process.env.PORT) || 8080,
		apiPrefix: `/api/v${process.env.API_VERSION}`,
	}),
);
