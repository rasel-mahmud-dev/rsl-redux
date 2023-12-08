import {BrowserRouter} from "react-router-dom";
import Nav from "./component/Nav.jsx";
import {useEffect} from "react";
import {authVerifyAction} from "./store/actions/authAction.js";
import {useDispatch, useSelector} from "rsl-redux";
import {fetchCategories} from "./store/actions/categoryAction.js";
import {fetchCarts} from "./store/actions/cartAction.js";
import MainLayout from "./layout/MainLayout.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";

function App() {
    const {auth} = useSelector(state => state.authState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authVerifyAction())
        dispatch(fetchCategories())
    }, [])


    useEffect(() => {
        console.log(auth)
        if (auth?._id) {
            dispatch(fetchCarts())
        }
    }, [auth, auth?._id, dispatch]);

    return (
        <div>
            <BrowserRouter>
                <Nav/>
                <div className="container">
                    <MainLayout/>
                    <AdminLayout/>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App