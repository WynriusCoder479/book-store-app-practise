import { CreateUserDto } from '@/api/users/dtos';
import { UserModel } from '@/api/users/models';
import { USERS_SERVICE } from '@/api/users/services';
import { IUserService } from '@/api/users/services/interfaces';
import { MAILER_SERVICE } from '@/common/mailer';
import { IMailerService } from '@/common/mailer/interfaces';
import { genOtp } from '@/common/utils';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
	BadRequestException,
	Inject,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
	ForbiddenException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { Cache } from 'cache-manager';
import { IAuthService } from './interfaces/IAuthService';
import { CREDENTIAL_SERVICE } from '..';
import { ICredentialService } from './interfaces';
import { SignInDto } from '../dtos';
import { ISignInResponse } from './interfaces/ISignInResponse';

@Injectable()
export class AuthService implements IAuthService {
	constructor(
		@Inject(USERS_SERVICE) private readonly userService: IUserService,
		@Inject(MAILER_SERVICE) private readonly mailerService: IMailerService,
		@Inject(CACHE_MANAGER) private readonly cache: Cache,
		@Inject(CREDENTIAL_SERVICE)
		private readonly credentialService: ICredentialService,
	) {}

	async signUp(createUserDto: CreateUserDto): Promise<UserModel> {
		try {
			const existedUser = await this.userService.findOne({
				username: createUserDto.username,
				email: createUserDto.email,
			});

			if (existedUser) throw new BadRequestException('User is existed');

			const newUser = await this.userService.create({
				...createUserDto,
				password: await argon2.hash(createUserDto.password),
			});

			const otp = genOtp();

			await this.cache.set(otp, newUser.email, 1800 * 1000);

			this.mailerService.sendOtpMail(newUser.email, otp);

			return newUser;
		} catch (error) {
			throw new InternalServerErrorException(error.message);
		}
	}

	async signIn(signInDto: SignInDto): Promise<ISignInResponse> {
		const emailPatern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/;

		try {
			const isEmail = emailPatern.test(signInDto.usernameOrEmail);

			const user = await this.userService.findOne(
				isEmail
					? { email: signInDto.usernameOrEmail }
					: { username: signInDto.usernameOrEmail },
			);

			if (!user) throw new BadRequestException('User not found');

			if (!user.isActive)
				throw new ForbiddenException('User account is unactive');

			const verifyPassword = argon2.verify(user.password, signInDto.password);

			if (!verifyPassword) throw new UnauthorizedException('Wrong password');

			const accessToken = this.credentialService.generateAccessToken({
				userId: user.id,
			});

			const refreshToken = this.credentialService.generateRefreshToken({
				userId: user.id,
				isActive: user.isActive,
			});

			await this.credentialService.storeRefreshToken(user.id, refreshToken);
			return { user, accessToken, refreshToken };
		} catch (error) {
			throw error;
		}
	}

	async getAuthenticatedUser(
		email: string,
		password: string,
	): Promise<UserModel> {
		try {
			const user = await this.userService.findByEmail(email);

			const verifyPassword = argon2.verify(user.password, password);

			if (!verifyPassword) throw new UnauthorizedException('Wrong password');

			return user;
		} catch (error) {
			throw new BadRequestException('Wrong credentials');
		}
	}

	async getUserWithRefreshTokenMatched(
		refreshToken: string,
	): Promise<UserModel> {
		try {
			const user = await this.userService.findOne({ refreshToken });

			if (!user) throw new BadRequestException('Unexpected token');

			return user;
		} catch (error) {
			throw new BadRequestException('Undefined token');
		}
	}
}
