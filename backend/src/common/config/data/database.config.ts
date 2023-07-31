import { registerAs } from '@nestjs/config';
import { DATABASE_CONFIG } from '.';
import { IDatabaseConfig } from '../interfaces';

export const DatabaseConfig = registerAs(
	DATABASE_CONFIG,
	(): IDatabaseConfig => ({
		mongo: {
			dbName: process.env.DB_NAME,
			dbUrl: process.env.DB_URL,
		},
		redis: {
			url: process.env.REDIS_URL,
		},
	}),
);
