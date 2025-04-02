import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  fetchCartItems,
  getLocalStorageItem,
  updateCartQuantity,
  updateLocalStorageItem,
} from "../../store/cart-slice";
import { fetchUserProducts } from "../../store/user-product-slice";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading";
import { useNavigate } from "react-router-dom";

function ShoppingCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, isLoading, error } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.userProdcuts);

  const updateQuantity = (productId, newQuantity) => {
    if (isAuthenticated) {
      localStorage.removeItem("addTOCartProduct");
      dispatch(
        updateCartQuantity({
          userId: user._id,
          productId: productId,
          quantity: newQuantity,
        })
      )
        .then((data) => {
          dispatch(fetchCartItems(user._id));
          toast.success("Quantity Update successfully");
        })
        .catch((error) => {
          console.error("Error Update Quantity In Cart", error);
          toast.error("Failed to update to cart");
        });
    } else {
      const updatedCartItems = cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      dispatch(updateLocalStorageItem({ cartItems: updatedCartItems }));
    }
  };

  const removeFromCart = (id) => {
    if (isAuthenticated) {
      localStorage.removeItem("addTOCartProduct");
      dispatch(deleteCartItem({ userId: user._id, productId: id }))
        .then((data) => {
          toast.success("Product removed successfully");
          dispatch(fetchCartItems(user._id));
        })
        .catch((error) => {
          console.error("Error Remove From Cart", error);
          toast.error("Failed to remove product from cart");
        });
    } else {
      const updatedCartItems = cartItems.filter(
        (item) => item.productId !== id
      );
      dispatch(updateLocalStorageItem({ cartItems: updatedCartItems }));
    }
  };

  const getTotalPrice = () => {
    var TotalPrice = 0;
    cartItems.map((item) => {
      products.map((product) => {
        if (item.productId == product._id) {
          TotalPrice += product.salePrice * item.quantity;
        }
      });
    });
    return TotalPrice;
  };

  useEffect(() => {
    dispatch(fetchUserProducts());
    if (isAuthenticated) {
      dispatch(fetchCartItems(user._id));
    } else {
      const localStorageItem = JSON.parse(
        localStorage.getItem("addTOCartProduct")
      );
      if (localStorageItem?.length > 0) {
        dispatch(getLocalStorageItem());
      }
    }
  }, [dispatch, isAuthenticated]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 flex flex-col sm:flex-row justify-between items-baseline">
          <h2 className="text-3xl sm:text-4xl font-light text-black tracking-tight">
            Shopping Cart
          </h2>
          <p className="text-sm text-gray-500 mt-2 sm:mt-0">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        {cartItems.length == 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100">
            <p className="text-gray-600 text-lg mb-8">
              Your shopping cart is empty
            </p>
            <button
              className="group relative px-8 py-3 bg-black text-white overflow-hidden"
              onClick={() => {
                navigate("/shop/home");
              }}
            >
              <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                Continue Shopping
              </span>
              <div className="absolute inset-0 bg-gray-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((cartItem) => {
                const item = products.find(
                  (product) => product._id === cartItem.productId
                );
                return (
                  item && (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white border border-gray-100 hover:border-black transition-all duration-300"
                    >
                      <div className="relative group overflow-hidden">
                        <img
                          src={item.image[0]}
                          alt={item.title}
                          className="w-32 h-32 object-cover transform transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="flex-1 space-y-2 text-center sm:text-left">
                        <h3 className="font-medium text-lg text-black hover:text-gray-700 transition-colors duration-300 cursor-pointer">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-sm font-light">
                          ${item.salePrice.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            if (cartItem.quantity > 1) {
                              updateQuantity(item._id, cartItem.quantity - 1);
                            } else {
                              toast.error("Minimum quantity is 1");
                            }
                          }}
                          className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-medium text-gray-800">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => {
                            if (cartItem.quantity < 10) {
                              updateQuantity(item._id, cartItem.quantity + 1);
                            } else {
                              toast.error("Maximum quantity is 10");
                            }
                          }}
                          className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="group p-2 text-gray-400 hover:text-black transition-colors duration-300"
                      >
                        <Trash2
                          size={20}
                          className="transform group-hover:scale-110 transition-transform duration-300"
                        />
                      </button>
                    </div>
                  )
                );
              })}
            </div>

            <div className="mt-12 bg-white border border-gray-100 p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </p>
                  <h3 className="text-3xl font-light text-black">
                    ${getTotalPrice().toFixed(2)}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Tax included and shipping calculated at checkout
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <button
                    className="group relative px-8 py-3 border border-black text-black overflow-hidden"
                    onClick={() => {
                      navigate("/shop/home");
                    }}
                  >
                    <span className="relative z-10 transition-transform duration-500 group-hover:text-white">
                      Continue Shopping
                    </span>
                    <div className="absolute inset-0 bg-black transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  </button>
                  <button className="group relative px-8 py-3 bg-black text-white overflow-hidden">
                    <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                      Proceed to Checkout
                    </span>
                    <div className="absolute inset-0 bg-gray-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
