const { Addon, validate } = require('../models/addon');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', async (req, res) => {
    const addon = await Addon.find().sort('name');
    res.send(addon);
});

router.get('/:id', async (req, res) => {
    const addon = await Addon.findById(req.params.id);
    if (!addon) return res.status(404).send('The Add On with the given ID does not exist.');
    res.send(addon);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let addon = new Addon({ 
        name: req.body.name,
        price: req.body.price 
    });
    addon = await addon.save();
    res.send(addon);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const addon = await Addon.findByIdAndUpdate(req.params.id, { 
        name: req.body.name,
        price: req.body.price
    }, {new: true});
    
    if (!addon) return res.status(404).send('The Add On with the given ID does not exist.');

    res.send(addon);
});

router.delete('/:id', async (req, res) => {
    const addon = await Addon.findByIdAndRemove(req.params.id);

    if (!addon) return res.status(404).send('The Add On with the given ID does not exist.');

    res.send(addon);
});

module.exports = router;