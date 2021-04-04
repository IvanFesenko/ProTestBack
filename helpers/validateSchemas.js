const Joi = require('joi');

const registrationValidateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
});

const loginUserValidateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  token: Joi.string(),
});

module.exports = {
  registrationValidateSchema,
  loginUserValidateSchema,
};
