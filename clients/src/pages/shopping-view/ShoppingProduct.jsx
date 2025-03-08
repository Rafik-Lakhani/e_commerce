import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "../../store/products-slice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ShoppingProductDetail from "../../components/shopping-view/ShoppingProductDetail";
import ShoppingRelatedProducts from "../../components/shopping-view/ShoppingRelatedProducts";
import ShoppingProductReviews from "../../components/shopping-view/ShoppingProductReviews";

function ShoppingProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  if (!id) return <Navigate to="/shop/home" />;

  // fetch product details from API
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const addToCart = (ProductId)=>{
    console.log("Add to cart",ProductId);
  }

  const { productList, isLoading } = useSelector(
    (state) => state.adminProdcuts
  );
  if (isLoading) return <div>Loading...</div>;
  console.log(productList);

  const product = productList.find((p) => p._id === id);
  const relatedProductList = productList.filter(
    (p) => p.category === product.category && p._id !== product._id
  );
  return product ? (
    <div className="flex flex-col items-center justify-center m-auto">
      <div>
        <ShoppingProductDetail product={product} addToCart={addToCart} />
      </div>
      <div>
        <ShoppingRelatedProducts relatedProductList={relatedProductList} addToCart={addToCart}/>
      </div>
      <div className="w-full flex justify-start items-start">
        <ShoppingProductReviews product={product} />
      </div>
    </div>
  ) : (
    <Navigate to="/shop/home" />
  );
}

export default ShoppingProduct;
