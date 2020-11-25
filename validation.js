const Joi = require('joi');

const registerValidation = (data) => {
	const schema = Joi.object({
		first_name: Joi.string().min(1).max(255).required(),
		last_name: Joi.string().min(1).max(255).required(),
		username: Joi.string().min(1).max(255).required(),
		password: Joi.string().min(1).max(255).required(),
	});
	return schema.validate(data);
};

const loginValidation = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(1).max(255).required(),
		password: Joi.string().min(1).max(255).required(),
	});
	return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
