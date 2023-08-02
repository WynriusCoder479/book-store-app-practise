import { Module } from '@nestjs/common';
import { UsersModule } from '../users';
import { MailerModule } from '@/common/mailer';
import { AuthController } from './controllers';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_SERVICE, CREDENTIAL_SERVICE } from '.';
import { CredentialService } from './services';
import { AuthService } from './services/auth.service';

@Module({
	imports: [UsersModule, MailerModule, PassportModule, JwtModule.register({})],
	controllers: [AuthController],
	providers: [
		{
			provide: CREDENTIAL_SERVICE,
			useClass: CredentialService,
		},
		{
			provide: AUTH_SERVICE,
			useClass: AuthService,
		},
	],
	exports: [
		{
			provide: CREDENTIAL_SERVICE,
			useClass: CredentialService,
		},
		{
			provide: AUTH_SERVICE,
			useClass: AuthService,
		},
	],
})
export class AuthModule {}
