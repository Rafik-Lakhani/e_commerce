import productModel from '../models/product.models.js';


export const fetchAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json({ products: products });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Server Error' });
    }
}


export const fetchSingleProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        const relatedProducts = await productModel.find({ category: product.category });
        res.status(200).json({ product: product, relatedProducts: relatedProducts });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Server Error' });
    }
}
