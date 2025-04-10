import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Backpack,
  Search,
  ShoppingCart,
  User,
  MenuIcon,
  XIcon,
  ChevronDown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, getLocalStorageItem } from "../../store/cart-slice.js";
import { Categoties } from "../../config/CategoriesConfig.js";

function MenuItems({ className = "" }) {
  const navigate = useNavigate();
  
  const handleNewArrivals = () => {
    navigate('/shop/listing', { state: { filter: 'newest' } });
  };

  return (
    <nav className={`flex gap-8 text-sm font-medium tracking-wider uppercase ${className}`}>
      <Link to="/shop/home" className="nav-link">
        Home
      </Link>
      <div className="relative group">
        <button className="nav-link flex items-center gap-1">
          Categories
          <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
        </button>
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="py-2">
            {Categoties.map((category) => (
              <Link
                key={category.id}
                to={`/shop/listing/${category.id}`}
                className="dropdown-item"
              >
                {category.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <button onClick={handleNewArrivals} className="nav-link">
        New Arrivals
      </button>
      <Link to="/contact" className="nav-link">
        Contact
      </Link>
    </nav>
  );
}

function ShoppingHeader() {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const userName = user?.userName;
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
  }, [dispatch, isAuthenticated]);


  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <Backpack className="w-8 h-8 transform group-hover:scale-110 transition-transform duration-300" />
            <span className="font-bold text-xl tracking-tight">BAGLUXE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block flex-1 px-12">
            <MenuItems />
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to={'/shop/search'}>
              <Search className="w-5 h-5" />
            </Link>

            <Link
              to="/shop/cart"
              className="p-2 hover:bg-gray-50 rounded-full transition-all duration-300 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {userName ? (
              <div className="relative group">
                <Link
                  to="/shop/account"
                  className="flex items-center justify-center w-9 h-9 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300"
                >
                  <span className="text-sm font-medium">
                    {userName[0]?.toUpperCase()}
                  </span>
                </Link>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <Link
                      to="/shop/profile"
                      className="dropdown-item"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/shop/orders"
                      className="dropdown-item"
                    >
                      Orders
                    </Link>
                    <button className="dropdown-item text-red-600">
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
                  className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 transition-colors duration-300 rounded-md"
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
                <MenuItems className="flex-col gap-6" />
              </div>
            </div>
            <div className="p-4 border-t border-gray-100">
              {userName ? (
                <div className="space-y-4">
                  <Link
                    to="/shop/profile"
                    className="block w-full px-4 py-2 text-center text-white bg-black hover:bg-gray-800 transition-colors duration-300 rounded-md"
                  >
                    My Account
                  </Link>
                  <button className="block w-full px-4 py-2 text-center text-gray-700 border border-gray-200 hover:border-gray-300 transition-colors duration-300 rounded-md">
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/auth/login"
                    className="block w-full px-4 py-2 text-center text-gray-700 border border-gray-200 hover:border-gray-300 transition-colors duration-300 rounded-md"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/register"
                    className="block w-full px-4 py-2 text-center text-white bg-black hover:bg-gray-800 transition-colors duration-300 rounded-md"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx="true">{`
        .nav-link {
          position: relative;
          padding: 0.5rem 0;
          color: #374151;
          transition: all 0.3s ease;
        }
        
        .nav-link:hover {
          color: #000;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background-color: #000;
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .dropdown-item {
          display: block;
          padding: 0.5rem 1rem;
          color: #374151;
          transition: all 0.2s ease;
        }
        
        .dropdown-item:hover {
          background-color: #f9fafb;
          color: #000;
        }
      `}</style>
    </header>
  );
}

export default ShoppingHeader;
