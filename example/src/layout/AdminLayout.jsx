import React from 'react';
import {Link, Outlet,} from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Nav from "../components/Nav.jsx";
import {setSidebar} from "../store/slices/authSlice.js";
import {useDispatch, useSelector} from "rsl-redux";
import DashboardSidebar from "../components/DashboardSidebar/DashboardSidebar.jsx";


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
                            <DashboardSidebar scope="admin"  />

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