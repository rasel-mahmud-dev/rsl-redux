
import {NavLink} from "react-router-dom";
import useSelector from "rsl-redux/src/useSelector";

const Nav = () => {
    const {auth} = useSelector(state => state?.authState)
    return (
        <div className="mx-auto max-w-5xl">
            <div className="py-8">
                <div className="w-full flex justify-between gap-x-6 bg-[#be5d9c] rounded-3xl py-2 px-10">

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

                    {auth && (
                        <div>
                            <li className="text-sm font-medium list-none">{auth.email}</li>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Nav;