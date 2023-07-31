import { BaseRepository } from '@/common/base';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../models';

@Injectable()
export class UsersRepository extends BaseRepository<UserDocument> {
	constructor(
		@InjectModel('users') private readonly userModel: Model<UserDocument>,
	) {
		super(userModel);
	}
}
