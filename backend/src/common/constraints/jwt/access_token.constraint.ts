import {
	checkExistAndCreateFolder,
	checkExistFile,
	createKeyPair,
} from '@/common/utils';
import * as fs from 'fs';
import * as path from 'path';

export function getAccessTokenKeyPair() {
	checkExistAndCreateFolder(`../../secure`);

	const accessTokenPrivateKeyPath = path.join(
		__dirname,
		`../../../secure/access_token_private.key`,
	);

	const accessTokenPublicKeyPath = path.join(
		__dirname,
		`../../../secure/access_token_public.key`,
	);

	//check access token key file is existed
	const accessTokenPrivateKeyExist = checkExistFile(accessTokenPrivateKeyPath);
	const accessTokenPublicExist = checkExistFile(accessTokenPublicKeyPath);

	if (!accessTokenPrivateKeyExist || !accessTokenPublicExist) {
		//if key file doesn't exist, will create a new key pair
		createKeyPair({
			privateKeyPath: accessTokenPrivateKeyPath,
			publicKeyPath: accessTokenPublicKeyPath,
		});
	}

	const accessTokenPrivateKey = fs.readFileSync(
		accessTokenPrivateKeyPath,
		'utf-8',
	);

	const accessTokenPublicKey = fs.readFileSync(
		accessTokenPublicKeyPath,
		'utf-8',
	);

	return {
		accessTokenPrivateKey,
		accessTokenPublicKey,
	};
}
