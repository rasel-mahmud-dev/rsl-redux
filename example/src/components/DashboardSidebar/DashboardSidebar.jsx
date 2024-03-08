import React from 'react';
import {Link} from "react-router-dom";
import {HiCube} from "react-icons/hi2";


const items = {
    "admin": {
        "DASHBOARD": [
            {
                displayName: "DASHBOARD",
                link: "/admin",
                icon: ()=><HiCube className="text-md" /> ,
            },
        ],
        "PRODUCTS": [
            {
                displayName: "Products",
                link: "/admin/products",
                icon: ()=><HiCube className="text-md" /> ,
            },
            {
                displayName: "New Product",
                link: "/admin/add-product",
                icon: ()=><HiCube className="text-md" /> ,
            },
        ],
        "CATEGORIES": [
            {
                displayName: "Categories",
                link: "/admin/categories",
                icon: ()=><HiCube className="text-md" /> ,
            },
            {
                displayName: "New Category",
                link: "/admin/add-category",
                icon: ()=><HiCube className="text-md" /> ,
            },
        ],
        "BRANDS": [
            {
                displayName: "Brands",
                link: "/admin/brands",
                icon: ()=><HiCube className="text-md" /> ,
            },
            {
                displayName: "New Brand",
                link: "/admin/add-brand",
                icon: ()=><HiCube className="text-md" /> ,
            },
        ],
        "ORDERS": [
            {
                displayName: "Orders",
                link: "/admin/orders",
                icon: ()=><HiCube className="text-md" /> ,
            },

        ],
        "USERS": [
            {
                displayName: "Users",
                link: "/admin/customers",
                icon: ()=><HiCube className="text-md" /> ,
            },
            {
                displayName: "New Account",
                link: "/admin/add-customer",
                icon: ()=><HiCube className="text-md" /> ,
            },
        ]

    },
    "customer": {
        "Manage My Account": [

            // My Payment Options
            // Daraz Wallet
            // Vouchers

            {
                displayName: "My Profile",
                link: "/dashboard/my-profile",
                icon: ()=><HiCube className="text-md" /> ,
            },
            {
                displayName: "Address Book",
                link: "/dashboard/address-book",
                icon: ()=><HiCube className="text-md" /> ,
            },
        ],
        "My Orders": [
            {
                displayName: "Orders",
                link: "/dashboard/orders",
                icon: ()=><HiCube className="text-md" /> ,
            },

        ],
        "My Reviews": [
            {
                displayName: "My Reviews",
                link: "/dashboard/my-reviews",
                icon: ()=><HiCube className="text-md" /> ,
            },
            {
                displayName: "New Category",
                link: "/admin/add-category",
                icon: ()=><HiCube className="text-md" /> ,
            },
        ],


    }
}

const DashboardSidebar = ({scope}) => {
    const menuItems = items[scope]
    const groupKeys = Object.keys(menuItems)

    return (
        <div>
            {groupKeys.map(groupKey => (
                <div className="py-2">
                    <h4 className="font-semibold text-neutral-800">{groupKey}</h4>
                    <div className="mt-2">
                        { menuItems[groupKey]?.map(item => (
                            <li className="list-none py-2 bg-gray-200/0 hover-list-primary cursor-pointer  px-2 rounded-lg">
                                <Link className="text-neutral-600  flex items-center gap-x-1"
                                      to={`${item.link}`}>
                                    <span>{item?.icon && typeof item?.icon === "function" ? item?.icon() : null }</span>
                                    <span className="text-base font-medium">{item.displayName}</span>
                                </Link>
                            </li>
                        )) }

                    </div>
                </div>
            ))}

        </div>
    );
};

export default DashboardSidebar;