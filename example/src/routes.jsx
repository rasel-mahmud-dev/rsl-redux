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


const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {path: "", element: <Products/>},
            {path: "login", element: <Login/>},
            {path: "search", element: <SearchProduct/>},
            {path: "p/:categoryName", element: <SearchProduct/>},
            {path: "carts", element: <Carts/>},
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
            {path: "add-category", element: <AddCategory/>},
            {path: "products", element: <ProductList/>},

        ]
    }
])

export default routes