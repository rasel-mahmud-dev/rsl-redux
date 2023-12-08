import React from 'react';
import {Outlet} from "react-router-dom";
import Nav from "../component/Nav.jsx";

const MainLayout = () => {
    return (
        <div>
            <Nav/>
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;