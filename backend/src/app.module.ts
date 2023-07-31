import { ConfigModule } from '@common/config';
import { DatabaseModule } from '@common/database';
import { LoggerModule } from '@common/logger';
import { Module } from '@nestjs/common';
import { UsersModule } from '@api/users';
import { MailerModule } from './common/mailer';
import { AuthModule } from './api/auth';

@Module({
	imports: [
		LoggerModule,
		DatabaseModule,
		ConfigModule,
		MailerModule,
		UsersModule,
		AuthModule,
	],
})
export class AppModule {}
