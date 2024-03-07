import {createBrowserRouter, Route} from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import Products from "./pages/Products.jsx";
import Login from "./pages/auth/Login.jsx";
import SearchProduct from "./pages/SearchProduct.jsx";
import Carts from "./pages/Carts.jsx";
import Registration from "./pages/auth/Registration.jsx";
import ReduxRTK from "./pages/ReduxRTK.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import React from "react";
import DashboardHome from "./pages/admin/DashboardHome.jsx";
import CustomerDashboardHome from "./pages/customer/DashboardHome.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import AddProduct from "./pages/admin/AddProduct.jsx";
import AddCategory from "./pages/admin/AddCategory.jsx";
import ProductList from "./pages/admin/ProductList.jsx";
import BrandList from "./pages/admin/BrandList.jsx";
import CategoryList from "./pages/admin/CategoryList.jsx";
import AddBrand from "./pages/admin/AddBrand.jsx";
import Checkout from "./pages/Checkout.jsx";
import CustomerDashboardLayout from "./layout/CustomerDashboardLayout.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import MyOrders from "./pages/customer/MyOrders.jsx";
import Auth from "./middleware/Auth.jsx";
import CustomerList from "./pages/admin/Customers/List.jsx";
import AddUser from "./pages/admin/Customers/AddUser.jsx";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {path: "", element: <Products/>},
            {path: "login", element: <Login/>},
            {path: "search", element: <SearchProduct/>},
            {path: "p/:categoryName", element: <SearchProduct/>},
            {path: "p/", element: <SearchProduct/>},
            {path: "carts", element: <Carts/>},
            {path: "checkout", element: <Checkout/>},
            {path: "register", element: <Registration/>},
            {path: "rtk", element: <ReduxRTK/>},
            {path: "about", element: <AboutPage/>},
        ]
    },
    {
        path: "/admin",
        element: <Auth accessRoles={["admin"]}><AdminLayout/></Auth>,
        children: [
            {path: "", element: <DashboardHome/>},
            {path: "add-product", element: <AddProduct/>},
            {path: "edit-product/:productId", element: <AddProduct/>},
            {path: "edit-category/:categoryId", element: <AddCategory/>},
            {path: "add-category", element: <AddCategory/>},
            {path: "products", element: <ProductList/>},
            {path: "brands", element: <BrandList/>},
            {path: "edit-brand/:brandId", element: <AddBrand/>},
            {path: "add-brand", element: <AddBrand/>},
            {path: "categories", element: <CategoryList/>},
            {path: "customers", element: <CustomerList/>},
            {path: "add-customer", element: <AddUser/>},
            {path: "edit-customer/:customerId", element: <AddUser/>},

        ]
    },
    {
        path: "/dashboard",
        element: <Auth accessRoles={["customer", "admin"]}><CustomerDashboardLayout/></Auth>,
        children: [
            {path: "", element: <CustomerDashboardHome/>},
            {path: "orders", element: <MyOrders/>},
            {path: "carts", element: <Carts/>},
            {path: "wishlist", element: <Wishlist/>},

        ]
    }
])

export default routes