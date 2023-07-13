const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
const userID = Joi.string().guid({ version: 'uuidv4' })
exports.validator = Joi.object({
    id: userID.required()
        .required()
        .strict(),
    FirstName: Joi.string()
        .alpha()
        .min(3)
        .max(50)
        .required(),
    LastName: Joi.string()
        .alpha()
        .min(3)
        .max(50)
        .required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] }
        })
        .lowercase(),
    phoneNumber: Joi.string()
        .regex(/^\d{3}-\d{3}-\d{4}$/)
        .required(),

})