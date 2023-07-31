import { MailerService as NodemailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IMailerService } from '../interfaces';

@Injectable()
export class MailerService implements IMailerService {
	constructor(private readonly mailerService: NodemailerService) {}

	sendOtpMail(to: string, otp: string): void {
		this.mailerService
			.sendMail({
				to,
				subject: 'Send OTP to active account ✔',
				template: 'otp',
				context: {
					otp,
				},
			})
			.catch((err) => err);
	}
}
