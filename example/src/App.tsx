import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReduxSlice from "./pages/ReduxSlice";
// import ReduxRTK from "./pages/Redu   /ReduxSlicexRTK";
import Nav from "./component/Nav";


function App(){
    return (
        <div>
            <BrowserRouter>

               <Nav />

                <div className="p-4">
                    <Routes>
                        <Route path="/" element={<ReduxSlice />} />
                        {/*<Route path="/rtk" element={<ReduxRTK /> } />*/}
                        {/*<Route path="/about" element={<AboutPage /> } />*/}
                        {/*<Route path="/p" element={<ProductList /> } />*/}
                        {/*<Route path="/p/:slug" element={<ProductDetail /> } />*/}
                    </Routes>
                </div>

            </BrowserRouter>
        </div>
    )
}

export default App