import * as Joi from 'joi';

export const mongoValiatorSchema = Joi.object({
	DB_USERNAME: Joi.string(),
	DB_PASSWORD: Joi.string(),
	DB_NAME: Joi.string(),
	DB_URL: Joi.string(),
});
