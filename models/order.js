const mongoose = require('mongoose');
const Joi = require('joi');
const { orderitemSchema } = require('./orderitem');

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50
    },
    customerEmail: {
        type: String,
        required: true,
    },
    fb_link: {
        type: String,
        // required: true
    },
    ig_link: String,
    phone: {
        type: String,
        required: true,
        minlength:11,
        maxlength: 11
    },
    orderitems: [ orderitemSchema ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
});
const Order = mongoose.model('Order', orderSchema);

function validateOrder(order) {
    const schema = Joi.object({
        name: Joi.string().min(6).max(50).required(),
        email: Joi.string().required(),
        fb_link: Joi.string(),
        ig_link: Joi.string(),
        phone: Joi.string().required(),
        orderitemId: Joi.array().required()
    });
    return schema.validate(order);
}

exports.Order = Order;
exports.validate = validateOrder;