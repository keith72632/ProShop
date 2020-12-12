import express from 'express'
import mongoose from 'mongoose'
import { getProductById, getProducts, createProduct, deleteProduct, updateProduct } from '../controllers/productControllers.js'
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



export default router