import * as Joi from 'joi';

export const redisValidatorSchema = Joi.object({
	REDIS_USERNAME: Joi.string(),
	REDIS_PASSWORD: Joi.string(),
	REDIS_PORT: Joi.number().default(34023),
	REDIS_URL: Joi.string(),
});
