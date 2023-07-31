import * as Joi from 'joi';
import { appValidatorSchema } from './app_validator.schema';
import { mongoValiatorSchema } from './mongo_validator.schema';
import { redisValidatorSchema } from './redis_validator.schema';
import { loggerValidatorSchema } from './logger_validator.schema';
import { mailerValidatorSchema } from './mailer_validator.schema';

function mergeSchemas(...schemas: Joi.ObjectSchema<any>[]): Joi.ObjectSchema {
	return schemas.reduce((mergedSchema, schema) => mergedSchema.concat(schema));
}

export const validationSchema = mergeSchemas(
	appValidatorSchema,
	mongoValiatorSchema,
	redisValidatorSchema,
	loggerValidatorSchema,
	mailerValidatorSchema,
);
