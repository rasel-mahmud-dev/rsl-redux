import React from 'react';
import {Outlet} from "react-router-dom";
import Nav from "../components/Navigation/Nav.jsx";
import Carts from "../components/MobileNavigation/Carts.jsx";
import {useDispatch, useSelector} from "rsl-redux"
import {setSidebar} from "../store/slices/authSlice.js";
import WishlistDrawer from "../components/MobileNavigation/Wishlist.jsx";
import CategoryDrawer from "../components/MobileNavigation/CategoryDrawer.jsx";

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
                <div className="mb-10 md:mb-0">

                <Outlet />
                </div>
            </div>



            <Carts onClose={() => setSidebarVal("")}
                   isOpen={openSidebar === "cart"}
            />


            <WishlistDrawer onClose={() => setSidebarVal("")}
                          isOpen={openSidebar === "wishlist"}
            />


            <CategoryDrawer onClose={() => setSidebarVal("")}
                          isOpen={openSidebar === "category"}
            />


        </div>
    );
};

export default MainLayout;