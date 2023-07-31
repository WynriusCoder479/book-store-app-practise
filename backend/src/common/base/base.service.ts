import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';
import { BaseModel } from './base.model';
import { BaseRepository } from './base.repository';
import { IBaseService } from './interfaces';

export abstract class BaseService<T extends BaseModel>
	implements IBaseService<T>
{
	constructor(private readonly repository: BaseRepository<T>) {}

	async create(createDto: T): Promise<T | null> {
		try {
			const newEntity = await this.repository.create(createDto);

			return newEntity;
		} catch (error) {
			console.error(error);
			throw new BadRequestException(error.message);
		}
	}

	async findOne(
		entityFilterQuery: FilterQuery<T>,
		projection?: ProjectionType<T>,
		options?: QueryOptions,
	): Promise<T> {
		try {
			return await this.repository.findOne(
				entityFilterQuery,
				projection,
				options,
			);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	async findById(id: string): Promise<T | null> {
		try {
			return await this.repository.findById(id);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	async findAll(
		entityFilterQuery?: FilterQuery<T>,
		projection?: Record<string, unknown>,
	): Promise<{ items: T[]; count: number } | null> {
		try {
			return await this.repository.findAll(entityFilterQuery, projection);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	async updateById(id: string, updateEntityData: Partial<T>): Promise<T> {
		try {
			return await this.repository.updateById(id, updateEntityData);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	async softDelete(id: string): Promise<boolean> {
		try {
			return this.repository.softDelete(id);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	async permanetlyDelete(id: string): Promise<boolean> {
		try {
			return this.repository.permanetlyDelete(id);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
