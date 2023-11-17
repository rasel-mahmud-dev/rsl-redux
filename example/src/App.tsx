import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReduxSlice from "./pages/ReduxSlice";
import Nav from "./component/Nav";
import Login from "./pages/Login.tsx";
import ReduxRTK from "./pages/ReduxRTK.tsx";
import AboutPage from "./pages/AboutPage.tsx";


function App(){
    return (
        <div>
            <BrowserRouter>

               <Nav />

                <div className="p-4">
                    <Routes>
                        <Route path="/" element={<ReduxSlice />} />
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