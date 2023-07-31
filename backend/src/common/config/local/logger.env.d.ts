declare global {
	namespace NodeJS {
		interface ProcessEnv {
			ERROR_LOGS_FILE_PATH: string;
			COMBINE_LOGS_FILE_PATH: string;
			EXPIRED_FILE: stirng;
		}
	}
}

export {};
