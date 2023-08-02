import { ITokenPayload } from './ITokenPayload';

export interface ICredentialService {
	generateAccessToken(toKenPayload: Pick<ITokenPayload, 'userId'>): string;
	generateRefreshToken(toKenPayload: ITokenPayload): string;
	storeRefreshToken(userId: string, token: string): Promise<void>;
}
