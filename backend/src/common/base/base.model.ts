import { Prop } from '@nestjs/mongoose';
import { Expose, Transform } from 'class-transformer';

export class BaseModel {
	@Expose()
	@Transform((value) => value.obj?._id?.toString(), { toClassOnly: true })
	id?: string;

	@Prop({ default: null })
	deletedAt?: Date;
}
