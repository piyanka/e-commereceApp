/**
 * Import dependencies
 */
const mongoose = require('mongoose');

const productScheema = new mongoose.Schema({
    productName: {
        type: String,
        trim: true,
        required: true
    },
    productPrice: {
        type: Number,
        trim: true,
        required: true
    },
    productDescription: {
        type: String,
        trim: true,
        required: true
    },
    productImg: {
        type: String,
        trim: true,
        required: true
    }

});

const product = mongoose.model('product', productScheema);
module.exports = product;