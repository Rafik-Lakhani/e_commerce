import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function ShoppingRelatedProducts({ relatedProductList, addToCart = null }) {
  if (!relatedProductList.length) {
    return <p className="text-center text-gray-600">No related products found.</p>;
  }

  return (
    <div className="mt-10 w-full flex flex-col items-center mb-10">
      <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl px-4">
        {relatedProductList.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg p-4 transition duration-300 ease-in-out transform hover:scale-105 overflow-hidden"
          >
            <Link to={`/shop/product/${product._id}`} className="block">
              <img
                src={product.image[0]}
                alt={product.title}
                className="w-full h-52 object-cover rounded-lg mb-4 transition duration-300 ease-in-out transform hover:scale-110 border-gray-200 border-b-2"
              />
            </Link>
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-bold text-gray-800 mb-1">{product.title}</h3>
              <p className="text-base text-gray-700 mb-2">
                ${product.salePrice}
                <span className="text-sm text-red-600 ml-2 line-through">${product.price}</span>
              </p>
              {addToCart && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 transition duration-300 ease-in-out"
                  onClick={() => addToCart(product._id)}
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShoppingRelatedProducts;