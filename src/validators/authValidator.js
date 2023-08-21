const Joi = require("joi");

const AuthValidator = {
  Registerschema: Joi.object({
    FirstName: Joi.string().min(3).max(50).required(),
    LastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(1000).required(),
    phoneNumber: Joi.number().min(6).max(15).required()
  }),
  Loginschema: Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(1000).required(),
  }),
};

module.exports = AuthValidator;
