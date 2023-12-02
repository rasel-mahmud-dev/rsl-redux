import {NavLink} from "react-router-dom";
import {useSelector} from "rsl-redux";
import {logOut} from "../store/slices/authSlice.ts";
import {useDispatch} from "rsl-redux";

const Nav = () => {
    const {auth} = useSelector(state => state?.authState)

    const {carts} = useSelector(state => state?.cartState)
    console.log(carts)

    const dispatch = useDispatch()
    function handleLogout() {
        dispatch(logOut())
    }

    return (
        <div className="bg-[#be5d9c] ">
        <div className="mx-auto max-w-5xl">
            <div className="py-3">
                <div className="w-full flex justify-between gap-x-6  rounded-3xl py-2 px-10">

                    <div className="flex items-center gap-x-6">
                        <li className="text-sm font-medium list-none">
                            <NavLink className="text-white" to="/">Slice</NavLink>
                        </li>
                        <li className="text-sm font-medium list-none">
                            <NavLink className="text-white" to="/rtk">RTK</NavLink>
                        </li>
                        <li className="text-sm font-medium list-none">
                            <NavLink className="text-white" to="/about">About</NavLink>
                        </li>
                    </div>

                    {auth ? (
                        <div>
                            <li onClick={handleLogout} className="text-sm font-medium list-none">{auth.email}</li>
                        </div>
                    ): (
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