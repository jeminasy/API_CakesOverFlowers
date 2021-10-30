const { Base, validate } = require('../models/base');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', async (req, res) => {
    const bases = await Base.find().sort('name');
    res.send(bases);
});

router.get('/:id', async (req, res) => {
    const base = await Base.findById(req.params.id);
    if (!base) return res.status(404).send('The Base with the given ID does not exist.');
    res.send(base);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let base = new Base({ 
        name: req.body.name,
        price: req.body.price 
    });
    base = await base.save();
    res.send(base);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const base = await Base.findByIdAndUpdate(req.params.id, { 
        name: req.body.name,
        price: req.body.price
    }, {new: true});
    
    if (!base) return res.status(404).send('The Base with the given ID does not exist.');

    res.send(base);
});

router.delete('/:id', async (req, res) => {
    const base = await Base.findByIdAndRemove(req.params.id);

    if (!base) return res.status(404).send('The base with the given ID does not exist.');

    res.send(base);
});

module.exports = router;