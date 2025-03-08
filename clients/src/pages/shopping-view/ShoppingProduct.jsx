import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../store/user-product-slice";
import ShoppingProductDetail from "../../components/shopping-view/ShoppingProductDetail";
import ShoppingRelatedProducts from "../../components/shopping-view/ShoppingRelatedProducts";
import ShoppingProductReviews from "../../components/shopping-view/ShoppingProductReviews";

function ShoppingProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();

  if (!id) {
    return <Navigate to="/" />;
  }

  // Fetch product details from API
  useEffect(() => {
    console.log("Fetching Product ID:", id);
    dispatch(fetchProductDetails(id));
  }, [id, dispatch]);

  const addToCart = (productId) => {
    console.log("Add to cart:", productId);
  };

  const {productDetails,relatedProducts,isLoading,error} = useSelector((state) => state.userProdcuts);
  console.log(productDetails, relatedProducts, isLoading, error);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return productDetails || relatedProducts ? (
    <div className="flex flex-col items-center justify-center m-auto">
      {productDetails && (
        <div className="w-full max-w-4xl">
          <ShoppingProductDetail product={productDetails} addToCart={addToCart} />
        </div>
      )}
      {relatedProducts?.length > 0 && (
        <div className="w-full max-w-6xl">
          <ShoppingRelatedProducts relatedProductList={relatedProducts} addToCart={addToCart} />
        </div>
      )}
      {productDetails && (
        <div className="w-full flex justify-start items-start">
          <ShoppingProductReviews product={productDetails} />
        </div>
      )}
    </div>
  ) : (
    <Navigate to="/shop/home" />
  );
}

export default ShoppingProduct;
