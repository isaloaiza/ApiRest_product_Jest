const router = require('express').Router();

const Product = require('../../models/product.model')


router.get('/', async (req, res)=> {
    try{
        const products = await Product.find();
        res.json(products)
    }catch (error){
        res.status(500).json({error: 'Ha acurrido un error'});

    }
});

router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});

router.put('/:productId', async (req, res) => {
    try {
        const productEdit = await Product.findByIdAndUpdate(
            req.params.productId,
            req.body,
            { new: true }
        );
        res.json(productEdit);
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});

router.delete('/:productId', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});

module.exports = router;