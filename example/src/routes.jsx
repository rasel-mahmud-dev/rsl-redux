import {lazy} from "react";
import {createBrowserRouter} from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import Products from "./pages/Products.jsx";
import Auth from "./middleware/Auth.jsx";

const Login  = lazy(()=>import("./pages/auth/Login.jsx"));
const SearchProduct  = lazy(()=>import("./pages/SearchProduct.jsx"));
const Carts  = lazy(()=>import("./pages/Carts.jsx"));
const Registration  = lazy(()=>import("./pages/auth/Registration.jsx"));
const ReduxRTK  = lazy(()=>import("./pages/ReduxRTK.jsx"));
const AboutPage  = lazy(()=>import("./pages/AboutPage.jsx"));
const React  = lazy(()=>import("react"));
const DashboardHome  = lazy(()=>import("./pages/admin/DashboardHome.jsx"));
const CustomerDashboardHome  = lazy(()=>import("./pages/customer/DashboardHome.jsx"));
const AdminLayout  = lazy(()=>import("./layout/AdminLayout.jsx"));
const AddProduct  = lazy(()=>import("./pages/admin/Products/AddProduct.jsx"));
const AddCategory  = lazy(()=>import("./pages/admin/Categories/AddCategory.jsx"));
const ProductList  = lazy(()=>import("./pages/admin/Products/ProductList.jsx"));
const BrandList  = lazy(()=>import("./pages/admin/Brands/BrandList.jsx"));
const CategoryList  = lazy(()=>import("./pages/admin/Categories/CategoryList.jsx"));
const AddBrand  = lazy(()=>import("./pages/admin/Brands/AddBrand.jsx"));
const Checkout  = lazy(()=>import("./pages/Checkout.jsx"));
const CustomerDashboardLayout  = lazy(()=>import("./layout/CustomerDashboardLayout.jsx"));
const Wishlist  = lazy(()=>import("./pages/Wishlist.jsx"));
const MyOrders  = lazy(()=>import("./pages/customer/MyOrders.jsx"));
const CustomerList  = lazy(()=>import("./pages/admin/Customers/List.jsx"));
const AddUser  = lazy(()=>import("./pages/admin/Customers/AddUser.jsx"));
const OrdersList  = lazy(()=>import("./pages/admin/Orders/List.jsx"));
const AddressList  = lazy(()=>import("./pages/customer/Address/Address.List.jsx"));
const AddressCreate  = lazy(()=>import("./pages/customer/Address/Address.Create.jsx"));
const MyReviewList  = lazy(()=>import("./pages/customer/MyReviews/List.jsx"));
const CustomerProfile  = lazy(()=>import("./pages/customer/CustomerProfile/View.jsx"));
const ProductDetail  = lazy(()=>import("./pages/ProductDetail/ProductDetail.jsx"));
const MyQuestions  = lazy(()=>import("./pages/customer/MyQuestions/MyQuestions.jsx"));


const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {path: "", element: <Products/>},
            {path: "/:slug", element: <ProductDetail/>},
            {path: "login", element: <Login/>},
            {path: "search", element: <SearchProduct/>},
            {path: "p/:categoryName", element: <SearchProduct/>},
            {path: "p/", element: <SearchProduct/>},
            {path: "carts", element: <Carts/>},
            {path: "checkout", element: <Checkout/>},
            {path: "register", element: <Registration/>},
            {path: "rtk", element: <ReduxRTK/>},
            {path: "about", element: <AboutPage/>},
        ]
    },
    {
        path: "/admin",
        element: <Auth accessRoles={["admin"]}><AdminLayout/></Auth>,
        children: [
            {path: "", element: <DashboardHome/>},
            {path: "add-product", element: <AddProduct/>},
            {path: "edit-product/:productId", element: <AddProduct/>},
            {path: "edit-category/:categoryId", element: <AddCategory/>},
            {path: "add-category", element: <AddCategory/>},
            {path: "products", element: <ProductList/>},
            {path: "brands", element: <BrandList/>},
            {path: "edit-brand/:brandId", element: <AddBrand/>},
            {path: "add-brand", element: <AddBrand/>},
            {path: "categories", element: <CategoryList/>},
            {path: "orders", element: <OrdersList/>},
            {path: "customers", element: <CustomerList/>},
            {path: "add-customer", element: <AddUser/>},
            {path: "edit-customer/:customerId", element: <AddUser/>},

        ]
    },
    {
        path: "/dashboard",
        element: <Auth accessRoles={["customer", "admin"]}><CustomerDashboardLayout/></Auth>,
        children: [
            {path: "", element: <CustomerDashboardHome/>},
            {path: "orders", element: <MyOrders/>},
            {path: "carts", element: <Carts/>},
            {path: "wishlist", element: <Wishlist/>},
            {path: "address-book", element: <AddressList/>},
            {path: "address-book/new", element: <AddressCreate/>},
            {path: "address-book/update/:id", element: <AddressCreate/>},
            {path: "my-reviews", element: <MyReviewList/>},
            {path: "my-profile", element: <CustomerProfile/>},
            {path: "my-questions", element: <MyQuestions/>},

        ]
    }
])

export default routes