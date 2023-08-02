import { BaseService } from '@/common/base';
import { BadRequestException, Injectable } from '@nestjs/common';
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

	async findByEmail(email: string): Promise<UserModel> {
		try {
			return await this.usersRepository.findOne({ email });
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}
}
