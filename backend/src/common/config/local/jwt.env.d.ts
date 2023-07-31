declare global {
	namespace NodeJS {
		interface ProcessEnv {
			JWT_ACCESS_TOKEN_EXPIRATION_TIME: string;
			JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;
		}
	}
}

export {};
