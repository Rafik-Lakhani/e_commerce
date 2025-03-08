import { ImageUpload } from '../utils/cloudNary.utils.js'
import productModel from '../models/product.models.js';

export const handleImageUpload = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
        }

        // Convert each file to Base64 and upload
        const uploadedImages = await Promise.all(
            req.files.map(async (file) => {
                const buffer64 = Buffer.from(file.buffer).toString("base64");
                const url = `data:${file.mimetype};base64,${buffer64}`;
                return await ImageUpload(url);
            })
        );
        const uploadedImagesUrl = uploadedImages.map((image) => image.url);
        res.status(200).json({
            message: "Images uploaded successfully",
            results: uploadedImagesUrl,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Server Error' });
    }
}


export const addProduct = async (req, res) => {
    try {
        const { image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock } = req.body;
        if (!image || !title || !description || !category || !brand || !price || !salePrice || !totalStock) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }
        const newProduct = new productModel({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        });
        await newProduct.save();
        if (!newProduct) {
            return res.status(400).json({ message: 'Product not added and server error'});
        }
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Server Error' });
    }
};


export const fetchAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json({ products: products, message: 'Product successfully fetched' });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const editProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) return res.status(404).json({ message: "Product id not available" });
        const { image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock } = req.body;
            console.log(req.body);
        if (!image || !title || !description || !category || !brand || !price || !salePrice || !totalStock) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }

        const findProduct = await productModel.findById(productId);
        if (!findProduct) return res.status(404).json({ message: 'Product not found' });

        findProduct.image = image || findProduct.image;
        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price || findProduct.price;
        findProduct.salePrice = salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        await findProduct.save();
        res.status(200).json({ message: 'Product updated successfully', product: findProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) return res.status(404).json({ message: "Product id not available" });
        const findProduct = await productModel.findByIdAndDelete(productId);
        if (!findProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully', product: findProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

