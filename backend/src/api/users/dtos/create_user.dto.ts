import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsPhoneNumber,
	IsStrongPassword,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';
import { GENDER } from '../types';

export class CreateUserDto {
	@IsNotEmpty()
	@MinLength(4)
	@MaxLength(50)
	@Matches(/^[^@\s]+$/)
	username: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsPhoneNumber('VN')
	phoneNumber: string;

	@IsNotEmpty()
	@MaxLength(100)
	@IsStrongPassword({
		minLength: 8,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	})
	password: string;

	@IsNotEmpty()
	firstname: string;

	@IsNotEmpty()
	lastname: string;

	@IsNotEmpty()
	@IsEnum(GENDER)
	gender: string;

	roles: string;

	@IsNotEmpty()
	dateOfBirth: string;

	avatar: string;
}
