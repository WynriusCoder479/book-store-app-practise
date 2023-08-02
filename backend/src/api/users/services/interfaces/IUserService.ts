import { IBaseService } from '@/common/base/interfaces';
import { UserModel } from '../../models';

export interface IUserService extends IBaseService<UserModel> {
	findByEmail(email: string): Promise<UserModel>;
}
