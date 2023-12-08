import {useEffect} from "react";
import {RouterProvider} from "react-router-dom";
import {authVerifyAction} from "./store/actions/authAction.js";
import {useDispatch, useSelector} from "rsl-redux";
import {fetchBrands, fetchCategories} from "./store/actions/categoryAction.js";
import {fetchCarts} from "./store/actions/cartAction.js";
import routes from "./routes.jsx";

function App() {
    const {auth} = useSelector(state => state.authState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authVerifyAction())
        dispatch(fetchCategories())
        dispatch(fetchBrands())
    }, [])


    useEffect(() => {
        if (auth?._id) {
            dispatch(fetchCarts())
        }
    }, [auth, auth?._id, dispatch]);

    return (
        <div>
            <RouterProvider router={routes}/>
        </div>
    )
}

export default App