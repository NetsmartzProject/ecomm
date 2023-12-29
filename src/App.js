
import * as React from "react";
// import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductdetailPage";
import Protected from "./Auth/components/Protetcted";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./Auth/AuthSlice";
import { fetchItemsByUserIdAsync } from "./cart/CartSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccess";
import Userorderpage from "./pages/Userorderpage";
import UserprofilePage from "./pages/UserprofilePage";
import { fetchLoggedInUserAsync } from "./user/UserSlice";
import Logout from "./Auth/components/LogOut";
import ForgotPage from "./pages/ForgotPassword";
import ProtetctedAdmin from "./Auth/components/Protetcted Admin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductdetailPage ";
import AdminProductFormPage from "./pages/ProductFormPage";
import AdminOrderPage from "./pages/AdminOrderPage";
import SearchPage from "./pages/SearchPage";
// import Navbar from "./navbar/Navbar";
// import ProductCategoryChart from "./app/Product-List/ProductCategoryChart ";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home></Home></Protected>,
  },

  {
    path: "/admin",
    element: <ProtetctedAdmin><AdminHome></AdminHome></ProtetctedAdmin>,
  },

  {
    path: "/Login",
    element: <LoginPage></LoginPage>,
  },

  {
    path: "/Signup",
    element: <SignupPage></SignupPage>,
  },

  {
    path: "/Cart",
    element:
      <Protected>
        <CartPage></CartPage>
      </Protected>,
  },

  {
    path: "/Checkout",
    element:
      <Protected>
        <Checkout></Checkout>
      </Protected>,
  },

  {
    path: "/ProductDetail/:id",
    element:
      <Protected>
        <ProductDetailPage></ProductDetailPage>,
      </Protected>
  },

  {
    path: "/admin/ProductDetail/:id",
    element:
      <ProtetctedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>,
      </ProtetctedAdmin>
  },

{
    path: "/admin/product-form",
    element:
      <ProtetctedAdmin>
        <AdminProductFormPage></AdminProductFormPage>,
      </ProtetctedAdmin>
  },

  {
    path: "/admin/orders",
    element:
      <ProtetctedAdmin>
        <AdminOrderPage></AdminOrderPage>,
      </ProtetctedAdmin>
  },


  {
    path: "/admin/product-form/edit/:id",
    element:
      <ProtetctedAdmin>
        <AdminProductFormPage></AdminProductFormPage>,
      </ProtetctedAdmin>
  },

  {
    path: "*",
    element:
      <PageNotFound></PageNotFound>,
  },

  {
    path: "/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>,
  },

  {
    path: "/orders",
    element: <Userorderpage></Userorderpage>,
  },

  {
    path: "/profile",
    element: <UserprofilePage></UserprofilePage>,
  },

  {
    path: "/logout",
    element: <Logout></Logout>,
  },

  {
    path: "/forgot-password",
    element:
      <ForgotPage></ForgotPage>,
  },

  {
    path: "/search",
    element: <SearchPage></SearchPage>,
  },







]);


function App() {
  const user = useSelector(selectLoggedInUser)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;





