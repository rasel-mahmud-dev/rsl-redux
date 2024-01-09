import React, {useEffect, useState} from 'react';

import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "rsl-redux";
import {orderCartProductsAction} from "../store/actions/cartAction.js";
import Toast from "../utils/toast.js";
import getAssetPath from "../utils/getAssetPath.js";
import {BiTrash} from "react-icons/bi";
import CommonTable from "../component/Table.jsx";

const Checkout = () => {
    const [selectedCartItems, setSelectedCartItems] = useState([])
    const [fetchedLocalStorage, setFetchLocalStorage] = useState(false)
    const {carts} = useSelector(state => state.cartState)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        const items = localStorage.getItem("selected-carts")
        if (items) {
            const el = JSON.parse(items)
            if (el) {
                let cartProducts = carts.filter(ct => el.includes(ct._id))
                setSelectedCartItems(cartProducts)
            }
        }
        setFetchLocalStorage(true)

    }, [])


    useEffect(() => {
       if(fetchedLocalStorage){
           if(selectedCartItems.length === 0){
               navigate('/carts')
           }
       }

    }, [fetchedLocalStorage, selectedCartItems.length])


    function orderNow() {
        if(!selectedCartItems.length){
            return Toast.openError("Please select some from your cart.")
        }
        dispatch(orderCartProductsAction(selectedCartItems)).unwrap().then(() => {
            Toast.openSuccess("Your order has been place")
            localStorage.removeItem("selected-carts")
            setSelectedCartItems([])
        }).catch(ex => {
            Toast.openError(ex)
        })
    }


    const columns = [

        {
            name: "Image", field: "image", render: (_, item) => {
                return (
                    <div>
                        <img
                             className="object-contain max-w-[80px] max-h-[80px] mx-auto"
                             src={getAssetPath(item?.cover_image)}
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
                return p.price * p.quantity
            }
        },
        {name: "Quantity", field: "quantity"},
        {name: "Added On", field: "created_at", render: (v) => new Date(v).toDateString()},
    ]

    return (
        <div>
            <div className="py-6">

                <h2 className="text-xl font-semibold">Checkout</h2>

                <CommonTable  className="mt-10 checkout-items-table" column={columns} data={selectedCartItems ? selectedCartItems : []}/>

                <div className="pb-20 flex justify-end ">
                    <button onClick={orderNow} className="w-[240px] hover:bg-pink-400 primary-btn bg-pink-500/10 font-medium ">Order</button>
                </div>

                <div className="flex justify-between items-center">
                    <Link to="/carts" className="text-neutral-800">
                        <button className="primary-btn">Back to Cart</button>
                    </Link>
                    <button className="primary-btn bg-pi">Checkout</button>
                </div>

            </div>

        </div>
    );
};

export default Checkout;