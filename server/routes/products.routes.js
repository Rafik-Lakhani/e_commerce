import express from 'express';
const router = express.Router();
import { upload } from '../config/cloudiNary.config.js'
import { addProduct, deleteProduct, editProduct, fetchAllProducts, handleImageUpload } from '../controllers/products.controller.js'
import { AdminAuthMiddleware } from '../controllers/auth.controller.js';

router.post('/upload-image', AdminAuthMiddleware, upload.array("my_files", 4), handleImageUpload);
router.post('/add', AdminAuthMiddleware, addProduct);
router.put("/edit/:id", AdminAuthMiddleware, editProduct);
router.delete("/delete/:id", AdminAuthMiddleware, deleteProduct);
router.get('/getAllProducts', fetchAllProducts);

export default router;