import React from 'react';
import {Link, Outlet,} from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Nav from "../components/Navigation/Nav.jsx";
import {useDispatch, useSelector} from "rsl-redux";
import {setSidebar} from "../store/slices/authSlice.js";
import DashboardSidebar from "../components/DashboardSidebar/DashboardSidebar.jsx";


const CustomerDashboardLayout = () => {
    const {auth, openSidebar} = useSelector(state => state.authState)
    const dispatch = useDispatch()
    return (
        <div>
            {/* You can place common layout elements here */}
            <Nav/>
            <div className="containers">
                {/* This will render the children components */}

                <div className={`admin-layout ${openSidebar === "customer_dashboard" ? "mobile-open" : ""}`}>
                    <Sidebar onClose={() => dispatch(setSidebar(""))} isOpen={openSidebar === "customer_dashboard"}
                             className="sidebar">
                        <div className="font-semibold text-sm text-neutral-800">
                            <DashboardSidebar scope="customer"/>
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