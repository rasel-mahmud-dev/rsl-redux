import React from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import CommonTable from "../component/Table.jsx";
import { decrementQuantity, incrementQuantity} from "../store/slices/cartSlice.js";
import getAssetPath from "../utils/getAssetPath.js";

const Carts = () => {
    const {carts} = useSelector(state => state.cartState)

    const dispatch = useDispatch()

    function handleIncrement(cart) {
        dispatch(incrementQuantity(cart))
    }

    function handleDecrement(cart) {
        dispatch(decrementQuantity(cart))
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
                    <div>
                        <img onError={handleImgLoadError}
                             className="object-contain max-w-[50px] max-h-[150px] mx-auto"
                             src={imagePath(item?.product?.cover_image)}
                             alt=""/>
                    </div>

                )
            }
        },

        {
            name: "title", field: "title", render: (_, item) => {
                return (
                    <div>{item.product?.title || "Product deleted"}</div>
                )
            }
        },
        {
            name: "Price", field: "price", render: (_, p) => {
                return p.product?.price * p.quantity
            }
        },
        {name: "Quantity", field: "quantity"},
        {name: "Added On", field: "created_at", render: (v) => new Date(v).toDateString()},
        {
            name: "Action", field: "quantity", render: (quantity, item) => (
                <div className="flex justify-center items-center gap-x-3">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <h4>{quantity}</h4>
                    <button onClick={() => handleIncrement(item)}>+</button>
                </div>
            )
        },
    ]

    console.log(carts)
    return (
        <div className="py-6">

            <h2 className="text-xl font-semibold">My Carts</h2>
            <CommonTable className="mt-6" column={columns} data={carts ? carts : []}/>
        </div>
    );
};

export default Carts;



