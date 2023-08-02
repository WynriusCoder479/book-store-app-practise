import { CreateUserDto } from '@/api/users/dtos';
import { UserModel } from '@/api/users/models';
import { SignInDto } from '../../dtos';
import { ISignInResponse } from './ISignInResponse';

export interface IAuthService {
	signIn(signInDto: SignInDto): Promise<ISignInResponse>;
	signUp(createUserDto: CreateUserDto): Promise<UserModel>;
	getAuthenticatedUser(email: string, password: string): Promise<UserModel>;
	getUserWithRefreshTokenMatched(refreshToken: string): Promise<UserModel>;
}
