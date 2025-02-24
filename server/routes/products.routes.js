import express from 'express';
const router = express.Router();
import {upload} from '../config/cloudiNary.config.js'
import {handleImageUpload} from '../controllers/products.controller.js'

router.post('/upload-image',upload.array("my_files",4),handleImageUpload);

export default router;