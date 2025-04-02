import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Backpack,
  Search,
  ShoppingCart,
  User,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems,getLocalStorageItem } from "../../store/cart-slice.js";


function MenuItems({ className = "" }) {
  return (
    <nav
      className={`flex gap-8 text-sm font-medium tracking-wider uppercase ${className}`}
    >
      <Link to="/shop/home">
        <span className="text-gray-700 hover:text-black transition-all duration-300 relative group">
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </span>
      </Link>
      <div className="relative group">
        <span className="text-gray-700 hover:text-black transition-all duration-300 cursor-pointer flex items-center gap-1">
          Categories
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 shadow-lg rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="py-2">
            <Link
              to="/shop/men"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Men's Wear
            </Link>
            <Link
              to="/shop/women"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Women's Wear
            </Link>
            <Link
              to="/shop/accessories"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Accessories
            </Link>
          </div>
        </div>
      </div>
      <Link to="/shop/new-arrivals">
        <span className="text-gray-700 hover:text-black transition-all duration-300 relative group">
          New Arrivals
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </span>
      </Link>
    </nav>
  );
}

function ShoppingHeader() {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const {isAuthenticated,user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const useName= user?.userName;
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
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
  }, [dispatch, isAuthenticated,localStorage]);
  return (
    <header className="bg-white border-b border-gray-100 backdrop-blur-lg bg-opacity-80">
      <div className="max-w-7xl mx-auto">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <Backpack className="w-8 h-8 transform group-hover:scale-110 transition-transform duration-300" />
            <span className="font-bold text-xl tracking-tight">HappyBag</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block flex-1 px-12">
            <MenuItems />
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-50 rounded-full transition-all duration-300"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/shop/cart"
              className="p-2 hover:bg-gray-50 rounded-full transition-all duration-300 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 ? (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              ) : (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                  {"0"}
                </span>
              )}
            </Link>

            {useName ? (
              <div className="relative group">
                <Link
                  to="/shop/account"
                  className="flex items-center justify-center w-9 h-9 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300"
                >
                  <span className="text-sm font-medium">
                    {useName[0]?.toUpperCase()}
                  </span>
                </Link>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 shadow-lg rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <Link
                      to="/shop/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/shop/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Orders
                    </Link>
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpenSideMenu(!openSideMenu)}
            className="lg:hidden p-2 hover:bg-gray-50 rounded-full transition-all duration-300"
          >
            {openSideMenu ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showSearch ? "h-16" : "h-0"
          }`}
        >
          <div className="px-4 py-3">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-y-0 right-0 w-full max-w-sm bg-white transform transition-transform duration-300 ease-in-out shadow-xl ${
            openSideMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-end">
              <button
                onClick={() => setOpenSideMenu(false)}
                className="p-2 hover:bg-gray-50 rounded-full transition-all duration-300"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="px-4 py-6">
                <nav className="flex flex-col gap-6">
                  <Link
                    to="/"
                    className="text-lg text-gray-700 hover:text-black transition-colors duration-300"
                  >
                    Home
                  </Link>
                  <div className="space-y-3">
                    <p className="text-lg text-gray-700">Categories</p>
                    <div className="pl-4 space-y-3">
                      <Link
                        to="/shop/men"
                        className="block text-gray-600 hover:text-black transition-colors duration-300"
                      >
                        Men's Wear
                      </Link>
                      <Link
                        to="/shop/women"
                        className="block text-gray-600 hover:text-black transition-colors duration-300"
                      >
                        Women's Wear
                      </Link>
                      <Link
                        to="/shop/accessories"
                        className="block text-gray-600 hover:text-black transition-colors duration-300"
                      >
                        Accessories
                      </Link>
                    </div>
                  </div>
                  <Link
                    to="/shop/new-arrivals"
                    className="text-lg text-gray-700 hover:text-black transition-colors duration-300"
                  >
                    New Arrivals
                  </Link>
                  <Link
                    to="/shop/sale"
                    className="text-lg text-gray-700 hover:text-black transition-colors duration-300"
                  >
                    Sale
                  </Link>
                </nav>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100">
              {useName ? (
                <div className="space-y-4">
                  <Link
                    to="/shop/profile"
                    className="block w-full px-4 py-2 text-center text-white bg-black hover:bg-gray-800 transition-colors duration-300"
                  >
                    My Account
                  </Link>
                  <button className="block w-full px-4 py-2 text-center text-gray-700 border border-gray-200 hover:border-gray-300 transition-colors duration-300">
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/auth/login"
                    className="block w-full px-4 py-2 text-center text-gray-700 border border-gray-200 hover:border-gray-300 transition-colors duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/register"
                    className="block w-full px-4 py-2 text-center text-white bg-black hover:bg-gray-800 transition-colors duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
