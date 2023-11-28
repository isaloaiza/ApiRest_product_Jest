//Rutas de la api

const router = require('express').Router();
router.use('/products', require('./products.routes'));


module.exports = router;