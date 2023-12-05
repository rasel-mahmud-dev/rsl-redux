import {BrowserRouter, Route, Routes} from "react-router-dom";
import Nav from "./component/Nav";
import Login from "./pages/Login.tsx";
import ReduxRTK from "./pages/ReduxRTK.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import Products from "./pages/Products.tsx";

function App(){
    return (
        <div>
            <BrowserRouter>

               <Nav />

                <div className="container">
                    <Routes>
                        <Route path="/" element={<Products />} />
                        <Route path="/login" element={<Login />} />
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