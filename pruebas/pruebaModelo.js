const mongoose = require('mongoose');
const Product = require('../models/product.model');

(async () => {
    await mongoose.connect('mongodb://127.0.0.1/product')

    const newProduct = await Product.create({
        name: 'Jabon protex',
        description: 'Jabon para cuerpo',
        destination: 'Armenia',
        category: 'aseo',
        start_date: '2023-11-20'
    });

    console.log(newProduct);
})();