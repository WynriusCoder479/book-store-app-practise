import { HydratedDocument } from 'mongoose';
import { UserModel } from './user.model';
import { SchemaFactory } from '@nestjs/mongoose';
export { UserModel };

export type UserDocument = HydratedDocument<UserModel>;
export const UserSchema = SchemaFactory.createForClass(UserModel);
