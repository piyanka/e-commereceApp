/**
 * Import dependencies
 */
const express = require('express');
const router = express.Router();

/**
 * Controller files
 */
const productCtrl = require('../controller/productController');

/**
 * Product routes defined
 */
router.post('/addProduct', productCtrl.addProduct);
router.get('/getProductList', productCtrl.getProductList);
router.post('/addProductToCart', productCtrl.addProductToCart);
router.get('/getCartList', productCtrl.getCartList);
router.get('/checkout', productCtrl.checkout);
module.exports = router;