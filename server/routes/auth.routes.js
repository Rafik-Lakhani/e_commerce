import express from 'express';
const router = express.Router();
import {registerUser,loginUser,logoutUser,checkAuth,authMiddleware} from '../controllers/auth.controller.js';

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',authMiddleware,logoutUser);
router.get('/check-auth',authMiddleware,checkAuth);


export default router;