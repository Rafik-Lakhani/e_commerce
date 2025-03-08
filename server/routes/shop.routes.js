import express from 'express';
const router = express.Router();
import { fetchAllProducts,fetchSingleProduct } from '../controllers/shop.controller.js';

router.get('/products', fetchAllProducts);
router.get('/SingleProduct/:id',fetchSingleProduct);

export default router;