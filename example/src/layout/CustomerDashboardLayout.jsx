import React from 'react';
import {Link, Outlet,} from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Nav from "../components/Nav.jsx";
import {useSelector} from "rsl-redux";


const CustomerDashboardLayout = () => {
    const {auth} = useSelector(state=>state.authState)
    return (
        <div>
            {/* You can place common layout elements here */}
            <Nav/>
            <div className="containers">
                {/* This will render the children components */}

                <div className="admin-layout">
                    <Sidebar className="sidebar">
                        <div className="capitalize font-semibold text-sm text-neutral-800">
                            <li className="uppercase list-none py-2 bg-gray-200/50 hover-list-primary cursor-pointer  my-1 px-2 rounded-lg">
                                <Link className=" text-neutral-800 font-semibold" to="/dashboard">{auth?.username} Dashboard</Link></li>
                            <li className="list-none py-2 bg-gray-200/50 hover-list-primary cursor-pointer  my-1 px-2 rounded-lg">
                                <Link className="text-neutral-800 font-semibold" to={`/dashboard/orders`}>My Orders</Link>
                            </li>
                            <li className="list-none py-2 bg-gray-200/50 hover-list-primary cursor-pointer  my-1 px-2 rounded-lg">
                                <Link className="text-neutral-800 font-semibold" to={`/dashboard/carts`}>Carts</Link></li>
                            <li className="list-none py-2 bg-gray-200/50 hover-list-primary cursor-pointer  my-1 px-2 rounded-lg">
                                <Link className="text-neutral-800 font-semibold"
                                      to={`/dashboard/wishlist`}>Wishlist</Link></li>
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


export default CustomerDashboardLayout;