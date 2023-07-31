declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MAIL_HOST: string;
			MAIL_USER: string;
			MAIL_PASS: string;
			MAIL_PORT: string;
			MAIL_TRANSPORT: string;
		}
	}
}
