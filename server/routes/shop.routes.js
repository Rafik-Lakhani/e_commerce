import express from 'express';
const router = express.Router();
import { fetchAllProducts,fetchSingleProduct,addToCart,fetchCartItems, deleteCartItems, updateCartQuantity } from '../controllers/shop.controller.js';

router.get('/products', fetchAllProducts);
router.get('/SingleProduct/:id',fetchSingleProduct);
router.post('/cart/add',addToCart);
router.get('/cart/get/:id',fetchCartItems);
router.delete('/cart/delete/:userId/:productId',deleteCartItems);
router.put('/cart/update-cart',updateCartQuantity);

export default router;