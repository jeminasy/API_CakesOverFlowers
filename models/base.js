const mongoose = require('mongoose');
const Joi = require('joi');

const baseSchema = new mongoose.Schema({
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
const Base = mongoose.model('Base', baseSchema);

function validateBase(base) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        price: Joi.number().min(0).required()
    });
    return schema.validate(base);
}

exports.baseSchema = baseSchema;
exports.Base = Base;
exports.validate = validateBase;