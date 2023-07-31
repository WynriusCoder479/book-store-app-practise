import { Expose } from 'class-transformer';

export class BaseDto {
	@Expose()
	id: string;

	@Expose()
	deletedAt: Date;

	@Expose()
	createdAt: Date;

	@Expose()
	updatedAt: Date;
}
