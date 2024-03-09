import React, {useEffect, useMemo, useState} from 'react';

import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "rsl-redux";
import {orderCartProductsAction} from "../store/actions/cartAction.js";
import Toast from "../utils/toast.js";
import getAssetPath from "../utils/getAssetPath.js";
import CommonTable from "../components/Table.jsx";
import formatPrice from "../utils/formatPrice.js";

const Checkout = () => {
    const [selectedCartItems, setSelectedCartItems] = useState([])
    const {carts} = useSelector(state => state.cartState)

    const [searParams] = useSearchParams()
    let tab = searParams.get("t")
    const location = useLocation()

    const dispatch = useDispatch()

    const navigate = useNavigate()


    function clearLocalStorage() {
        localStorage.removeItem("selected-products-for-checkout")
        localStorage.removeItem("selected-carts")
    }


    useEffect(() => {
        if (tab === "product") {
            let lp = localStorage.getItem("selected-products-for-checkout")
            if (lp) {
                let p = JSON.parse(lp)
                setSelectedCartItems([p])
            }
        } else {
            const items = localStorage.getItem("selected-carts")
            if (items) {
                const el = JSON.parse(items)
                if (el) {
                    let cartProducts = carts.filter(ct => el.includes(ct._id))
                    setSelectedCartItems(cartProducts)
                }
            }
        }

        return () => clearLocalStorage()

    }, [tab, carts?.length])


    const totalAmount = useMemo(() => {
        return selectedCartItems?.reduce((p, c) => p + c.price * c.quantity, 0) ?? 0
    }, [selectedCartItems?.length])


    function orderNow() {
        if (!selectedCartItems.length) {
            return Toast.openError("Please select some from your cart.")
        }
        dispatch(orderCartProductsAction(selectedCartItems)).unwrap().then(() => {
            Toast.openSuccess("Your order has been placed")
            setSelectedCartItems([])
            clearLocalStorage()
            navigate(location.state || "/")
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
                return formatPrice(p.price * p.quantity)
            }
        },
        {name: "Quantity", field: "quantity"},
        {name: "Added On", field: "createdAt", render: (v) => new Date(v).toDateString()},
    ]

    return (
        <div>
            <div className="py-6">

                <h2 className="text-xl font-semibold">Checkout</h2>

                <CommonTable className="mt-10 table-start-align checkout-items-table"
                             column={columns}
                             data={selectedCartItems}/>

                <div className="py-6    flex justify-end items-center ">
                    <h2 className="font-semibold">Total Amount: {formatPrice(totalAmount)} Tk</h2>
                </div>

                <div className="flex pt-10 justify-between items-center">
                    <a className="text-neutral-800">
                        <button onClick={() => navigate(location.state || "/")} className="primary-btn">Back
                        </button>
                    </a>
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