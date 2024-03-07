import React from 'react';
import {Link, Outlet,} from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Nav from "../components/Nav.jsx";
import {setSidebar} from "../store/slices/authSlice.js";
import {useDispatch, useSelector} from "rsl-redux";


const AdminLayout = () => {
    const {openSidebar} = useSelector(state=>state.authState)
    const dispatch = useDispatch()

    return (
        <div>
            {/* You can place common layout elements here */}
            <Nav/>
            <div className="containers">
                {/* This will render the children components */}

                <div className={`admin-layout ${openSidebar === "admin_dashboard" ? "mobile-open" : ""}`}>
                    <Sidebar  onClose={()=>  dispatch(setSidebar(""))} isOpen={openSidebar === "admin_dashboard"} className="sidebar">
                        <div className="font-semibold text-sm text-neutral-800">
                            <li className="list-none py-2 bg-gray-200/50 hover-list-primary cursor-pointer  my-1 px-2 rounded-lg">
                                <Link className="text-neutral-800 font-semibold" to="/admin">Admin Dashboard</Link></li>
                            <li className="list-none py-2 bg-gray-200/50 hover-list-primary cursor-pointer  my-1 px-2 rounded-lg">
                                <Link className="text-neutral-800 font-semibold" to={`/admin/products`}>Products</Link>
                            </li>
                            <li className="list-none py-2 bg-gray-200/50 hover-list-primary cursor-pointer  my-1 px-2 rounded-lg">
                                <Link className="text-neutral-800 font-semibold" to={`/admin/brands`}>Brands</Link></li>
                            <li className="list-none py-2 bg-gray-200/50 hover-list-primary cursor-pointer  my-1 px-2 rounded-lg">
                                <Link className="text-neutral-800 font-semibold"
                                      to={`/admin/categories`}>Categories</Link></li>
                            <li className="list-none py-2 bg-gray-200/50 hover-list-primary cursor-pointer  my-1 px-2 rounded-lg">
                                <Link className="text-neutral-800 font-semibold"
                                      to={`/admin/customers`}>Users</Link></li>
                        </div>
                    </Sidebar>

                    <div className="content ">
                        <div className="">
                            <Outlet/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};


export default AdminLayout;