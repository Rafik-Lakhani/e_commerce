import React, { useState, useEffect } from "react";
import { Star, ShoppingCart, Minus, Plus, Heart } from "lucide-react";

function ShoppingProductDetail({ product, addToCart, quantity, setQuantity }) {
  const [displayImage, setDisplayImage] = useState(product.image[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setDisplayImage(product.image[0]);
  }, [product.image]);
  
  useEffect(() => {
    const cartItem = JSON.parse(localStorage.getItem("addTOCartProduct")) || [];
    const productIndex = cartItem.findIndex((item) => item.id === product.id);
    if (productIndex > -1) {
      setQuantity(cartItem[productIndex].quantity);
    }
  }, []);

  let stockStatus = "In Stock";
  let stockColor = "bg-green-600";
  if (product.totalStock <= 5 && product.totalStock > 0) {
    stockStatus = "Limited Stock!";
    stockColor = "bg-yellow-500";
  } else if (product.totalStock <= 0) {
    stockStatus = "Out of Stock";
    stockColor = "bg-red-600";
  }

  const handleQuantityChange = (type) => {
    if (type === "increase" && quantity < product.totalStock) {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
      {/* Image Gallery - Left Side */}
      <div className="space-y-4">
        {/* Main Product Image with Zoom Effect */}
        <div 
          className="relative overflow-hidden bg-gray-50 rounded-lg"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <div className={`transition-all duration-500 ease-out ${isZoomed ? 'scale-110' : 'scale-100'}`}>
            <img
              src={displayImage}
              alt={product.title}
              className="w-full h-auto aspect-square object-contain mix-blend-multiply p-4"
            />
          </div>
          
          {/* Favorite Button */}
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300"
          >
            <Heart 
              size={20} 
              className={`transition-colors duration-300 ${isFavorite ? 'fill-black text-black' : 'text-gray-400'}`} 
            />
          </button>
        </div>
        
        {/* Thumbnail Images */}
        <div className="flex gap-3 overflow-x-auto py-2 scrollbar-hide">
          {product.image.map((img, index) => (
            <button
              key={index}
              onClick={() => setDisplayImage(img)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden transition-all duration-300 ${
                displayImage === img ? 'ring-2 ring-black' : 'ring-1 ring-gray-200'
              }`}
            >
              <img 
                src={img} 
                alt={`${product.title} view ${index + 1}`} 
                className="w-full h-full object-contain mix-blend-multiply bg-gray-50" 
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Details - Right Side */}
      <div className="flex flex-col">
        {/* Product Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
          
          {/* Price Section */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-bold">${product.salePrice}</span>
            {product.price > product.salePrice && (
              <span className="text-gray-500 line-through text-lg">${product.price}</span>
            )}
            {product.price > product.salePrice && (
              <span className="text-sm font-medium bg-black text-white px-2 py-1 rounded-full">
                {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
              </span>
            )}
          </div>
          
          {/* Ratings */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  fill={i < Math.round(product.averageReview) ? "currentColor" : "none"}
                  className="w-4 h-4"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.averageReview.toFixed(1)} ({product.reviews?.length || 0} Reviews)
            </span>
          </div>
        </div>

        {/* Product Description */}
        <div className="mb-8">
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 mb-8"></div>

        {/* Frame Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-900">Frame Color</h3>
              <span className="text-sm text-gray-600 capitalize">{selectedColor || ""}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full transition-all duration-300 ${
                    selectedColor === color ? 'ring-2 ring-offset-2 ring-black scale-110' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select ${color} color`}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
          <div className="inline-flex items-center border border-gray-300 rounded-full">
            <button
              onClick={() => handleQuantityChange("decrease")}
              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors duration-300 rounded-l-full"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="w-10 text-center font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("increase")}
              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors duration-300 rounded-r-full"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Stock Status */}
        <div className="mb-8">
          <div className={`inline-block text-sm font-medium rounded-full px-3 py-1 ${
            product.totalStock <= 0 ? 'bg-red-50 text-red-600' :
            product.totalStock <= 5 ? 'bg-amber-50 text-amber-700' :
            'bg-green-50 text-green-700'
          }`}>
            {product.totalStock <= 0 ? 'Out of Stock' :
             product.totalStock <= 5 ? `Only ${product.totalStock} left in stock` :
             'In Stock'}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
          <button
            onClick={() => addToCart(product._id)}
            disabled={product.totalStock <= 0}
            className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
          <button className="bg-white text-black border border-black px-6 py-3 rounded-full shadow-sm hover:bg-black hover:text-white transition-all duration-300">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingProductDetail;
