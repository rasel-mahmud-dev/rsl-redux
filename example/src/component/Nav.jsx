import {Link, NavLink, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useSelector} from "rsl-redux";
import {logOut} from "../store/slices/authSlice.js";
import {useDispatch} from "rsl-redux";
import {BiSearch} from "react-icons/bi";
import {useEffect, useState} from "react";
import {CiShoppingCart} from "react-icons/ci";
import Popup from "./Popup.jsx";

const Nav = () => {
    const {auth} = useSelector(state => state?.authState)

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
        setSearchValue(search ? search : "")
    }, [search]);


    function handleSearchProduct(e) {
        const val = e.target.value
        if (location.pathname.startsWith("/p/")) {
            navigate(location.pathname + `?search=` + val)
            return
        }
        navigate("/p/?search=" + val)
    }

    return (
        <>
            <div className="bg-[#be5d9c] fixed w-full left-0 top-0 z-[1000]">
                <div className="mx-auto max-w-5xl">
                    <div className="py-3">
                        <div className="w-full flex justify-between gap-x-6  rounded-3xl py-2 px-4">
                            <div className="flex items-center gap-x-6 w-full max-w-sm">
                                <li className="text-sm font-medium list-none">
                                    <NavLink className="text-white" to="/">Home</NavLink>
                                </li>
                                <li className="text-sm font-medium list-none w-full">
                                    <div className="flex items-center border border-gray-300 bg-red-50 rounded-2xl">
                                        <input value={searchValue} onChange={handleSearchProduct} type="text"
                                               placeholder="Search products..."
                                               className="w-full  px-4 bg-transparent rounded-lg focus:outline-none"/>
                                        <button className="focus:outline-none px-4 rounded-2xl  mr-px">
                                            <BiSearch/>
                                        </button>
                                    </div>
                                </li>
                            </div>

                            {auth ? (
                                <div className="text-sm text-white font-medium list-none flex items-center gap-x-6">

                                    <div>
                                        <div className="text-white  list-none flex items-center gap-x-4">

                                            <div onClick={() => setOpenMenu("carts")}
                                                 className="text-white  list-none flex items-center gap-x-1 relative">
                                                <span>Your Cart</span>
                                                <CiShoppingCart className="text-xl"/>
                                                <span
                                                    className="absolute -top-3 -right-3 bg-white/20 text-white text-xs px-1 py-px rounded-full ">{carts.length}</span>
                                            </div>

                                            <Popup onClose={() => setOpenMenu("")} isOpen={openMenu === "carts"}
                                                   className="top-16 w-[240px]">
                                                <div className={`select-none cursor-auto `}>

                                                    <div className="flex justify-between items-center mb-2">
                                                        <h4 className="text-slate-900 font-bold text-sm  uppercase">Your
                                                            Carts</h4>
                                                        <Link to="/carts"
                                                              className="text-slate-900  list-none flex items-center gap-x-2">
                                                            Show Detail
                                                        </Link>
                                                    </div>

                                                    <div className=" max-h-[300px] overflow-y-auto">
                                                        {!carts || Array.isArray(carts) && carts.length === 0 && (
                                                            <h4 className="text-white text-sm font-medium text-center mt-14">No
                                                                items in carts</h4>
                                                        )}

                                                        {carts?.map(cart => (
                                                            <div key={cart.id}
                                                                 className="text-slate-900 py-2 border-b border-b-primaryBorder last:border-none">
                                                                <li className="flex items-center w-full">
                                                               <span className="max-w-md w-full flex items-center ">
                                                                <div className="w-10">
                                                                    <img src={cart?.product?.cover_image} alt=""/>
                                                                </div>
                                                                   <span>
                                                                       {cart?.product?.title}
                                                                   </span>
                                                               </span>
                                                                    <span
                                                                        className="max-w-sm w-full inline-block ml-2">{cart?.product?.price}</span>
                                                                    <span
                                                                        className="max-w-sm w-full inline-block">{cart.quantity}</span>
                                                                </li>
                                                            </div>
                                                        ))}
                                                    </div>


                                                </div>


                                            </Popup>

                                        </div>
                                    </div>

                                    <div className="text-white relative list-none flex items-center gap-x-4">

                                        <li onClick={() => setOpenMenu("auth")}
                                            className="text-sm  list-none">{auth?.email}</li>
                                        <Popup onClose={() => setOpenMenu("")} isOpen={openMenu === "auth"}
                                               className="top-9 w-[200px] right-0">
                                            <div className={`select-none cursor-auto text-slate-900 `}>
                                                <div className="">
                                                    <li>{auth.username}</li>
                                                    <Link to="/admin">
                                                        <li>Admin Dashboard</li>
                                                    </Link>
                                                    <li onClick={handleLogout}>logout</li>
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
        </>
    );
};

export default Nav;