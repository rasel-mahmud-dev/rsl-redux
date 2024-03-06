import React from 'react';
import {Outlet} from "react-router-dom";
import Nav from "../components/Nav.jsx";
import SettingDrawer from "../components/Settings/SettingDrawer.jsx";
import {useDispatch, useSelector} from "rsl-redux"
import {setSidebar} from "../store/slices/authSlice.js";
import WishlistDrawer from "../components/MobileNavigation/Wishlist.jsx";
import ThemeChoose from "../components/ThemeChoose/ThemeChoose.jsx";

const MainLayout = () => {

    const {openSidebar} = useSelector(state=>state.authState)
    const dispatch  = useDispatch()

    function setSidebarVal(val) {
        dispatch(setSidebar(val))
    }



    return (
        <div>
            <Nav/>
            <div className="container">
                <Outlet />
            </div>



            <SettingDrawer onClose={() => setSidebarVal("")}
                          isOpen={openSidebar === "cart"}
            />


            <WishlistDrawer onClose={() => setSidebarVal("")}
                          isOpen={openSidebar === "wishlist"}
            />


        </div>
    );
};

export default MainLayout;