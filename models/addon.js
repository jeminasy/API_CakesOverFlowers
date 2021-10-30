const mongoose = require('mongoose');
const Joi = require('joi');

const addonSchema = new mongoose.Schema({
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
const Addon = mongoose.model('Addon', addonSchema);

function validateAddon(addon) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        price: Joi.number().min(0).required()
    });
    return schema.validate(addon);
}

exports.addonSchema = addonSchema;
exports.Addon = Addon;
exports.validate = validateAddon;