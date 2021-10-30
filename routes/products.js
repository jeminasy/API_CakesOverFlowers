const { Product, validate } = require('../models/product');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', async (req, res) => {
    const product = await Product.find().sort('name');
    res.send(product);
});

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('The Product with the given ID does not exist.');
    res.send(product);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = new Product({ 
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price 
    });
    product = await product.save();
    res.send(product);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = await Product.findByIdAndUpdate(req.params.id, { 
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price 
    }, {new: true});
    
    if (!product) return res.status(404).send('The Product with the given ID does not exist.');

    res.send(product);
});

router.delete('/:id', async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) return res.status(404).send('The Product with the given ID does not exist.');

    res.send(product);
});

module.exports = router;