import React, { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";

function ShoppingProductDetail({product,addToCart}) {
  const [quantity, setQuantity] = useState(1);
  // console.log(addToCart);
  const {
    title,
    price,
    salePrice,
    totalStock,
    averageReview,
    description,
    image,
    category,
    brand,
  } = product;

  const [displayImage, setDisplayImage] = useState(image[0]);

  let stockStatus = "In Stock";
  let stockColor = "bg-green-600";
  if (totalStock <= 5 && totalStock > 0) {
    stockStatus = "Limited Stock!";
    stockColor = "bg-yellow-500";
  } else if (totalStock <= 0) {
    stockStatus = "Out of Stock";
    stockColor = "bg-red-600";
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="relative">
            <img
              src={displayImage}
              alt={title}
              className="w-full h-96 object-cover border rounded-lg shadow-md"
            />
            <span
              className={`absolute top-2 left-2 text-white text-sm px-3 py-1 rounded-md ${stockColor}`}
            >
              {stockStatus}
            </span>
            <div className="flex gap-3 mt-4">
              {image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Product thumbnail"
                  className="w-24 h-24 object-cover cursor-pointer border rounded-md hover:scale-105 transition"
                  onClick={() => setDisplayImage(img)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600 text-lg mt-2">Category: {category}</p>
              {brand && <p className="text-gray-600 text-lg">Brand: {brand}</p>}
              <div className="flex items-center gap-3 my-4">
                <span className="text-3xl font-semibold text-red-600">${salePrice}</span>
                <span className="text-gray-500 text-xl line-through">${price}</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill={i < averageReview ? "#facc15" : "none"} />
                ))}
                <span className="text-gray-600 text-lg ml-2">({averageReview} Reviews)</span>
              </div>
              <p className="mt-6 text-gray-700 leading-relaxed text-lg">{description}</p>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <button
                className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white text-lg px-6 py-3 rounded-md hover:bg-blue-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => addToCart(product._id)}
                disabled={totalStock <= 0}
              >
                <ShoppingCart /> {totalStock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingProductDetail;