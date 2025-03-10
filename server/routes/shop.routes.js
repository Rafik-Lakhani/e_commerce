import express from 'express';
const router = express.Router();
import { fetchAllProducts, fetchSingleProduct, addToCart, fetchCartItems, deleteCartItems, updateCartQuantity } from '../controllers/shop.controller.js';
import { authMiddleware } from '../controllers/auth.controller.js'

router.get('/products', fetchAllProducts);
router.get('/SingleProduct/:id', fetchSingleProduct);
router.post('/cart/add', authMiddleware, addToCart);
router.get('/cart/get/:id', authMiddleware, fetchCartItems);
router.delete('/cart/delete/:userId/:productId', authMiddleware, deleteCartItems);
router.put('/cart/update-cart', authMiddleware, updateCartQuantity);

export default router;