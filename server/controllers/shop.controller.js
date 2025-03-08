import productModel from '../models/product.models.js';
import CartModel from '../models/cart.models.js';


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
        const relatedProducts = await productModel.find({
            category: product.category, _id: {
                $ne: product._id  // exclude the current product from the related products list
            }
        });
        res.status(200).json({ product: product, relatedProducts: relatedProducts });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Server Error' });
    }
}



export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || quantity) return res.status(404).json({ message: 'Invalid credentials' });
        const product = await productModel.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        const isCartAvailable = CartModel.find({ userId: userId });
        if (isCartAvailable) {
            let existingProduct = CartModel.findOne({ userId: userId, 'products.productId': productId });
            if (existingProduct) {
                existingProduct.products.forEach(p => {
                    if (p.productId === productId) {
                        p.quantity += quantity;
                        return res.status(200).json({ product: existingProduct.products });
                    }
                });
            }
            else {
                const updatedCart = CartModel.findByIdAndUpdate(isCartAvailable[0]._id, { $push: { products: { productId, quantity } } });
                res.status(200).json({ product: updatedCart.products });
            }
        } else {
            const newCart = new CartModel({ userId, products: [{ productId, quantity }] });
            await newCart.save();
            res.status(200).json({ product: newCart.products });
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Server Error' });

    }
}


export const fetchCartItems = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(404).json({ message: 'Invalid credentials' });
        const cartItems = await CartModel.find({ userId: id });
        if (!cartItems) return res.status(404).json({ message: 'Cart is empty' });
        res.status(200).json({ products: cartItems[0].products });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const deleteCartItems = async (req, res) => {
    try{
        const {userId,productId}=req.params;
        if(!userId ||!productId) return res.status(404).json({ message: 'Invalid credentials' });
        const cartItems=await CartModel.findOneAndUpdate({userId:userId},{$pull:{products:{productId:productId}}},{new:true});
        res.status(200).json({product:cartItems.products});
    }catch(e){
        console.log(e);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const updateCartQuantity = async (req, res) => {
    try{
        const {userId, productId, quantity}=req.body;
        if(!userId ||!productId ||!quantity) return res.status(404).json({ message: 'Invalid credentials' });
        const cartItems=await CartModel.findOneAndUpdate({userId:userId, 'products.productId': productId},{$set: {'products.$.quantity': quantity}},{new:true});
        res.status(200).json({product:cartItems.products});
    }catch(e){
        console.log(e);
        res.status(500).json({ message: 'Server Error' });
    }
}
