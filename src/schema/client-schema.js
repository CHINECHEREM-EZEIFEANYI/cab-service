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
    currentlocation: Joi.object().keys({
        type: Joi.string()
            .required()
            .valid(["Point"]),
        coordinates: Joi.array().ordered([
            Joi.number()
                .min(7.24)
                .max(7.46)
                .required(),
            Joi.number()
                .min(6.7)
                .max(6.9)
                .required()
        ])
    
        .description("Please use this format [ longitude, latitude]")

    }), 
    dateCreated: Joi.date()
        .integer()
        .min(2023)
        .max(2099),
    updateDate: Joi.date()
        .integer()
        .min(2023)
        .max(2099)

})
const userSchema = new mongoose.Schema({
    id: String,
    FirstName: String,
    LastName: String,
    email: String,
    phoneNumber: Number,
    currentlocation: Object,
    dateCreated: Date,
    updateDate: Date
});

exports.userModel = mongoose.model('client', userSchema);
let data = {
    id,
    FirstName,
    UserName,
    email,
    phoneNumber,
    currentlocation,
    dateCreated,
    updateDate
}


Joi.validate(data, validator, (err, value) => {

    if (err) {

        console.log(err.details);

    } else {

        console.log(value);
    }
});