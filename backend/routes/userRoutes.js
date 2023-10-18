import { authUser, registerUser, logoutUser, getUserProfile } from "../controllers/userController.js";
import express from 'express';
const router = express.Router()

router.post('/auth', authUser)
router.post('/register', registerUser)
router.post('/logout', logoutUser)
router.get('/profile'), getUserProfile

export default router