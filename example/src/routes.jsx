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
import AdminLayout from "./layout/AdminLayout.jsx";
import AddProduct from "./pages/admin/AddProduct.jsx";
import AddCategory from "./pages/admin/AddCategory.jsx";
import ProductList from "./pages/admin/ProductList.jsx";
import BrandList from "./pages/admin/BrandList.jsx";
import CategoryList from "./pages/admin/CategoryList.jsx";
import AddBrand from "./pages/admin/AddBrand.jsx";
import Checkout from "./pages/Checkout.jsx";


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
        element: <AdminLayout/>,
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

        ]
    }
])

export default routes