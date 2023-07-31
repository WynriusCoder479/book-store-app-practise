import { Module } from '@nestjs/common';
import { MailerModule as NodeMailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { IMailerConfig } from '../config/interfaces';
import { MAILER_CONFIG } from '../config/data';
import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MAILER_SERVICE } from '.';
import { MailerService } from './services/mailer.service';

@Module({
	imports: [
		NodeMailerModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const mailerConfig = configService.get<IMailerConfig>(MAILER_CONFIG);

				return {
					transport: {
						host: mailerConfig.mailHost,
						port: mailerConfig.mailPort,
						ignoreTLS: true,
						secure: false,
						auth: {
							user: mailerConfig.mailUser,
							pass: mailerConfig.mailPass,
						},
						tls: {
							rejectUnauthorized: false,
						},
					},
					defaults: {
						from: `"No Reply" <${mailerConfig.mailUser}>`,
					},
					preview: true,
					template: {
						dir: path.join(__dirname, '../../src/templates'),
						adapter: new HandlebarsAdapter(),
						options: {
							strict: true,
						},
					},
				};
			},
		}),
	],
	providers: [
		{
			provide: MAILER_SERVICE,
			useClass: MailerService,
		},
	],
	exports: [
		{
			provide: MAILER_SERVICE,
			useClass: MailerService,
		},
	],
})
export class MailerModule {}
