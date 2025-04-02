import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from 'lucide-react';

function ShoppingCards({ products = [], filteredProducts = [], addToCart, viewMode = 'grid' }) {
  if (products.length > 0 && filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-gray-50 rounded-md">
        <svg className="w-16 h-16 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 className="text-xl font-medium mb-2">No bags found</h3>
        <p className="text-sm mb-6">Try adjusting your filters or search criteria</p>
        <button 
          onClick={addToCart}
          className="px-6 py-2.5 bg-black text-white text-sm rounded-md hover:bg-gray-900 transition-all duration-300"
        >
          Browse All Bags
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all duration-300"
            >
              {/* Product Image */}
              <Link to={`/shop/product/${product._id}`} className="block relative overflow-hidden bg-gray-50 aspect-square">
                <img
                  src={product.image[0]}
                  alt={product.title}
                  className="w-full h-full object-contain mix-blend-multiply transform transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Discount badge */}
                {product.price > product.salePrice && (
                  <div className="absolute top-3 left-3 bg-black text-white text-xs font-medium px-2.5 py-1.5">
                    {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                  </div>
                )}
              </Link>

              {/* Product details */}
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14}
                        fill={i < Math.round(product.averageReview || 0) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.reviews?.length || 0})
                  </span>
                </div>

                <Link to={`/shop/product/${product._id}`} className="block mb-2">
                  <h3 className="font-medium text-gray-900 group-hover:text-black transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-semibold">${product.salePrice}</span>
                    {product.price > product.salePrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.price}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Add to cart button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product._id);
                  }}
                  className="w-full bg-black text-white py-2.5 rounded-sm shadow-sm text-sm font-medium hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List view for better mobile experience
        <div className="space-y-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all duration-300"
            >
              {/* Product Image */}
              <Link 
                to={`/shop/product/${product._id}`} 
                className="relative overflow-hidden sm:w-48 h-48 bg-gray-50"
              >
                <img
                  src={product.image[0]}
                  alt={product.title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
                
                {/* Discount badge */}
                {product.price > product.salePrice && (
                  <div className="absolute top-2 left-2 bg-black text-white text-xs font-medium px-2 py-1">
                    {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                  </div>
                )}
              </Link>

              {/* Product details */}
              <div className="flex-1 flex flex-col p-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14}
                          fill={i < Math.round(product.averageReview || 0) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      ({product.reviews?.length || 0})
                    </span>
                  </div>

                  <Link to={`/shop/product/${product._id}`} className="block mb-2">
                    <h3 className="font-medium text-gray-900 hover:text-black transition-colors">
                      {product.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description || 'Premium quality bag crafted with the finest materials for everyday use or special occasions.'}
                  </p>

                  <div className="flex items-center mb-4">
                    <span className="text-lg font-semibold">${product.salePrice}</span>
                    {product.price > product.salePrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${product.price}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <button
                    onClick={() => addToCart(product._id)}
                    className="w-full bg-black text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShoppingCards;
