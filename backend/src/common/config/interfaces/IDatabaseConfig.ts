export interface IDatabaseConfig {
	mongo: {
		dbName: string;
		dbUrl: string;
	};
	redis: {
		url: string;
	};
}
