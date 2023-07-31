import {
	checkExistAndCreateFolder,
	checkExistFile,
	createKeyPair,
} from '@/common/utils';
import * as fs from 'fs';
import * as path from 'path';

export function getRefreshTokenKeyPair() {
	checkExistAndCreateFolder(`../../secure`);

	const refreshTokenPrivateKeyPath = path.join(
		__dirname,
		`../../../secure/refresh_token_private.key`,
	);

	const refreshTokenPublicKeyPath = path.join(
		__dirname,
		`../../../secure/refresh_token_public.key`,
	);

	//check refresh token key file is existed
	const refreshTokenPrivateKeyExist = checkExistFile(
		refreshTokenPrivateKeyPath,
	);
	const refreshTokenPublicExist = checkExistFile(refreshTokenPublicKeyPath);

	if (!refreshTokenPrivateKeyExist || !refreshTokenPublicExist) {
		//if key file doesn't exist, will create a new key pair
		createKeyPair({
			privateKeyPath: refreshTokenPrivateKeyPath,
			publicKeyPath: refreshTokenPublicKeyPath,
		});
	}

	const refreshTokenPrivateKey = fs.readFileSync(
		refreshTokenPrivateKeyPath,
		'utf-8',
	);

	const refreshTokenPublicKey = fs.readFileSync(
		refreshTokenPublicKeyPath,
		'utf-8',
	);

	return {
		refreshTokenPrivateKey,
		refreshTokenPublicKey,
	};
}
