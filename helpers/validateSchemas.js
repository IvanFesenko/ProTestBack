const Joi = require('joi');

const registrationValidateSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
});

module.exports = {
    registrationValidateSchema,
};
