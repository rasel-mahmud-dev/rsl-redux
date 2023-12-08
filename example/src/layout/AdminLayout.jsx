import React from 'react';
import {Route, Routes} from "react-router-dom";
import AddProduct from "../pages/admin/AddProduct.jsx";
import Nav from "../component/Nav.jsx";


const AdminLayout = () => {
    return (
        <div>
            {/* You can place common layout elements here */}
            <div className="container">
                {/* This will render the children components */}
                <Routes>
                    <Route path="/add-product" element={<AddProduct />} />
                </Routes>
            </div>
        </div>
    );
};


export default AdminLayout;