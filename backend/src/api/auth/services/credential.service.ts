import { USERS_SERVICE } from '@/api/users/services';
import { IUserService } from '@/api/users/services/interfaces';
import { JwtConfig } from '@/common/config/data';
import {
	accessTokenPrivateKey,
	refreshTokenPrivateKey,
} from '@/common/constraints/jwt';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ICredentialService, ITokenPayload } from './interfaces';

@Injectable()
export class CredentialService implements ICredentialService {
	constructor(
		@Inject(USERS_SERVICE) private readonly userService: IUserService,
		@Inject(JwtConfig.KEY)
		private readonly jwtConfig: ConfigType<typeof JwtConfig>,
		private readonly jwtService: JwtService,
	) {}

	generateAccessToken(toKenPayload: Pick<ITokenPayload, 'userId'>): string {
		return this.jwtService.sign(toKenPayload, {
			algorithm: 'RS256',
			privateKey: accessTokenPrivateKey,
			expiresIn: this.jwtConfig.jwtAcessTokenExpirationTime,
		});
	}

	generateRefreshToken(toKenPayload: ITokenPayload): string {
		return this.jwtService.sign(toKenPayload, {
			algorithm: 'RS256',
			privateKey: refreshTokenPrivateKey,
			expiresIn: this.jwtConfig.jwtRefreshTokenExpirationTime,
		});
	}

	async storeRefreshToken(userId: string, token: string): Promise<void> {
		try {
			await this.userService.updateById(userId, {
				refreshToken: token,
			});
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
