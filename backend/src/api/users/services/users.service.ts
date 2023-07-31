import { BaseService } from '@/common/base';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../models';
import { IUserService } from './interfaces';
import { UsersRepository } from '../repositories';

@Injectable()
export class UserService
	extends BaseService<UserModel>
	implements IUserService
{
	constructor(private readonly usersRepository: UsersRepository) {
		super(usersRepository);
	}
}
