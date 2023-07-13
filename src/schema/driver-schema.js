const mongoose = require('mongoose');
const Schema = mongoose.Schema;
exports.validator = Joi.object({
    
})





Joi.validate(data, validator, (err, value) => {

    if (err) {

        console.log(err.details);

    } else {

        console.log(value);
    }
});