import React from 'react';
import { Route, Routes} from "react-router-dom";
import Nav from "../component/Nav.jsx";
import Login from "../pages/auth/Login.jsx";
import ReduxRTK from "../pages/ReduxRTK.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import Products from "../pages/Products.jsx";
import Registration from "../pages/auth/Registration.jsx";
import SearchProduct from "../pages/SearchProduct.jsx";
import Carts from "../pages/Carts.jsx";


const MainLayout = () => {
    return (
        <div>
            {/* You can place common layout elements here */}

            <div className="container">
                {/* This will render the children components */}
                <Routes>
                    {/* Define children routes */}
                    <Route path="/" element={<Products />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/search" element={<SearchProduct />} />
                    <Route path="/p/:categoryName" element={<SearchProduct />} />
                    <Route path="/carts" element={<Carts />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/rtk" element={<ReduxRTK />} />
                    <Route path="/about" element={<AboutPage />} />
                    {/* Add more routes as needed */}
                </Routes>
            </div>
        </div>
    );
};

export default MainLayout;