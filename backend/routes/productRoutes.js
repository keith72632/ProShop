import express from 'express'
import mongoose from 'mongoose'
import { getProductById, getProducts} from '../controllers/productControllers.js'

const router = express.Router();

//Fetch all products
router.route('/').get(getProducts);

//Fetch by id
router.route('/:id').get(getProductById)


export default router