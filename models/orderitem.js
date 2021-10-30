const mongoose = require('mongoose');
const Joi = require('joi');
const { productSchema } = require('./product');
const { baseSchema } = require('./base');
const { frostingSchema } = require('./frosting');
const { addonSchema } = require('./addon');
const { designSchema } = require('./design');

const orderitemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        default: 1
    },
    category: {
        type: String,
        required: true,
        enum: ['product', 'custom'],
        lowercase: true,
        trim: true
    },
    product: {
        type: productSchema,
        required: function() { return (this.category === 'product');}
    },
    base: {
        type: baseSchema,
        required: function() { return (this.category === 'custom');}
    },
    frosting: {
        type: frostingSchema,
        required: function() { return (this.category === 'custom');}
    },
    addon: {
        type: addonSchema,
        required: function() { return (this.category === 'custom');}
    },
    design: {
        type: designSchema,
        required: function() { return (this.category === 'custom');}
    },
    amount: {
        type: Number,
        required: true,
    }
});

const Orderitem = mongoose.model('Orderitem', orderitemSchema);

function validateOrder(orderitem) {
    const schema = Joi.object({
        quantity: Joi.number().default(1),
        category: Joi.string().required(),
        productId: Joi.string(),
        baseId: Joi.string(),
        frostingId: Joi.string(),
        addonId: Joi.string(),
        designId: Joi.string()
    });
    return schema.validate(orderitem);
}

exports.Orderitem = Orderitem;
exports.validate = validateOrder;