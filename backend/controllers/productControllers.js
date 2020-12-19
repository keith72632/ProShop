import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async(req, res) => {
    const pageSize = 2 ? 2 : 1
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    console.log(keyword)
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize *(page - 1));
    res.json({products, page, pages: Math.ceil(count / pageSize)});
})

const getProductById =  asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({message: "product not found"})
    }
});

const createProduct = asyncHandler(async(req, res) => {
    const product = new Product({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpeg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description',
    })

    const createProduct = await product.save()
    res.status(201).json(product)
    
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

//POST /api/products/:id/reviews
//Private

const createProductReview = asyncHandler(async(req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id).populate('user')

    if(!product) {
        res.status(404)
        throw new Error('No product found')  
    } else {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if(alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(200)
    }
})

export { getProductById, getProducts, createProduct, deleteProduct, updateProduct, createProductReview } 