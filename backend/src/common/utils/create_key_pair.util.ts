import * as crypto from 'crypto';
import * as fs from 'fs';

interface FilePath {
	privateKeyPath: string;
	publicKeyPath;
}

export function createKeyPair(files: FilePath) {
	const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
		modulusLength: 2048,
		publicKeyEncoding: {
			type: 'spki',
			format: 'pem',
		},
		privateKeyEncoding: {
			type: 'pkcs8',
			format: 'pem',
		},
	});

	fs.writeFileSync(files.privateKeyPath, privateKey);
	fs.writeFileSync(files.publicKeyPath, publicKey);
}
