import express from 'express';
const router = express.Router();
import { fetchAllProducts, fetchSingleProduct, addToCart, fetchCartItems, deleteCartItems, updateCartQuantity } from '../controllers/shop.controller.js';
import { authMiddleware } from '../controllers/auth.controller.js'
import { getUserAddress,addUserAddress,updateUserAddress,deleteUserAddress } from '../controllers/address.controller.js';

// here product fetch routes
router.get('/products', fetchAllProducts);
router.get('/SingleProduct/:id', fetchSingleProduct);

// here cart fetch routes
router.post('/cart/add', authMiddleware, addToCart);
router.get('/cart/get/:id', authMiddleware, fetchCartItems);
router.delete('/cart/delete/:userId/:productId', authMiddleware, deleteCartItems);
router.put('/cart/update-cart', authMiddleware, updateCartQuantity);

// here address fetch routes
router.get('/account/getaddress/:id', authMiddleware,getUserAddress);
router.post('/account/adduseraddress',authMiddleware,addUserAddress);
router.put('/account/update-address', authMiddleware, updateUserAddress);
router.delete('/account/delete-address/:userId/:addressId', authMiddleware, deleteUserAddress);

export default router;