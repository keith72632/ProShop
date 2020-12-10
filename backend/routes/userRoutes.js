import express from 'express'
import mongoose from 'mongoose'
import { 
    authUser, 
    getUserProfile, 
    registerUser, 
    updateUserProfile,
    getUsers, 
    deleteUser
} from '../controllers/usersControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js' 
const router = express.Router();

//Fetch all products
router.route('/').post(registerUser).get(protect, admin, getUsers)

router.post('/login', authUser)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/:id').delete(protect, admin, deleteUser)
export default router