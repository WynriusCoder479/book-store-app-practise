import { BaseDto } from '@/common/base';
import { Expose, Transform } from 'class-transformer';

export class UserDto extends BaseDto {
	@Expose()
	username: string;

	@Expose()
	email: string;

	@Expose()
	phoneNumber: string;

	hashedPassword: string;

	firstname: string;

	lastname: string;

	@Expose()
	@Transform(({ obj }) => `${obj.firstname} ${obj.lastname}`)
	fullname: string;

	@Expose()
	roles?: string;

	@Expose()
	gender?: string;

	@Expose()
	dateOfBirth: string;

	@Expose()
	avatar?: string;

	@Expose()
	isActive?: boolean;

	@Expose()
	refreshToken?: string;
}
