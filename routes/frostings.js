const { Frosting, validate } = require('../models/frosting');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', async (req, res) => {
    const frosting = await Frosting.find().sort('name');
    res.send(frosting);
});

router.get('/:id', async (req, res) => {
    const frosting = await Frosting.findById(req.params.id);
    if (!frosting) return res.status(404).send('The Frosting with the given ID does not exist.');
    res.send(frosting);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let frosting = new Frosting({ 
        name: req.body.name,
        price: req.body.price 
    });
    frosting = await frosting.save();
    res.send(frosting);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const frosting = await Frosting.findByIdAndUpdate(req.params.id, { 
        name: req.body.name,
        price: req.body.price
    }, {new: true});
    
    if (!frosting) return res.status(404).send('The Frosting with the given ID does not exist.');

    res.send(frosting);
});

router.delete('/:id', async (req, res) => {
    const frosting = await Frosting.findByIdAndRemove(req.params.id);

    if (!frosting) return res.status(404).send('The Frosting with the given ID does not exist.');

    res.send(frosting);
});

module.exports = router;