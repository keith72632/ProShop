import express from 'express'
import { getProductById, getProducts, createProduct, deleteProduct, updateProduct, createProductReview, getTopRatedProducts } from '../controllers/productControllers.js'
import { protect, admin} from '../middleware/authMiddleware.js'

const router = express.Router();

//Fetch all products
router.route('/')
    .get(getProducts)
    .post( protect, admin, createProduct)

router.route('/top')
    .get(getTopRatedProducts)
 
//Fetch by id
router.route('/:id')
    .get(getProductById)
    .delete(deleteProduct)
    .put(updateProduct)

router.route('/:id/reviews')
    .post(createProductReview)


export default router