const router = require('express').Router();
const User = require('../../models/user');

router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.get('/:userId/add/:productId', async (req, res) => {
    const { userId, productId } = req.params;

    const user = await User.findById(userId);

    user.products.push(productId);

    user.save();

    res.json(user);
})

router.get('/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId)
        .populate('products')
        .exec();
    res.json(user);
});

router.post('/', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
})

module.exports = router;