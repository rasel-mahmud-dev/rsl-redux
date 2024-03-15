import {Link, NavLink, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "rsl-redux";
import {logOut, setSidebar} from "../../store/slices/authSlice.js";
import {BiSearch} from "react-icons/bi";
import React, {useEffect, useState} from "react";
import {CiShoppingCart} from "react-icons/ci";
import Popup from "../Popup.jsx";
import {HiBars4} from "react-icons/hi2";
import getAssetPath from "../../utils/getAssetPath.js";
import MobileNavigation from "../MobileNavigation/MobileNavigation.jsx";
import {FaSignInAlt} from "react-icons/fa";
import CartPopup from "./CartPopup.jsx";
import AuthMenuPopup from "./AuthMenuPopup.jsx";
import Image from "../Image/Image.jsx";

const Nav = () => {
    const {auth, openSidebar} = useSelector(state => state?.authState)

    const {carts} = useSelector(state => state?.cartState)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [getParams] = useSearchParams()
    const search = getParams.get("search")
    const location = useLocation()

    const [openMenu, setOpenMenu] = useState("")

    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        setSearchValue(search ?? "")
    }, [search]);


    function handleSearchProduct(e) {
        const val = e.target.value
        // TODO: uncomment
        if (location.pathname.startsWith("/p/")) {
            navigate(location.pathname + `?search=` + val)
            return
        }
        navigate("/p/?search=" + val)
    }

    function handleToggleLeft() {
        let which = "home"
        if (location.pathname.startsWith("/dashboard")) {
            which = "customer_dashboard"
        } else if (location.pathname.startsWith("/admin")) {
            which = "admin_dashboard"
        } else if (location.pathname.startsWith("/p/")) {
            which = "filter"
        }


        which = openSidebar === which ? "" : which

        dispatch(setSidebar(which))
    }

    return (
        <>
            <div className="navigation fixed w-full left-0 top-0">

                <div className="mx-auto max-w-5xl">
                    <div className="py-3">
                        <div className="w-full flex justify-between gap-x-2 items-center rounded-3xl py-2 px-4">
                            <div className="flex items-center gap-x-6 w-full max-w-sm">

                                <li className="text-sm font-medium list-none flex items-center gap-x-2 ">
                                    <span className="inline-block  md:hidden">
                                        <HiBars4 className="text-xl text-white" onClick={handleToggleLeft}/>
                                    </span>
                                    <NavLink className="text-white" to="/">Home</NavLink>
                                </li>
                                <li className="text-sm font-medium list-none w-full">
                                    <div
                                        className="flex items-center search-input-root text-white  rounded-2xl">
                                        <input value={searchValue} onChange={handleSearchProduct} type="text"
                                               placeholder="Search products..."
                                               className="w-full text-white search-input pl-4 bg-transparent rounded-lg focus:outline-none"
                                        />
                                        <button className="focus:outline-none pr-4 rounded-2xl  mr-px">
                                            <BiSearch/>
                                        </button>
                                    </div>
                                </li>
                            </div>

                            {auth ? (
                                <div className="text-sm text-white font-medium list-none flex items-center gap-x-1 md:gap-x-3">

                                    <div>
                                        <div className="text-white relative list-none flex items-center gap-x-4">

                                            <div onClick={() => setOpenMenu("carts")}
                                                 className="text-white  list-none flex items-center gap-x-3 relative">
                                                <span className="hidden md:inline-block">Your Cart</span>
                                                <div
                                                    className="w-9 h-9 circle-pill rounded-full flex items-center justify-center">
                                                    <CiShoppingCart className="text-xl"/>
                                                </div>
                                                <span
                                                    className="absolute -top-3 -right-3 bg-primary-500 text-white text-xs px-1 py-px rounded-full ">{carts.length}</span>
                                            </div>


                                            <CartPopup
                                                carts={carts}
                                                isOpen={openMenu === "carts"}
                                                onClose={()=>setOpenMenu("")}
                                            />

                                        </div>
                                    </div>

                                    <div className="text-white relative list-none flex items-center gap-x-1 md:gap-x-3">

                                        <li onClick={() => setOpenMenu("auth")}
                                            className="text-sm  list-none ">

                                            <Image className="!w-9 !h-9" src={getAssetPath(auth.avatar)}
                                                   imgClass="aspect-square object-cover rounded-full bg-gray-400/60"
                                                   fallbackLetter={true} username={auth?.username} />


                                        </li>
                                        <AuthMenuPopup isOpen={openMenu === "auth"} auth={auth} onClose={()=>setOpenMenu("")} />
                                    </div>
                                </div>
                            ) : (
                                <li className="text-sm font-medium list-none">
                                    <NavLink className="text-white flex items-center gap-x-1" to="/login">
                                        <FaSignInAlt />
                                    <span>
                                        Login

                                    </span>
                                    </NavLink>
                                </li>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[75px]"></div>

            { !["/admin", "/dashboard", "/login"].some(el=>location.pathname.startsWith(el)) && <MobileNavigation/> }
        </>
    );
};

export default Nav;