const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const bases = require('./routes/bases');
const frostings = require('./routes/frostings');
const addons = require('./routes/addons');
const designs = require('./routes/designs');
const products = require('./routes/products');
const orders = require('./routes/orders');

mongoose.connect('mongodb://localhost/cakesoverflowers')
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB :c', err));

app.use(express.json());
app.use('/api/bases', bases);
app.use('/api/frostings', frostings);
app.use('/api/addons', addons);
app.use('/api/designs', designs);
app.use('/api/products', products);
app.use('/api/orders', orders);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});