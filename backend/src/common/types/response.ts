export type ResponseType<T = null> = {
	status: number;
	message?: string;
	data?: T;
	errors?: {
		response: string;
		stack: string;
	};
};
