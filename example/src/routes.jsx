import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import MainLayout from "./layout/MainLayout.jsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: MainLayout,
        children: [
            []
        ]

    }
])