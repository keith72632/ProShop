import express from 'express'
import mongoose from 'mongoose'
import { getProductById, getProducts, createProduct, deleteProduct, updateProduct, createProductReview } from '../controllers/productControllers.js'
import { protect, admin} from '../middleware/authMiddleware.js'

const router = express.Router();

//Fetch all products
router.route('/')
    .get(getProducts)
    .post( protect, admin, createProduct)

//Fetch by id
router.route('/:id')
    .get(getProductById)
    .delete(deleteProduct)
    .put(updateProduct)

router.route('/:id/reviews')
    .post(createProductReview)


export default router