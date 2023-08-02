import { UserModel } from '@/api/users/models';
import { Request } from 'express';

export interface RequestWithUser extends Request {
	user: UserModel;
}
