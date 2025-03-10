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

const dummyCartItems = [
  {
    id: 1,
    title: "Classic Aviator Sunglasses",
    salePrice: 49.99,
    quantity: 1,
    image: ["https://via.placeholder.com/150"],
  },
  {
    id: 2,
    title: "Blue Light Blocking Glasses",
    salePrice: 29.99,
    quantity: 2,
    image: ["https://via.placeholder.com/150"],
  },
  {
    id: 3,
    title: "Sporty Wraparound Shades",
    salePrice: 39.99,
    quantity: 1,
    image: ["https://via.placeholder.com/150"],
  },
];

function CartPage() {
  const dispatch = useDispatch();
  // const [cartItems, setCartItems] = useState(dummyCartItems);

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
      const updatedCartItems = cartItems.filter((item) => item.productId !== id);
      dispatch(updateLocalStorageItem({ cartItems: updatedCartItems }));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.salePrice * item.quantity,
      0
    );
  };

  useEffect(() => {
    dispatch(fetchUserProducts());
    if (isAuthenticated) {
      dispatch(fetchCartItems(user._id));
    } else {
      console.log(localStorage.getItem("addTOCartProduct"));
      const localStorageItem = JSON.parse(
        localStorage.getItem("addTOCartProduct")
      );
      if (localStorageItem.length > 0) {
        dispatch(getLocalStorageItem());
      }
    }
  }, [dispatch, isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  console.log(cartItems);
  return (
    <div className="min-h-screen p-6 bg-white flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          Shopping Cart
        </h2>
        {cartItems.length == 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((cartItem) => {
                const item = products.find(
                  (product) => product._id === cartItem.productId
                );
                return(
                  item && (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row items-center justify-between p-5 border rounded-lg bg-gray-50 hover:shadow-md transition"
                    >
                      <img
                        src={item.image[0]}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 px-6 text-center sm:text-left">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-md font-medium">
                          ${item.salePrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            if (cartItem.quantity > 1) {
                              updateQuantity(item._id, cartItem.quantity - 1);
                            } else {
                              toast.error("Cannot Leasthen 1");
                            }
                          }}
                          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                          -
                        </button>
                        <span className="px-4 font-semibold text-gray-800 text-lg">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => {
                            if (cartItem.quantity < 10) {
                              updateQuantity(item._id, cartItem.quantity + 1);
                            } else {
                              toast.error("Cannot Greathen 10");
                            }
                          }}
                          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-700 ml-4"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  )
                );
              })}
            </div>

            <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row justify-between items-center">
              <h3 className="text-2xl font-semibold text-gray-900">
                Total: ${getTotalPrice().toFixed(2)}
              </h3>
              <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-all shadow-md">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
