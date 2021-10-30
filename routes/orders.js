const { Order, validate } = require('../models/order');
const { Base } = require('../models/base');
const { Frosting } = require('../models/frosting');
const { Addon } = require('../models/addon');
const { Design } = require('../models/design');
const { Product } = require('../models/product');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', async (req, res) => {
    const orders = await Order.find();
    res.send(orders);
});

router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('The Order with the given ID does not exist');

    res.send(order);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = await Product.findById(req.body.items.productId);
    if (!product) return res.status(404).send('Invalid Product');

    const base = await Base.findById(req.body.items.baseId);
    if (!base) return res.status(404).send('Invalid Base');

    const frosting = await Frosting.findById(req.body.items.frostingId);
    if (!frosting) return res.status(404).send('Invalid Frosting');

    const addon = await Addon.findById(req.body.items.addonId);
    if (!addon) return res.status(404).send('Invalid Add On');

    const design = await Design.findById(req.body.items.designId);
    if (!design) return res.status(404).send('Invalid Design');

    let order = new Order({
        customerName: req.body.name,
        customerEmail: req.body.email,
        fb_link: req.body.fb_link,
        ig_link: req.body.ig_link,
        phone: req.body.phone,
        items: [{
            quantity: req.body.items.quantity,
            category: req.body.items.category,
            product: {
                _id: product.id,
                name: product.name,
                price: product.price
            },
            base: {
                _id: base.id,
                name: base.name,
                price: base.price
            },
            frosting: {
                _id: frosting.id,
                name: frosting.name,
                price: frosting.price
            },
            addon: {
                _id: addon.id,
                name: addon.name,
                price: addon.price
            },
            design: {
                _id: design.id,
                name: design.name
            }
        }]
    });

    order = await order.save();
    res.send(order);
});

module.exports = router;