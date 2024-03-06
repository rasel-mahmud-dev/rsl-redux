import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import {Link, useNavigate} from "react-router-dom";
import CommonTable from "../../components/Table.jsx";
import {fetchOrdersAction} from "../../store/actions/productAction.js";
import sortBy from "../../utils/sortBy.js";
import Tooltip from "../../components/Tooltip.jsx";
import {getDateTime} from "../../utils/date.js";
import OrderStatusBadge from "../../components/OrderStatusBadge.jsx";


const MyOrders = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {orders} = useSelector(state => state.productState)
    const [selectedCartItems, setSelectedCartItems] = useState([])

    useEffect(() => {
        dispatch(fetchOrdersAction(1))
    }, []);


    function imagePath(link) {
        if (!link) return "/images/no-product.png"
        return getAssetPath(link)
    }

    function handleImgLoadError(e) {
        e.target.src = "/images/no-product.png"
    }


    const columns = [
        {
            name: "Image", tdClass: "w-32", thClass: "w-32 !px-5", field: "image", render: (_, item) => {
                return (
                    <div className="w-14">
                        <img onError={handleImgLoadError}
                             className="object-contain aspect-square mx-auto"
                             src={imagePath(item?.cover_image)}
                             alt=""/>
                    </div>

                )
            }
        },
        {
            name: "Order ID",
            field: "_id",
            tdClass: "",
            // thClass: "w-14 whitespace-nowrap",

            render: (id) => {
                return (
                    <div>
                        <Tooltip tips={id}>
                            #{id}
                        </Tooltip>
                    </div>

                )
            }
        },


        {
            name: "title", field: "title", render: (_, item) => {
                return (
                    <Tooltip  tips={item.title || "Product deleted"}>
                        {item.title || "Product deleted"}
                    </Tooltip>

                )
            }
        },
        {
            tdClass: "w-28", thClass: "w-28",
            name: "Total Price", field: "totalPrice", render: (_, p) => {
                return Number(p.totalPrice).toFixed(2)
            }
        },
        {name: "Quantity", tdClass: "w-20", thClass: "w-20", field: "quantity"},
        {name: "Added On", field: "createdAt", render: (v) => getDateTime(v)},
        {
            name: "Status", field: "status", render: (v) => (
                <div><OrderStatusBadge status={v}/></div>
            )
        },
    ]

    function goCheckout() {
        localStorage.setItem("selected-carts", JSON.stringify(selectedCartItems))
        navigate("/checkout")
    }

    const orderItems = useMemo(() => {
        let items = []
        for (let ordersKey in orders) {
            let orderPage = orders[ordersKey]?.items || []
            items.push(...orderPage)
        }

        sortBy(items, 1, (item) => item.createdAt)
        return items

    }, [Object.keys(orders).length])


    return (
        <div className="py-6">

            <h2 className="text-xl font-semibold">My Orders</h2>
            <CommonTable className="mt-6 table-start-align" column={columns} data={orderItems}/>


            <div className="flex justify-between items-center pt-6">
                <Link to="/dashboard" className="text-neutral-800">
                    <button className="primary-btn">Back Dashboard</button>
                </Link>

            </div>

        </div>
    );
};

export default MyOrders;



