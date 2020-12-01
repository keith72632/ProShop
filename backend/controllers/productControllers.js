import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({});
    res.json(products);
})

const getProductById =  asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({message: "product not found"})
    }
});

const addProduct = asyncHandler(async(req, res) => {
    const { name, image, description, brand, category, price, countInStock, rating, numReviews } = req.body
    const product = new Product({
        name,
        image,
        description,
        brand,
        category,
        price,
        countInStock,
        rating,
        numReviews,
      })
      res.status(201)
      await product.save()
})

export { getProductById, getProducts, addProduct } 