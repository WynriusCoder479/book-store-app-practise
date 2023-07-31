import * as path from 'path';
import * as fs from 'fs';

export function checkExistAndCreateFolder(pathName: string) {
	const checkPath = path.join(__dirname, pathName);

	!fs.existsSync(checkPath) && fs.mkdir(checkPath, (err) => err);
}

export function checkExistFile(pathName: string) {
	return fs.existsSync(pathName);
}
