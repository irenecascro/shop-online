const router = require('express').Router();
const Product = require('../../models/product');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
            .populate('owner')
            .exec();
        res.json(products);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/price/:minPrice/:maxPrice', (req, res) => {
    // const minPrice = req.params.minPrice;
    // const maxPrice = req.params.maxPrice;
    const { minPrice, maxPrice } = req.params;
    // SELECT * FROM productos WHERE price > minPrince AND price < maxPrice and available = true
    Product.find({
        price: { $gt: minPrice, $lt: maxPrice },
        available: true
    })
        .then((products) => res.json(products))
        .catch((err) => res.json({ error: err.message }));
});

router.get('/active', async (req, res) => {
    const products = await Product.activos();
    res.json(products);
});

router.get('/same', async (req, res) => {
    const prod = new Product({ name: 'test prod', description: 'PAra probar el método', price: 9, category: 'hogar', stock: 100, available: true });

    const products = await prod.mismaCategoria();
    res.json(products);
});

router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.json(product);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.get('/:productId/owner/:userId', async (req, res) => {
    const { productId, userId } = req.params;
    // const product = await Product.findById(productId);
    // product.owner = userId;
    // product.save();

    const product = await Product.findByIdAndUpdate(
        productId,
        { owner: userId },
        { new: true }
    );

    res.json(product);

});

router.post('/',
    body('name').exists(),
    body('description').exists(),
    body('price').isNumeric()
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array() });
        }

        try {
            const newProduct = await Product.create(req.body);
            res.status(201).json(newProduct);
        } catch (err) {
            res.json({ error: err.message })
        }
    });

router.delete('/:productId', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        // await Product.findOneAndDelete({ _id: req.params.productId });
        res.json(product);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.put('/:productId', async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.productId,
        req.body,
        { new: true }
    );
    res.json(product);
});

module.exports = router;