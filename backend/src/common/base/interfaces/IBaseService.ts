import { FilterQuery } from 'mongoose';
import { BaseModel } from '../base.model';

export interface IBaseService<T extends BaseModel> {
	create(createDto: T): Promise<T | null>;
	findOne(
		entityFilterQuery: FilterQuery<T>,
		projection?: Record<string, unknown>,
	): Promise<T | null>;
	findById(id: string): Promise<T | null>;
	findAll(
		entityFilterQuery?: FilterQuery<T>,
		projection?: Record<string, unknown>,
	): Promise<{ items: T[]; count: number } | null>;
	updateById(id: string, updateEntityData: Partial<T>): Promise<T>;
	softDelete(id: string): Promise<boolean>;
	permanetlyDelete(id: string): Promise<boolean>;
}
