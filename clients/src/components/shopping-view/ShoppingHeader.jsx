import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Backpack, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { ShoppingCart, User, MenuIcon, XIcon } from "lucide-react";

// here create a menu component

function MenuItems({ className = "" }) {
  return (
    <nav className={`flex gap-10 text-lg font-medium ${className}`}>
      <Link to="/shop/home">
        <span className="text-gray-600 hover:text-gray-800">Home</span>
      </Link>
      <Link to="/shop/listing">
        <span className="text-gray-600 hover:text-gray-800">Products</span>
      </Link>
      <Link to="/shop/about">
        <span className="text-gray-600 hover:text-gray-800">About</span>
      </Link>
      <Link to="/shop/contact">
        <span className="text-gray-600 hover:text-gray-800">Contact</span>
      </Link>
    </nav>
  );
}

// here create a right Side Components

function ShoppingHeader() {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const useName = useSelector((state) => state.auth.user.userName);
  const userFirstLetter = useName[0];
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-300 bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Backpack className="w-10 h-10" />
          <span className="font-bold text-2xl">HappBag</span>
        </Link>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <div className="flex items-center">
            <Link
              to="/shop/search"
              className="text-gray-800 hover:text-gray-600 p-2.5 px-2.5 rounded-full bg-gray-200"
            >
              <Search />
            </Link>
            <Link
              to="/shop/cart"
              className="text-gray-800 hover:text-gray-600 p-2.5 px-2.5 rounded-full bg-gray-200 ml-3"
            >
              <ShoppingCart />
            </Link>
            {useName ? (
              <Link
                to="/auth/profile"
                className="text-gray-800 hover:text-gray-800 rounded-full bg-gray-200 p-1.5 px-3.5 ml-3 font-medium capitalize text-2xl"
              >
                {userFirstLetter}
              </Link>
            ) : (
              <Link
                to="/auth/login"
                className="text-gray-800 hover:text-gray-800 rounded-full bg-gray-200 p-2.5 text-xl px-4.5 ml-3 font-medium capitalize"
              >
                <User />
              </Link>
            )}
          </div>
        </div>
        <div className="hidden max-lg:block self-center w-full mx-2.5 rounded-4x h-[50%]">
          <div className="flex w-full justify-between items-center px-2 self-center bg-gray-200 rounded-2xl h-full">
            <Search />
            <input
              type="text"
              className="w-full ml-1 border-l-2 border-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <div className="hidden max-lg:block">
          <button
            onClick={() => {
              setOpenSideMenu((prevState) => !prevState);
            }}
          >
            {openSideMenu ? (
              <XIcon className="w-7 h-7 text-gray-800" />
            ) : (
              <MenuIcon className="w-7 h-7 text-gray-800" />
            )}
          </button>
          <div
            className={`absolute top-18 rounded-3xl ${openSideMenu? 'right-0' : '-right-[100%]' } duration-300 ease-in-out p-8 center h-fit w-fit bg-gray-100 max-md:w-[50%] max-sm:w-full max-lg:w-[30%]`}
          >
            <div className="flex flex-col gap-6 items-center">
              <div className="flex gap-5 items-center flex-col">
                <Link to="/shop/home">
                  <span className="text-gray-600 hover:text-gray-800">
                    Home
                  </span>
                </Link>
                <Link to="/shop/listing">
                  <span className="text-gray-600 hover:text-gray-800">
                    Products
                  </span>
                </Link>
                <Link to="/shop/about">
                  <span className="text-gray-600 hover:text-gray-800">
                    About
                  </span>
                </Link>
                <Link to="/shop/contact">
                  <span className="text-gray-600 hover:text-gray-800">
                    Contact
                  </span>
                </Link>
              </div>
              <div className="w-full flex items-center justify-center gap-4">
                <Link
                  to="/shop/cart"
                  className="text-gray-800 hover:text-gray-600 p-2.5 px-2.5 rounded-full bg-gray-200"
                >
                  <ShoppingCart />
                </Link>
                {useName ? (
                  <Link
                    to="/auth/profile"
                    className="text-gray-800 hover:text-gray-800 rounded-full bg-gray-200 p-1.5 px-3.5 ml-3 font-medium capitalize text-2xl"
                  >
                    {userFirstLetter}
                  </Link>
                ) : (
                  <Link
                    to="/auth/login"
                    className="text-gray-800 hover:text-gray-800 rounded-full bg-gray-200 p-2.5 text-xl px-4.5 ml-3 font-medium capitalize"
                  ></Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
