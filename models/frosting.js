const mongoose = require('mongoose');
const Joi = require('joi');

const frostingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        lowercase: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});
const Frosting = mongoose.model('Frosting', frostingSchema);

function validateFrosting(frosting) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        price: Joi.number().min(0).required()
    });
    return schema.validate(frosting);
}

exports.frostingSchema = frostingSchema;
exports.Frosting = Frosting;
exports.validate = validateFrosting;