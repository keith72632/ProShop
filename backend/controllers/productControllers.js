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

const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id)

    if(!product) {
        res.status(404)
        throw new Error('No product found')  
    } else {
        res.json(product)
    }
})

const updateProduct = asyncHandler(async(req, res) => {
    const { name, image, description, brand, category, price, countInStock, rating, numReviews } = req.body
    const product = await Product.findById(req.params.id)

    if(!product) {
        res.status(404)
        throw new Error('No product found')  
    } else {
        product.name = name || product.name
        product.image = image || product.image
        product.description = description || product.description
        product.brand = brand || product.brand
        product.category = category || product.category
        product.price = price || product.price
        product.countInStock = countInStock || product.countInStock
        product.rating = rating || product.rating
        product.numReviews = numReviews || product.numReviews

        const updatedProduct = await product.save()
        res.json('Success')
    }
})

export { getProductById, getProducts, addProduct, deleteProduct, updateProduct } 