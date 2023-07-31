import * as Joi from 'joi';

export const loggerValidatorSchema = Joi.object({
	ERROR_LOGS_FILE_PATH: Joi.string(),
	COMBINE_LOGS_FILE_PATH: Joi.string(),
	EXPIRED_FILE: Joi.string(),
});
