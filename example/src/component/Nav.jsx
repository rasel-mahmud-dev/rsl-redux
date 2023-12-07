import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "rsl-redux";
import {logOut} from "../store/slices/authSlice.js";
import {useDispatch} from "rsl-redux";
import {BiSearch} from "react-icons/bi";

const Nav = () => {
    const {auth} = useSelector(state => state?.authState)

    const {carts} = useSelector(state => state?.cartState)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    function handleLogout() {
        dispatch(logOut())
    }


    function handleSearchProduct(e) {
        const val = e.target.value
        if (location.pathname.startsWith("/p/")) {
            navigate(location.pathname + `?search=` + val)
            return
        }
        navigate("/p/?search=" + val)
    }


    return (
        <div className="bg-[#be5d9c] ">
            <div className="mx-auto max-w-5xl">
                <div className="py-3">
                    <div className="w-full flex justify-between gap-x-6  rounded-3xl py-2 px-10">

                        <div className="flex items-center gap-x-6">
                            <li className="text-sm font-medium list-none">
                                <NavLink className="text-white" to="/">Home</NavLink>
                            </li>
                            <li className="text-sm font-medium list-none">


                                <div className="flex items-center border border-gray-300 bg-red-50 rounded-2xl">
                                    <input onChange={handleSearchProduct} type="text" placeholder="Search products..."
                                           className="w-full  px-4 bg-transparent rounded-lg focus:outline-none"/>
                                    <button className="focus:outline-none px-4 rounded-2xl  mr-px">
                                        <BiSearch/>
                                    </button>
                                </div>


                            </li>

                        </div>

                        {auth ? (
                            <div>
                                <li onClick={handleLogout} className="text-sm font-medium list-none">{auth.email}</li>
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
    );
};

export default Nav;