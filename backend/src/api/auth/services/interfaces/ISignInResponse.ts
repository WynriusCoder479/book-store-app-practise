import { UserModel } from '@/api/users/models';

export interface ISignInResponse {
	user: UserModel;
	accessToken: string;
	refreshToken: string;
}
