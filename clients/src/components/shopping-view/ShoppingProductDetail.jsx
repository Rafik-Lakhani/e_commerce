import React, { useState, useEffect } from "react";
import { Star, ShoppingCart } from "lucide-react";

function ShoppingProductDetail({ product, addToCart }) {
  const [displayImage, setDisplayImage] = useState(product.image[0]);

  useEffect(() => {
    setDisplayImage(product.image[0]);
  }, [product.image]);

  let stockStatus = "In Stock";
  let stockColor = "bg-green-600";
  if (product.totalStock <= 5 && product.totalStock > 0) {
    stockStatus = "Limited Stock!";
    stockColor = "bg-yellow-500";
  } else if (product.totalStock <= 0) {
    stockStatus = "Out of Stock";
    stockColor = "bg-red-600";
  }

  return (
    <div className="min-h-screen py-10 bg-gray-50 flex justify-center px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl w-full bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Image Section */}
          <div className="relative w-full flex flex-col items-center">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl border rounded-lg overflow-hidden shadow-md flex justify-center items-center bg-gray-100">
              <img
                src={displayImage}
                alt={product.title}
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
            <span
              className={`absolute top-4 left-4 text-white text-sm px-4 py-1 rounded-md ${stockColor}`}
            >
              {stockStatus}
            </span>
            <div className="flex gap-2 sm:gap-3 mt-4">
              {product.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Product thumbnail"
                  className="w-20 h-20 object-contain border rounded-md cursor-pointer hover:scale-105 transition duration-200 bg-gray-100"
                  onClick={() => setDisplayImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between w-full">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.title}</h1>
              <p className="text-gray-600 text-md sm:text-lg mt-2">Category: {product.category}</p>
              {product.brand && <p className="text-gray-600 text-md sm:text-lg">Brand: {product.brand}</p>}
              
              <div className="flex items-center gap-3 my-4">
                <span className="text-3xl font-semibold text-red-600">${product.salePrice}</span>
                <span className="text-gray-500 text-xl line-through">${product.price}</span>
              </div>
              
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill={i < product.averageReview ? "#facc15" : "none"} />
                ))}
                <span className="text-gray-600 text-md sm:text-lg ml-2">({product.averageReview} Reviews)</span>
              </div>
              
              <p className="mt-4 text-gray-700 leading-relaxed text-md sm:text-lg">{product.description}</p>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-6">
              <button
                className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white text-lg px-6 py-3 rounded-md hover:bg-blue-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => addToCart(product._id)}
                disabled={product.totalStock <= 0}
              >
                <ShoppingCart /> {product.totalStock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingProductDetail;