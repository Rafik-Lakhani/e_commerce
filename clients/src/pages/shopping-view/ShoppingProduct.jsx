import React, { useEffect, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../store/user-product-slice";
import ShoppingProductDetail from "../../components/shopping-view/ShoppingProductDetail";
import ShoppingRelatedProducts from "../../components/shopping-view/ShoppingRelatedProducts";
import ShoppingProductReviews from "../../components/shopping-view/ShoppingProductReviews";
import { addToCart as AddProductInCart, fetchCartItems } from "../../store/cart-slice.js";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading.jsx";
import { getLocalStorageItem} from '../../store/cart-slice.js';
import { ArrowUp } from "lucide-react";

function ShoppingProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetails, relatedProducts, isLoading, error } = useSelector(
    (state) => state.userProdcuts
  );
  const [quantity, setQuantity] = useState(1);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [showBackToTop, setShowBackToTop] = useState(false);

  if (!id) {
    return <Navigate to="/" />;
  }

  // Fetch product details from API
  useEffect(() => {
    dispatch(fetchProductDetails(id));
    
    // Back to top button visibility handler
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id, dispatch]);

  const addToCart = (productId) => {
    if (isAuthenticated) {
      localStorage.removeItem("addTOCartProduct");
      dispatch(
        AddProductInCart({
          userId: user._id,
          productId: productId,
          quantity: quantity,
        })
      )
        .then(() => {
          dispatch(fetchCartItems(user._id));
          toast.success("Product added successfully");
        })
        .catch((error) => {
          toast.error("Failed to add product to cart");
        });
    } else {
      const alreadyProduct =
        JSON.parse(localStorage.getItem("addTOCartProduct")) || [];

      const productIndex = alreadyProduct.findIndex(
        (item) => item.productId === productId
      );

      if (productIndex !== -1) {
        alreadyProduct[productIndex].quantity = quantity;
      } else {
        alreadyProduct.push({ productId, quantity });
      }

      localStorage.setItem("addTOCartProduct", JSON.stringify(alreadyProduct));
      dispatch(getLocalStorageItem());
      toast.success("Product added successfully");
    }
  };

  if (isLoading) return <Loading/>;
  if (error) return <div className="text-red-500">{error}</div>;

  return productDetails || relatedProducts ? (
    <div className="min-h-screen bg-white font-sans">
      {/* Subtle breadcrumb navigation */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link to="/" className="transition-colors duration-300 hover:text-black">Home</Link>
          <span>/</span>
          <Link to="/shop/listing" className="transition-colors duration-300 hover:text-black">Eyewear</Link>
          <span>/</span>
          <span className="text-black font-medium">{productDetails?.title}</span>
        </nav>
      </div>

      {/* Main product content */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-20">
        {/* Product detail section */}
        <section className="mb-20">
          {productDetails && (
            <ShoppingProductDetail
              product={productDetails}
              addToCart={addToCart}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          )}
        </section>

        {/* Reviews section */}
        <section className="mb-20">
          {productDetails && (
            <ShoppingProductReviews product={productDetails} />
          )}
        </section>

        {/* Related Products */}
        {relatedProducts?.length > 0 && (
          <section className="mb-10">
            <ShoppingRelatedProducts
              relatedProductList={relatedProducts}
              addToCart={addToCart}
            />
          </section>
        )}
      </div>

      {/* Back to top button with smooth transition */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 bg-black text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  ) : (
    <Navigate to="/shop/home" />
  );
}

export default ShoppingProduct;
