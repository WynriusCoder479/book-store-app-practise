import { registerAs } from '@nestjs/config';
import { MAILER_CONFIG } from '.';
import { IMailerConfig } from '../interfaces';

export const MailerConfig = registerAs(
	MAILER_CONFIG,
	(): IMailerConfig => ({
		mailHost: process.env.MAIL_HOST,
		mailUser: process.env.MAIL_USER,
		mailPass: process.env.MAIL_PASS,
		mailPort: parseInt(process.env.MAIL_PORT),
		mailTransport: process.env.MAIL_TRANSPORT,
	}),
);
