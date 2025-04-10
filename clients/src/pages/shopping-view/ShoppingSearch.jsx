import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Search, X } from "lucide-react";
import ShoppingCards from "../../components/shopping-view/ShoppingCards";
import { addToCart as AddProductInCart } from "../../store/cart-slice.js";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading.jsx";
import { fetchUserProducts } from '../../store/user-product-slice.js';

function ShoppingSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { products } = useSelector((state) => state.userProdcuts);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserProducts());
  }, [dispatch]);

  // Initialize search query from URL
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q");
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [location.search, products]);

  const handleSearch = (query) => {
    setIsLoading(true);
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    navigate("/shop/search");
  };

  const addToCart = (productId) => {
    if (isAuthenticated) {
      dispatch(
        AddProductInCart({
          userId: user._id,
          productId: productId,
          quantity: 1,
        })
      )
        .then(() => {
          toast.success("Added to cart");
        })
        .catch(() => {
          toast.error("Failed to add product to cart");
        });
    } else {
      const alreadyProduct =
        JSON.parse(localStorage.getItem("addTOCartProduct")) || [];

      const productIndex = alreadyProduct.findIndex(
        (item) => item.productId === productId
      );

      if (productIndex !== -1) {
        alreadyProduct[productIndex].quantity = 1;
      } else {
        alreadyProduct.push({ productId, quantity: 1 });
      }

      localStorage.setItem("addTOCartProduct", JSON.stringify(alreadyProduct));
      toast.success("Added to cart");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-black text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Search Products</h1>
            <p className="text-gray-300 text-sm md:text-base">Find exactly what you're looking for</p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="mb-8 md:mb-12">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-12 pr-12 py-3 md:py-4 text-base md:text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-0">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : "Search for products"}
            </h2>
            {searchQuery && (
              <span className="text-sm text-gray-500">
                {filteredProducts.length} results found
              </span>
            )}
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="w-full">
              <ShoppingCards
                filteredProducts={filteredProducts}
                addToCart={addToCart}
              />
            </div>
          ) : searchQuery ? (
            <div className="text-center py-12 md:py-16">
              <div className="max-w-md mx-auto">
                <p className="text-gray-500 text-base md:text-lg mb-4">
                  No products found for "{searchQuery}"
                </p>
                <button
                  onClick={handleClearSearch}
                  className="px-4 md:px-6 py-2 md:py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 text-sm md:text-base"
                >
                  Clear Search
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 md:py-16">
              <div className="max-w-md mx-auto">
                <p className="text-gray-500 text-base md:text-lg">
                  Enter a search term to find products
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingSearch; 