import { BaseModel } from '@/common/base';
import { Prop, Schema } from '@nestjs/mongoose';
import { GENDER, ROLES } from '../types';

@Schema({
	collection: 'users',
	timestamps: {
		createdAt: true,
		updatedAt: true,
	},
	toJSON: {
		getters: true,
	},
})
export class UserModel extends BaseModel {
	@Prop({
		required: true,
		unique: true,
	})
	username: string;

	@Prop({
		required: true,
		unique: true,
		match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
	})
	email: string;

	@Prop({
		required: true,
		unique: true,
		match: /^([+]\d{2})?\d{10}$/,
		get: (phoneNumber: string) => {
			if (!phoneNumber) return;

			return `****-***-${phoneNumber.slice(phoneNumber.length - 4)}`;
		},
	})
	phoneNumber: string;

	@Prop({
		required: true,
	})
	password: string;

	@Prop({ required: true })
	firstname: string;

	@Prop({ require: true })
	lastname: string;

	@Prop({
		enum: ROLES,
		default: ROLES.COMMON,
	})
	roles?: string;

	@Prop({
		enum: GENDER,
		default: GENDER.FEMALE,
	})
	gender?: string;

	@Prop({
		required: true,
	})
	dateOfBirth: string;

	@Prop({
		default: 'Default avatar',
	})
	avatar?: string;

	@Prop({
		default: false,
	})
	isActive?: boolean;

	@Prop({
		default: null,
	})
	refreshToken?: string;
}
