/**
 * Import dependencies
 */
const mongoose = require('mongoose');

const cartScheema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    total: {
        type: Number,
        require: true
    },
    payement: {
        type: String,
        default: "Pending"
    }
});

const cart = mongoose.model('cart', cartScheema);
module.exports = cart;