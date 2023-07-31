export interface ILoggerService {
	error(message: string | string[], stack?: string): void;
	warn(message: string): void;
	info(message: any): void;
	http(message: string): void;
	debug(message: string): void;
}
