declare global {
	namespace NodeJS {
		interface ProcessEnv {
			REDIS_USERNAME: string;
			REDIS_PASSWORD: string;
			REDIS_PORT: string;
			REDIS_URL: string;
		}
	}
}

export {};
