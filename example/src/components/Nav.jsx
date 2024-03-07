import {Link, NavLink, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "rsl-redux";
import {logOut, setSidebar} from "../store/slices/authSlice.js";
import {BiSearch} from "react-icons/bi";
import React, {useEffect, useState} from "react";
import {CiShoppingCart} from "react-icons/ci";
import Popup from "./Popup.jsx";
import {HiBars4} from "react-icons/hi2";
import getAssetPath from "../utils/getAssetPath.js";
import MobileNavigation from "./MobileNavigation/MobileNavigation.jsx";

const Nav = () => {
    const {auth, openSidebar} = useSelector(state => state?.authState)

    const {carts} = useSelector(state => state?.cartState)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [getParams] = useSearchParams()
    const search = getParams.get("search")
    const location = useLocation()

    const [openMenu, setOpenMenu] = useState("")

    function handleLogout() {
        dispatch(logOut())
    }

    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        setSearchValue(search ?? "")
    }, [search]);


    function handleSearchProduct(e) {
        const val = e.target.value
        // TODO: uncomment
        // if (location.pathname.startsWith("/p/")) {
        //     navigate(location.pathname + `?search=` + val)
        //     return
        // }
        // navigate("/p/?search=" + val)
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

    function imagePath(link) {
        if (!link) return "/images/no-product.png"
        return getAssetPath(link)
    }

    function handleImgLoadError(e) {
        e.target.src = "/images/no-product.png"
    }

    return (
        <>
            <div className="navigation fixed w-full left-0 top-0">

                <div className="mx-auto max-w-5xl">
                    <div className="py-3">
                        <div className="w-full flex justify-between gap-x-2  rounded-3xl py-2 px-4">
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
                                <div className="text-sm text-white font-medium list-none flex items-center gap-x-3">

                                    <div>
                                        <div className="text-white relative list-none flex items-center gap-x-4">

                                            <div onClick={() => setOpenMenu("carts")}
                                                 className="text-white  list-none flex items-center gap-x-1 relative">
                                                <span className="hidden md:inline-block">Your Cart</span>
                                                <div
                                                    className="w-9 h-9 circle-pill rounded-full flex items-center justify-center">
                                                    <CiShoppingCart className="text-xl"/>
                                                </div>
                                                <span
                                                    className="absolute -top-3 -right-3 bg-primary-500 text-white text-xs px-1 py-px rounded-full ">{carts.length}</span>
                                            </div>

                                            <Popup onClose={() => setOpenMenu("")} isOpen={openMenu === "carts"}
                                                   className="top-12 w-[340px] right-0">
                                                <div className={`select-none cursor-auto `}>

                                                    <div className="flex justify-between items-center mb-2">
                                                        <h4 className="text-slate-900 font-bold text-sm  uppercase">Your
                                                            Carts</h4>
                                                        <button className="btn btn-outline">
                                                            <Link to="/carts"
                                                                  className="text-slate-900  list-none flex items-center gap-x-2">
                                                                Show Detail
                                                            </Link>
                                                        </button>
                                                    </div>

                                                    <div className=" max-h-[300px] overflow-y-auto">
                                                        {!carts || Array.isArray(carts) && carts.length === 0 && (
                                                            <h4 className="text-white text-sm font-medium text-center mt-14">No
                                                                items in carts</h4>
                                                        )}

                                                        <table>
                                                            <tbody>
                                                            {carts?.map(cart => (
                                                                <tr key={cart.id}
                                                                    className="text-slate-900 py-2 border-b border-b-primaryBorder last:border-none">

                                                                    <td className="w-10">
                                                                        <img onError={handleImgLoadError}
                                                                             className="object-contain max-w-[50px] max-h-[50px] mx-auto"
                                                                             src={imagePath(cart?.coverImage)}
                                                                             alt=""/>
                                                                    </td>

                                                                    <td className=" ">
                                                                        <p className="wishlist-content  truncate pl-2">
                                                                            {cart?.title ?? (
                                                                                <span className=" text-red-500">Product deleted</span>
                                                                            )}
                                                                        </p>
                                                                    </td>

                                                                    <td className="w-1/5">
                                                                        <span
                                                                            className="inline-block ml-2">{cart?.price ?? "0.00"}</span>
                                                                    </td>

                                                                    <td className="w-4">
                                                                        <span
                                                                            className="  inline-block">{cart.quantity}</span>
                                                                    </td>

                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </table>
                                                    </div>


                                                </div>


                                            </Popup>

                                        </div>
                                    </div>

                                    <div className="text-white relative list-none flex items-center gap-x-4">

                                        <li onClick={() => setOpenMenu("auth")}
                                            className="text-sm  list-none ">


                                            <div
                                                className="w-9 h-9 circle-pill rounded-full flex items-center justify-center">
                                                {auth.avatar ? (<img src={getAssetPath(auth.avatar)} alt=""/>) : <span
                                                    className="uppercase font-semibold">{auth?.username.slice(0, 1)}</span>}
                                            </div>


                                        </li>
                                        <Popup onClose={() => setOpenMenu("")} isOpen={openMenu === "auth"}
                                               className="top-12 w-[200px] right-0">
                                            <div className={`select-none cursor-auto text-slate-900 `}>
                                                <div className="">
                                                    <li className="list-item">{auth.username}</li>

                                                    <Link to="/dashboard">
                                                        <li className="list-item">Dashboard</li>
                                                    </Link>

                                                    {auth.role === "admin" && (
                                                        <Link to="/admin">
                                                            <li className="list-item">Admin Dashboard</li>
                                                        </Link>
                                                    )}
                                                    <li className="list-item " onClick={handleLogout}>logout</li>
                                                </div>
                                            </div>
                                        </Popup>
                                    </div>
                                </div>
                            ) : (
                                <li className="text-sm font-medium list-none">
                                    <NavLink className="text-white" to="/login">Login</NavLink>
                                </li>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[75px]"></div>

            <MobileNavigation/>
        </>
    );
};

export default Nav;