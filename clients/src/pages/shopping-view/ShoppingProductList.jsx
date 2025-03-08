import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProducts } from "../../store/user-product-slice.js";
import ShoppingCards from "../../components/shopping-view/ShoppingCards";
import ShoppingFilterSection from "../../components/shopping-view/ShoppingFilterSection";
import { Categoties } from "../../config/CategoriesConfig.js";

function addToCart(product) {
  console.log("Product added to cart", product);
}



function ShoppingProductList() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const dispatch = useDispatch();
  const {products,isLoading,error} = useSelector((state) => state.userProdcuts);

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
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-row justify-between gap-4">``
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
