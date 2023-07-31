import { DATABASE_CONFIG } from '@common/config/data';
import { IDatabaseConfig } from '@common/config/interfaces';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				const databaseConfig =
					configService.get<IDatabaseConfig>(DATABASE_CONFIG);

				return {
					dbName: databaseConfig.mongo.dbName,
					uri: databaseConfig.mongo.dbUrl,
				};
			},
		}),

		CacheModule.registerAsync({
			inject: [ConfigService],
			isGlobal: true,
			useFactory: async (configService: ConfigService) => {
				const databaseConfig =
					configService.get<IDatabaseConfig>(DATABASE_CONFIG);

				return {
					store: await redisStore({
						url: databaseConfig.redis.url,
					}),
					isGlobal: true,
				};
			},
		}),
	],
})
export class DatabaseModule {}
