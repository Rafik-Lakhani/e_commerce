import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

function ShoppingRelatedProducts({ relatedProductList, addToCart = null }) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">You Might Also Like</h2>
        <div className="flex gap-2">
          <button 
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={scrollRight}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x"
      >
        {relatedProductList.map((product) => (
          <Link 
            key={product.id}
            to={`/shop/product/${product._id}`}
            className="flex-none w-[260px] snap-start bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <div className="relative h-[260px] bg-gray-50 p-6 flex items-center justify-center">
              <img
                src={product.image[0]}
                alt={product.title}
                className="max-h-full max-w-full object-contain mix-blend-multiply"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-1">
                {product.title}
              </h3>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-lg font-bold">${product.salePrice}</span>
                  {product.price > product.salePrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${product.price}
                    </span>
                  )}
                </div>
                <div className="flex text-yellow-400">
                  <Star fill="currentColor" size={14} />
                  <span className="text-xs text-gray-600 ml-1">{product.averageReview.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ShoppingRelatedProducts;