import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image : {type:Array},
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand : { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, required: true},
    totalStock: { type: Number, required: true },
    averageReview: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);