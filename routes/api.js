const router = require('express').Router();

const apiProductsRouter = require('./api/products');
const apiUsersRouter = require('./api/users');

router.use('/products', apiProductsRouter);
router.use('/users', apiUsersRouter);

module.exports = router;