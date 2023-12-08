import React from 'react';
import {Link, Outlet,} from "react-router-dom";
import Sidebar from "../component/Sidebar.jsx";
import Nav from "../component/Nav.jsx";


const AdminLayout = () => {
    return (
        <div>
            {/* You can place common layout elements here */}
            <Nav/>
            <div className="container">
                {/* This will render the children components */}

                <div className="admin-layout">
                    <Sidebar className="sidebar">
                        <div>
                            <li><Link to="/admin">Admin Dashboard</Link></li>
                            <li><Link to={`/admin/products`}>Products</Link></li>
                            <li><Link to={`/admin/add-product`}>Add Product</Link></li>
                        </div>
                    </Sidebar>

                    <div className="content ">
                        <Outlet/>
                    </div>
                </div>

            </div>
        </div>
    );
};


export default AdminLayout;