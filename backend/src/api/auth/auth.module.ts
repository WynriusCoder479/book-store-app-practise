import { Module } from '@nestjs/common';
import { UsersModule } from '../users';
import { MailerModule } from '@/common/mailer';
import { AuthController } from './controllers';

@Module({
	imports: [UsersModule, MailerModule],
	controllers: [AuthController],
})
export class AuthModule {}
