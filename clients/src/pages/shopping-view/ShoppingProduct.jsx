import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../store/user-product-slice";
import ShoppingProductDetail from "../../components/shopping-view/ShoppingProductDetail";
import ShoppingRelatedProducts from "../../components/shopping-view/ShoppingRelatedProducts";
import ShoppingProductReviews from "../../components/shopping-view/ShoppingProductReviews";
import { addToCart as AddProductInCart, fetchCartItems } from "../../store/cart-slice.js";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading.jsx";

function ShoppingProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetails, relatedProducts, isLoading, error } = useSelector(
    (state) => state.userProdcuts
  );
  console.log(productDetails, relatedProducts, isLoading, error);
  const [quantity, setQuantity] = useState(1);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

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
    if (isAuthenticated) {
      localStorage.removeItem("addTOCartProduct");
      dispatch(
        AddProductInCart({
          userId: user._id,
          productId: productId,
          quantity: quantity,
        })
      )
        .then((data) => {
          dispatch(fetchCartItems(user._id));
          toast.success("Product added successfully");
        })
        .catch((error) => {
          console.log("Error adding product to cart", error);
          toast.error("Failed to add product to cart");
        });
    } else {
      const alreadyProduct =
        JSON.parse(localStorage.getItem("addTOCartProduct")) || [];

      // Find the index of the existing product in the cart
      const productIndex = alreadyProduct.findIndex(
        (item) => item.productId === productId
      );

      if (productIndex !== -1) {
        // If product exists, update its quantity
        alreadyProduct[productIndex].quantity = quantity;
      } else {
        // If product is not in cart, add new entry
        alreadyProduct.push({ productId, quantity });
      }

      // Save updated cart data in localStorage
      localStorage.setItem("addTOCartProduct", JSON.stringify(alreadyProduct));
      toast.success("Product added successfully");
    }
  };

  if (isLoading) return <Loading/>;
  if (error) return <div className="text-red-500">{error}</div>;

  return productDetails || relatedProducts ? (
    <div className="flex flex-col items-center justify-center m-auto">
      {productDetails && (
        <div className="w-full max-w-4xl">
          <ShoppingProductDetail
            product={productDetails}
            addToCart={addToCart}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
      )}
      {relatedProducts?.length > 0 && (
        <div className="w-full max-w-6xl">
          <ShoppingRelatedProducts
            relatedProductList={relatedProducts}
            addToCart={addToCart}
          />
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
