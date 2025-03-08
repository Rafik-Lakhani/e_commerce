import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart} from 'lucide-react';

function ShoppingCards({products=[], filteredProducts=[], addToCart}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.length > 0 && filteredProducts.length === 0 ? (
        <div>No products found</div>
      ) : null}
      {filteredProducts.map((product, index) => (
        <div
          key={product.id}
          className="product-card bg-white rounded-lg shadow-md p-4 max-w-sm mt-0.5
          transition duration-300 ease-in-out transform hover:scale-105 overflow-hidden"
        >
          <Link to={`/shop/product/${product._id}`} className="block">
            <img
              src={product.image[0]}
              alt={product.name}
              className="product-image w-full h-48 object-cover rounded-lg mb-4
                  transition duration-300 ease-in-out transform hover:scale-110  border-gray-200 border-b-2"
            />
          </Link>
          <div className="flex text-center">
            <div className="flex flex-col items-start justify-center">
              <h2 className="product-title text-xl font-bold text-gray-800 mb-2">
                {product.title}
              </h2>
              <p className="product-price text-base text-gray-700 mb-2">
                ${product.salePrice}
                <span className="text-sm text-red-600 ml-2 line-through">
                  ${product.price}
                </span>
              </p>
            </div>
            <div className="flex flex-col justify-end items-start ml-auto">
              {addToCart?(
              <button
                className="add-to-cart bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-110"
                onClick={() => addToCart(product._id)}
              >
                <ShoppingCart />
              </button>
              ):null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShoppingCards;
