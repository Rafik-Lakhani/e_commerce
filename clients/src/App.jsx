import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import AuthLogin from "./pages/auth/UserLogin";
import AuthRegister from "./pages/auth/UserRegister";
import AdminLayout from "./components/admin-view/AdminLayout";
import AdminDashboard from "./pages/admin-view/AdminDashboard";
import AdminProduct from "./pages/admin-view/AdminProduct";
import AdminOrder from "./pages/admin-view/AdminOrders";
import AdminFeatures from "./pages/admin-view/AdminFeatures";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import NotFound from "./pages/not-found/NotFound";
import ShoppingHome from "./pages/shopping-view/ShoppingHome";
import ShoppingProductList from "./pages/shopping-view/ShoppingProductList";
import ShoppingCheckOut from "./pages/shopping-view/ShoppingCheckOut";
import ShoppingAccount from "./pages/shopping-view/ShoppingAccount";
import CheckUserAuth from "./components/common/CheckUserAuth";
import UnAuth from "./pages/un-auth/UnAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice.js";
import { toast } from "react-toastify";
import ShoppingProduct from "./pages/shopping-view/ShoppingProduct.jsx";

function App() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth()).then((data) => {
      if (typeof data.payload === "string") {
        // navigate("/auth/login");
        return;
      }
    });
  }, []);
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <h1>Loading....</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <h1></h1>
      <Routes>
        <Route path="/" element={<Navigate to="/shop/home" replace />} />
        <Route
          path="/auth"
          element={
            <CheckUserAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckUserAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        {/* Add Admin routes here */}
        <Route
          path="/admin"
          element={
            <CheckUserAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckUserAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProduct />} />
          <Route path="orders" element={<AdminOrder />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingProductList />} />
          <Route path="cart" element={<ShoppingCheckOut />} />
          <Route path="search" element={<ShoppingCheckOut />} />
          <Route path="product/:id" element={<ShoppingProduct />} />
          <Route path="checkout" element={<ShoppingCheckOut />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* here is un auth routes */}
        <Route path="/unauth" element={<UnAuth />} />
      </Routes>
    </div>
  );
}

export default App;
