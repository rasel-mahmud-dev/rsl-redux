import {BrowserRouter, Route, Routes} from "react-router-dom";
import Nav from "./component/Nav.jsx";
import Login from "./pages/auth/Login.jsx";
import ReduxRTK from "./pages/ReduxRTK.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import Products from "./pages/Products.jsx";
import Registration from "./pages/auth/Registration.jsx";
import {useEffect} from "react";
import {authVerifyAction} from "./store/actions/authAction.js";
import {useDispatch} from "rsl-redux";
import SearchProduct from "./pages/SearchProduct.jsx";
import {fetchCategories} from "./store/actions/categoryAction.js";

function App(){

    const dispatch = useDispatch()

    useEffect(()=>{

        dispatch( authVerifyAction())
        dispatch( fetchCategories())

    }, [])
    return (
        <div>
            <BrowserRouter>

               <Nav />

                <div className="container">
                    <Routes>
                        <Route path="/" element={<Products />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/search" element={<SearchProduct />} />
                        <Route path="/p/:categoryName" element={<SearchProduct />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/rtk" element={<ReduxRTK /> } />
                        <Route path="/about" element={<AboutPage /> } />
                        {/*<Route path="/p" element={<ProductList /> } />*/}
                        {/*<Route path="/p/:slug" element={<ProductDetail /> } />*/}
                    </Routes>
                </div>

            </BrowserRouter>
        </div>
    )
}

export default App