import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProducts } from "../../store/user-product-slice.js";
import ShoppingCards from "../../components/shopping-view/ShoppingCards";
import ShoppingFilterSection from "../../components/shopping-view/ShoppingFilterSection";
import { Categoties } from "../../config/CategoriesConfig.js";
import { addToCart as AddProductInCart } from "../../store/cart-slice.js";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading.jsx";

function ShoppingProductList() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector(
    (state) => state.userProdcuts
  );
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  function addToCart(productId) {
    console.log("Product added to cart", productId);
    if (isAuthenticated) {
      localStorage.removeItem("addTOCartProduct");
      dispatch(
        AddProductInCart({
          userId: user._id,
          productId: productId,
          quantity: 1,
        })
      )
        .then((data) => {
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
        alreadyProduct[productIndex].quantity = 1;
      } else {
        // If product is not in cart, add new entry
        alreadyProduct.push({ productId, quantity:1 });
      }

      // Save updated cart data in localStorage
      localStorage.setItem("addTOCartProduct", JSON.stringify(alreadyProduct));
      toast.success("Product added successfully");
    }
  }

  useEffect(() => {
    dispatch(fetchUserProducts());
  }, []);

  useEffect(() => {
    let filtered = products; // Removed search filter
    if (categoryFilter.length > 0) {
      filtered = products.filter((product) =>
        categoryFilter.includes(product.category)
      );
    }
    setFilteredProducts(filtered);
  }, [categoryFilter, products]);
  if (isLoading) return <Loading/>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-row justify-between gap-4">
      ``
      <div className="flex flex-col items-center mb-4">
        <ShoppingFilterSection
          Categoties={Categoties}
          setCategoryFilter={setCategoryFilter}
          categoryFilter={categoryFilter}
        />
      </div>
      <div className="flex flex-col items-center mb-4">
        <ShoppingCards
          products={products}
          filteredProducts={filteredProducts}
          addToCart={addToCart}
        />
      </div>
    </div>
  );
}

export default ShoppingProductList;
