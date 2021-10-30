const { Design, validate } = require('../models/design');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', async (req, res) => {
    const design = await Design.find().sort('name');
    res.send(design);
});

router.get('/:id', async (req, res) => {
    const design = await Design.findById(req.params.id);
    if (!design) return res.status(404).send('The Design with the given ID does not exist.');
    res.send(design);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let design = new Design({ 
        name: req.body.name
    });
    design = await design.save();
    res.send(design);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const design = await Design.findByIdAndUpdate(req.params.id, { 
        name: req.body.name
    }, {new: true});
    
    if (!design) return res.status(404).send('The Design with the given ID does not exist.');

    res.send(design);
});

router.delete('/:id', async (req, res) => {
    const design = await Design.findByIdAndRemove(req.params.id);

    if (!design) return res.status(404).send('The Design with the given ID does not exist.');

    res.send(design);
});

module.exports = router;