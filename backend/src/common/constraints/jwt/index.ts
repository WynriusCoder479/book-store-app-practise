import { getAccessTokenKeyPair } from './access_token.constraint';
import { getRefreshTokenKeyPair } from './refresh_token.constraint';

export const { accessTokenPrivateKey, accessTokenPublicKey } =
	getAccessTokenKeyPair();

export const { refreshTokenPrivateKey, refreshTokenPublicKey } =
	getRefreshTokenKeyPair();
