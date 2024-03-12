import React from 'react';
import {BiHome} from "react-icons/bi";
import {FaCartShopping} from "react-icons/fa6";
import {AiFillHeart} from "react-icons/ai";
import {CgList} from "react-icons/cg";
import {PiBrandy} from "react-icons/pi";
import {setSidebar} from "../../store/slices/authSlice.js";
import {useDispatch} from "rsl-redux"
import {useNavigate} from "react-router-dom";

const MobileNavigation = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    function handleOpenDrawer(val) {
        dispatch(setSidebar(val))
    }

    return (
        <div className="mobile-navigation">

            <div className="m-item active" onClick={() => navigate("/")}>
                <BiHome/>
            </div>
            <div className="m-item" onClick={() => handleOpenDrawer("category")}>
                <PiBrandy/>
            </div>
            <div className="m-item" onClick={() => handleOpenDrawer("category")}>
                <CgList/>
            </div>

            <div className="m-item" onClick={() => handleOpenDrawer("wishlist")}>
                <AiFillHeart/>
            </div>

            <div className="m-item" onClick={() => handleOpenDrawer("cart")}>
                <FaCartShopping/>
            </div>


        </div>
    );
};

export default MobileNavigation;