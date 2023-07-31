import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
import { BaseModel } from './base.model';

export abstract class BaseRepository<T extends BaseModel> {
	protected constructor(private readonly model: Model<T>) {
		this.model = model;
	}

	async create(dto: T): Promise<T> {
		const createEntity = new this.model(dto);

		return await createEntity.save();
	}

	async findById(id: string, options?: QueryOptions): Promise<T> {
		return this.model.findById(id, options);
	}

	async findOne(
		filter: FilterQuery<T>,
		projection?: ProjectionType<T>,
		options?: QueryOptions,
	) {
		return await this.model.findOne(filter, projection, options);
	}

	async findAll(
		filter?: FilterQuery<T>,
		options?: QueryOptions<T>,
	): Promise<{ items: T[]; count: number }> {
		const [count, items] = await Promise.all([
			this.model.count({ ...filter, deletedAt: null }),
			this.model.find(
				{ ...filter, deletedAt: null },
				options?.projection,
				options,
			),
		]);

		return {
			items,
			count,
		};
	}

	async updateById(id: string, dto: Partial<T>): Promise<T> {
		return await this.model.findOneAndUpdate(
			{ _id: id, deletedAt: null },
			dto,
			{ new: true },
		);
	}

	async softDelete(id: string): Promise<boolean> {
		const deleteItem = await this.model.findById(id);

		if (!deleteItem) return false;

		return !!(await this.model
			.findByIdAndUpdate<T>(id, {
				deleteAt: new Date(),
			})
			.exec());
	}

	async permanetlyDelete(id: string): Promise<boolean> {
		const deleteItem = await this.model.findById(id);

		if (!deleteItem) return false;

		return !!(await this.model.findByIdAndDelete(id));
	}
}
