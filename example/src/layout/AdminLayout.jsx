import React from 'react';
import {Link, Outlet,} from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Nav from "../components/Nav.jsx";


const AdminLayout = () => {
    return (
        <div>
            {/* You can place common layout elements here */}
            <Nav/>
            <div className="containers">
                {/* This will render the children components */}

                <div className="admin-layout">
                    <Sidebar className="sidebar">
                        <div className="font-semibold text-sm text-neutral-800">
                            <li className="list-none py-2 bg-gray-200/50 hover:bg-pink-200 cursor-pointer  my-1 px-2 rounded-lg">
                                <Link className="text-neutral-800 font-semibold" to="/admin">Admin Dashboard</Link></li>
                            <li className="list-none py-2 bg-gray-200/50 hover:bg-pink-200 cursor-pointer  my-1 px-2 rounded-lg">
                                <Link className="text-neutral-800 font-semibold" to={`/admin/products`}>Products</Link>
                            </li>
                            <li className="list-none py-2 bg-gray-200/50 hover:bg-pink-200 cursor-pointer  my-1 px-2 rounded-lg">
                                <Link className="text-neutral-800 font-semibold" to={`/admin/brands`}>Brands</Link></li>
                            <li className="list-none py-2 bg-gray-200/50 hover:bg-pink-200 cursor-pointer  my-1 px-2 rounded-lg">
                                <Link className="text-neutral-800 font-semibold"
                                      to={`/admin/categories`}>Categories</Link></li>
                        </div>
                    </Sidebar>

                    <div className="content ">
                        <div className="container">
                            <Outlet/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};


export default AdminLayout;