import {useEffect} from "react";
import {RouterProvider} from "react-router-dom";
import {authVerifyAction} from "./store/actions/authAction.js";
import {useDispatch, useSelector} from "rsl-redux";
import {fetchBrands, fetchCategories} from "./store/actions/categoryAction.js";
import {fetchCarts} from "./store/actions/cartAction.js";
import routes from "./routes.jsx";
import {fetchWishlists} from "./store/actions/wishlistAction.js";
import changeThemeColor from "./utils/changeThemeColor.js";

function App() {
    const {auth} = useSelector(state => state.authState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authVerifyAction())
        dispatch(fetchCategories())
        dispatch(fetchBrands())
        const theme = localStorage.getItem("theme") || ""
        theme && changeThemeColor({color: theme})
    }, [])


    useEffect(() => {
        if (auth?._id) {
            dispatch(fetchCarts())
            dispatch(fetchWishlists())
        }
    }, [auth, auth?._id, dispatch]);

    return (
        <div>
            <RouterProvider router={routes}/>
        </div>
    )
}

export default App