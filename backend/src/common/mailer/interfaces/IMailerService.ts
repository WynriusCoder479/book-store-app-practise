export interface IMailerService {
	sendOtpMail(to: string, otp: string): void;
}
