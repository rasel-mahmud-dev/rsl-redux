import React, {useEffect, useMemo, useState} from 'react';

import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "rsl-redux";
import {orderCartProductsAction} from "../store/actions/cartAction.js";
import Toast from "../utils/toast.js";
import getAssetPath from "../utils/getAssetPath.js";
import CommonTable from "../components/Table.jsx";

const Checkout = () => {
    const [selectedCartItems, setSelectedCartItems] = useState([])
    const [fetchedLocalStorage, setFetchLocalStorage] = useState(false)
    const {carts} = useSelector(state => state.cartState)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        try {
            const items = localStorage.getItem("selected-carts")
            if (items) {
                const el = JSON.parse(items)
                if (el) {
                    let cartProducts = carts.filter(ct => el.includes(ct._id))
                    setSelectedCartItems(cartProducts)
                }
            }
            setFetchLocalStorage(true)
        } catch (ex) {

        }

    }, [])


    useEffect(() => {
        if (fetchedLocalStorage) {
            if (selectedCartItems.length === 0) {
                navigate('/carts')
            }
        }
    }, [fetchedLocalStorage, selectedCartItems.length])


    const totalAmount = useMemo(() => {
        return selectedCartItems?.reduce((p, c) => p + c.price * c.quantity, 0) ?? 0
    }, [selectedCartItems?.length])


    function orderNow() {
        if (!selectedCartItems.length) {
            return Toast.openError("Please select some from your cart.")
        }
        dispatch(orderCartProductsAction(selectedCartItems)).unwrap().then(() => {
            Toast.openSuccess("Your order has been placed")
            localStorage.removeItem("selected-carts")
            setSelectedCartItems([])
        }).catch(ex => {
            Toast.openError(ex)
        })
    }


    function imagePath(link) {
        if (!link) return "/images/no-product.png"
        return getAssetPath(link)
    }

    function handleImgLoadError(e) {
        e.target.src = "/images/no-product.png"
    }

    const columns = [

        {
            name: "Image", field: "image", render: (_, item) => {
                return (
                    <div className="w-20">
                        <img
                            onError={handleImgLoadError}
                            className="object-contain aspect-square mx-auto"
                            src={imagePath(item?.coverImage)}
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

                <CommonTable className="mt-10 table-start-align checkout-items-table" column={columns}
                             data={selectedCartItems ? selectedCartItems : []}/>

                <div className="py-6    flex justify-end items-center ">
                    <h2 className="font-semibold">Total Amount: {totalAmount} Tk</h2>
                </div>

                <div className="flex pt-10 justify-between items-center">
                    <Link to="/carts" className="text-neutral-800">
                        <button className="primary-btn">Back to Cart</button>
                    </Link>
                    <button onClick={orderNow}
                            className="w-[240px] hover:bg-pink-400 primary-btn bg-pink-500/10 font-medium ">Confirm
                        Order
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Checkout;