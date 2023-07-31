declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DB_USERNAME: string;
			DB_PASSWORD: string;
			DB_NAME: string;
			DB_URL: string;
		}
	}
}

export {};
