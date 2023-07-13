const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
const userID = Joi.string().guid({ version: 'uuidv4' })
const ImageExtension = require('joi-image-extension')
const Joi = BaseJoi.extend(ImageExtension)

exports.validator = Joi.object.keys({
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
    age: Joi.date()
        .max('1-1-2004')
        .iso()
        .required(),
    profilePhoto: Joi
        .image()
        .minDimensions(100, 50)
        .required(),
    bio: Joi.string()
        .alphanum()
        .min(20)
        .max(240)
        .required(),
    car: Joi.object().keys({
        make: Joi.string()
            .alphanum()
            .min(10)
            .max(30)
            .required(),
        license_plate: Joi.string()
            .alphanum()
            .min(8)
            .max(9)
            .required()

    })



})
const userSchema = new mongoose.Schema({
    id: String,
    FirstName: String,
    LastName: String,
    email: String,
    phoneNumber: Number,
    age: Date,
    profilePhoto: Image,
    bio: String,
    car: Object
});

exports.userModel = mongoose.model('driver', userSchema);
let data = {
    id,
    FirstName,
    UserName,
    email,
    phoneNumber,
    age,
    profilePhoto,
    bio,
    car
}


Joi.validate(data, validator, (err, value) => {

    if (err) {

        console.log(err.details);

    } else {

        console.log(value);
    }
});