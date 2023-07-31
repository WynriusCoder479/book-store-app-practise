import { registerAs } from '@nestjs/config';
import { JWT_CONFIG } from '.';
import { IJwtConfig } from '../interfaces';

export const JwtConfig = registerAs(
	JWT_CONFIG,
	(): IJwtConfig => ({
		jwtAcessTokenExpirationTime: parseInt(
			process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
		),
		jwtRefreshTokenExpirationTime: parseInt(
			process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
		),
	}),
);
