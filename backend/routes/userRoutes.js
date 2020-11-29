import express from 'express'
import mongoose from 'mongoose'
import { authUser, getUserProfile } from '../controllers/usersControllers.js'
import { protect } from '../middleware/authMiddleware.js' 
const router = express.Router();

//Fetch all products
router.post('/login', authUser)

router.route('/profile').get(protect, getUserProfile)

export default router