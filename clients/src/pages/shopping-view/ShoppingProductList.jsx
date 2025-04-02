import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProducts } from "../../store/user-product-slice.js";
import ShoppingCards from "../../components/shopping-view/ShoppingCards";
import ShoppingFilterSection from "../../components/shopping-view/ShoppingFilterSection";
import { Categoties } from "../../config/CategoriesConfig.js";
import { addToCart as AddProductInCart } from "../../store/cart-slice.js";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading.jsx";
import { getLocalStorageItem } from "../../store/cart-slice.js";
import { fetchCartItems } from "../../store/cart-slice.js";
import { Search, ArrowUpRight, ChevronDown } from "lucide-react";

function ShoppingProductList() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector(
    (state) => state.userProdcuts
  );
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  function addToCart(productId) {
    if (isAuthenticated) {
      localStorage.removeItem("addTOCartProduct");
      dispatch(
        AddProductInCart({
          userId: user._id,
          productId: productId,
          quantity: 1,
        })
      )
        .then(() => {
          dispatch(fetchCartItems(user._id));
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
      dispatch(getLocalStorageItem());
      toast.success("Added to cart");
    }
  }

  // Clear all filters
  const clearFilters = () => {
    setCategoryFilter([]);
    setSearchQuery('');
    setSortBy('featured');
  };

  useEffect(() => {
    dispatch(fetchUserProducts());
  }, [dispatch]);

  // Filter products based on categories and search
  useEffect(() => {
    let filtered = products;
    
    // Apply category filter
    if (categoryFilter.length > 0) {
      filtered = filtered.filter((product) =>
        categoryFilter.includes(product.category)
      );
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) || 
        (product.description && product.description.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    if (sortBy === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.salePrice - b.salePrice);
    } else if (sortBy === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.salePrice - a.salePrice);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.averageReview - a.averageReview);
    } else if (sortBy === 'newest') {
      filtered = [...filtered].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [categoryFilter, searchQuery, products, sortBy]);

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (isLoading) return <Loading/>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gray-900 h-80 flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1470&auto=format&fit=crop" 
            alt="Collection of bags" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Premium Bags Collection</h1>
          <p className="mt-4 text-xl text-gray-200 max-w-xl">
            Discover our exclusive selection of handcrafted bags for every occasion
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-gray-500 hover:text-black transition-colors">Home</a>
            </li>
            <span className="text-gray-400">/</span>
            <li className="font-medium text-black">Shop</li>
          </ol>
        </nav>

        {/* Search and Sort Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          {/* Search */}
          <div className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for bags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Sort and View Controls */}
          <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
            {/* Results count */}
            <p className="text-sm text-gray-500 hidden md:block">
              {filteredProducts.length} products
            </p>

            {/* Sort dropdown */}
            <div className="relative">
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
                <div className="relative">
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Best Rating</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* View toggle */}
            <div className="hidden md:flex border border-gray-200 rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-gray-500'}`}
                aria-label="Grid view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-gray-500'}`}
                aria-label="List view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <ShoppingFilterSection
              Categoties={Categoties}
              setCategoryFilter={setCategoryFilter}
              categoryFilter={categoryFilter}
              clearFilters={clearFilters}
            />
          </div>

          {/* Products grid */}
          <div className="flex-1">
            <ShoppingCards
              products={products}
              filteredProducts={currentProducts}
              addToCart={addToCart}
              viewMode={viewMode}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 mb-4 flex justify-center">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:border-black transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`w-8 h-8 text-sm rounded-md ${
                            currentPage === pageNumber
                              ? 'bg-black text-white'
                              : 'border border-gray-200 hover:border-black'
                          } transition-colors`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:border-black transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Category Banner */}
      <div className="bg-gray-50 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Luxury Leather Collection</h2>
              <p className="mb-6 text-gray-600">Our premium leather bags are handcrafted by master artisans using the finest materials for timeless elegance and exceptional durability.</p>
              <a href="/shop/home" className="inline-flex items-center px-6 py-3 bg-black text-white rounded-md font-medium group">
                Shop Now
                <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
              </a>
            </div>
            <div className="order-first md:order-last">
              <img 
                src="https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=1470&auto=format&fit=crop" 
                alt="Luxury leather bags" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingProductList;
