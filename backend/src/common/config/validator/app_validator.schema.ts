import * as Joi from 'joi';

export const appValidatorSchema = Joi.object({
	NODE_ENV: Joi.string()
		.valid('development', 'production', 'provision', 'testing')
		.default('development'),
	PORT: Joi.number().default(8080),
	API_VERSION: Joi.number(),
	GRAPHQL_SCHEMA_FILE_PATH: Joi.string(),
});
