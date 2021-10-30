const mongoose = require('mongoose');
const Joi = require('joi');

const designSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        lowercase: true,
        unique: true
    }
});
const Design = mongoose.model('Design', designSchema);

function validateDesign(design) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    });
    return schema.validate(design);
}

exports.designSchema = designSchema;
exports.Design = Design;
exports.validate = validateDesign;