const router = require('express').Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
    // Recupero todos los productos
    const products = await Product.find();
    // Renderizo la vista pasándole los productos
    res.render('products/list', { products });
});

router.get('/new', (req, res) => {
    res.render('products/form');
});

router.get('/delete/:productId', async (req, res) => {
    // await Product.findOneAndDelete({ _id: req.params.productId });
    await Product.findByIdAndDelete(req.params.productId);
    res.redirect('/products');
});

router.post('/create', async (req, res) => {
    try {
        await Product.create(req.body);
        res.redirect('/products');
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;