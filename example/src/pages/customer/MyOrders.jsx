import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import {Link, useNavigate} from "react-router-dom";
import CommonTable from "../../components/Table.jsx";
import {fetchOrdersAction} from "../../store/actions/productAction.js";


const MyOrders = () => {
    const {orders} = useSelector(state => state.productState)

    const dispatch = useDispatch()

    const navigate = useNavigate();

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
            name: "Order ID",
            field: "_id",
            tdClass: "w-14",
            thClass: "w-14 whitespace-nowrap",

            render: (id) => {
                return (
                    <div>
                        #{id}
                    </div>
                )
            }
        },
        {
            name: "Image", field: "image", render: (_, item) => {
                return (
                    <div className="w-20">
                        <img onError={handleImgLoadError}
                             className="object-contain aspect-square mx-auto"
                             src={imagePath(item?.cover_image)}
                             alt=""/>
                    </div>

                )
            }
        },

        {
            name: "title", field: "title", render: (_, item) => {
                return (
                    <div>{item.title || "Product deleted"}</div>
                )
            }
        },
        {
            name: "Price", field: "price", render: (_, p) => {
                return Number(p.price * p.quantity).toFixed(2)
            }
        },
        {name: "Quantity", field: "quantity"},
        {name: "Added On", field: "created_at", render: (v) => new Date(v).toDateString()},
    ]

    function goCheckout() {
        localStorage.setItem("selected-carts", JSON.stringify(selectedCartItems))
        navigate("/checkout")
    }


    return (
        <div className="py-6">

            <h2 className="text-xl font-semibold">My Carts</h2>
            <CommonTable className="mt-6" column={columns} data={orders ? orders : []}/>


            <div className="flex justify-between items-center">
                <Link to="/" className="text-neutral-800">
                    <button className="primary-btn">Back to shop</button>
                </Link>


                <button onClick={goCheckout} disabled={!selectedCartItems.length}
                        className="btn primary-btn bg-pi">Checkout
                </button>

            </div>

        </div>
    );
};

export default MyOrders;



