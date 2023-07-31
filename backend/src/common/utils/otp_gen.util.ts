import * as otp from 'otp-generator';

export function genOtp() {
	return otp.generate(6, {
		lowerCaseAlphabets: false,
		specialChars: false,
		upperCaseAlphabets: false,
	});
}
