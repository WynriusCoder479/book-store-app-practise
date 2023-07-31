import * as Joi from 'joi';

export const mailerValidatorSchema = Joi.object({
	MAIL_HOST: Joi.string(),
	MAIL_PORT: Joi.string(),
	MAIL_USER: Joi.string(),
	MAIL_PASS: Joi.string(),
});
