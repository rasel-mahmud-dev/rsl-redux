import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import {Link} from "react-router-dom";
import {fetchOrdersAction} from "../../../store/actions/productAction.js";
import getAssetPath from "../../../utils/getAssetPath.js";
import OrderStatusBadge from "../../../components/OrderStatusBadge.jsx";
import CommonTable from "../../../components/Table.jsx";
import sortBy from "../../../utils/sortBy.js";
import {getDateTime} from "../../../utils/date.js";
import Tooltip from "../../../components/Tooltip.jsx";


const OrdersList = () => {
    const dispatch = useDispatch()
    const {orders} = useSelector(state => state.productState)

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
                             src={imagePath(item?.coverImage)}
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
                    <Tooltip tips={item.title || "Product deleted"}>
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
        {name: "Quantity", tdClass: "w-20 !text-center", thClass: "w-20", field: "quantity"},
        {name: "Added On", field: "createdAt", render: (v) =>  <Tooltip tips={getDateTime(v)}>
                {getDateTime(v)}
            </Tooltip> },
        {
            name: "Status", field: "status", render: (v) => (
                <div><OrderStatusBadge status={v}/></div>
            )
        },
    ]


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
        <div className="py-6 px-2 md:px-4">

            <h2 className="text-xl font-semibold">My Orders ({orderItems?.length})</h2>
            <CommonTable className="mt-6 table-start-align" column={columns} data={orderItems}/>


            <div className="flex justify-between items-center pt-6">
                <Link to="/dashboard" className="text-neutral-800">
                    <button className="primary-btn">Back Dashboard</button>
                </Link>

            </div>

        </div>
    );
};

export default OrdersList;



