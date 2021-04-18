/**
 * Import Database scheema
 */
const productModel = require('../model/product');
const cart = require('../model/cart');
const mongoose = require('mongoose');
/**
 * Global variable
 */
const productCtrl = {};

/**
 * Add Product api
 * @requiredField Prdouct Name
 * @requiredField Prdouct Price
 * @requiredField Prdouct Description
 * @requiredField Prdouct Image
 * @returns {Error}
 * @returns {Success}
 */

productCtrl.addProduct = (req, res) => {
    try {
        let product = req.body;
        if (product.name !== undefined && product.name !== '' && product.name) {
            if (product.price !== undefined && product.price !== '' && product.price) {
                if (product.description !== undefined && product.description !== '' && product.description) {
                    if (product.img !== undefined && product.img !== '' && product.img) {
                        new productModel({
                            productName: product.name,
                            productPrice: product.price,
                            productDescription: product.description,
                            productImg: product.img
                        }).save().then((result) => {
                            res.end(JSON.stringify({ type: "success", msg: "Product add successfully" }));
                        }).catch((error) => {
                            res.end(JSON.stringify({ type: "error", msg: "" + error }));
                        });
                    } else {
                        res.end(JSON.stringify({ type: "error", msg: "Product image is required" }));
                    }
                } else {
                    res.end(JSON.stringify({ type: "error", msg: "Product description is required" }));
                }
            } else {
                res.end(JSON.stringify({ type: "error", msg: "Product price is required" }));
            }
        } else {
            res.end(JSON.stringify({ type: "error", msg: "Product name is required" }));
        }
    } catch (error) {
        res.end(JSON.stringify({ type: "error", msg: "" + error }));
    }
}

/**
 * Product List api
 * @returns {Error}
 * @returns {Product List}
 */

productCtrl.getProductList = (req, res) => {
    try {
        productModel.find().then((productList) => {
            res.end(JSON.stringify({ type: "success", result: productList }));
        }).catch((error) => {
            res.end(JSON.stringify({ type: "error", msg: "" + error }));
        });;
    } catch (error) {
        res.end(JSON.stringify({ type: "error", msg: "" + error }));
    }
}

/**
 * Add product in cart
 * @requiredField Product Details
 * @returns {Error}
 * @returns {Success}
 */
productCtrl.addProductToCart = (req, res) => {
    try {
        let productDetails = req.body;
        cart.updateOne({ productId: productDetails.id },
            {
                $set: {
                    productId: productDetails.id,
                    price: productDetails.price,
                    quantity: productDetails.quantity,
                    total: productDetails.total,
                    payement: "Pending"
                }
            }, { upsert: true }).then((result) => {
                res.end(JSON.stringify({ type: "success", msg: "Product add in your cart" }));
            }).catch((error) => {
                res.end(JSON.stringify({ type: "error", msg: "" + error }));
            });
    } catch (error) {
        res.end(JSON.stringify({ type: "error", msg: "" + error }));
    }
}

/**
 * Cart product list
 * @returns {Error}
 * @returns {Success}
 */
productCtrl.getCartList = (req, res) => {
    try {
        cart.aggregate([
            {
                $match: {
                    payement: "Pending"
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: {
                    path: "$product"
                }
            }
        ]).then((result) => {
            res.end(JSON.stringify({ type: "success", result }));
        }).catch((error) => {
            res.end(JSON.stringify({ type: "error", msg: "" + error }));
        });
    } catch (error) {
        res.end(JSON.stringify({ type: "error", msg: "" + error }));
    }
}

/**
 * Payement checkout
 * @returns {Error}
 * @returns {Success}
 */

productCtrl.checkout = (req, res) => {
    try {
        let id = req.query.id
        cart.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, { payement: "Successful" }).then((result) => {
            res.end(JSON.stringify({ type: "success", msg: "Thank you for purchase this product" }));
        }).catch((error) => {
            res.end(JSON.stringify({ type: "error", msg: "" + error }));
        });
    } catch (error) {
        res.end(JSON.stringify({ type: "error", msg: "" + error }));
    }
}
module.exports = productCtrl;