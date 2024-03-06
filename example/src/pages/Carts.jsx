import React, {useState} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import CommonTable from "../components/Table.jsx";
import {decrementQuantity, incrementQuantity} from "../store/slices/cartSlice.js";
import getAssetPath from "../utils/getAssetPath.js";
import {BiTrash} from "react-icons/bi";
import {deleteCartItemAction} from "../store/actions/cartAction.js";
import toast from "../utils/toast.js";
import {Link, useNavigate} from "react-router-dom";


const Carts = () => {
    const {carts} = useSelector(state => state.cartState)

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const [selectedCartItems, setSelectedCartItems] = useState([])

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

    function handleDeleteCartItem(_id) {
        dispatch(deleteCartItemAction(_id)).unwrap().catch(msg => {
            toast.openError(msg)
        })
    }

    function handleSelectCartItems(itemId) {
        if (itemId === "All" && carts) {
            setSelectedCartItems(prev => prev.length === carts.length
                ? []
                : carts.map(c => c._id)
            )
        } else {
            setSelectedCartItems(prev => prev.includes(itemId) ? prev.filter(i => i !== itemId) : [...prev, itemId])
        }
    }

    const columns = [

        {
            name: "",
            field: "title",
            tdClass: "w-14",
            thClass: "w-14",
            renderTh: () => (
                <div className="flex items-center justify-center gap-x-1">
                    <input type="checkbox"
                           id="all-cart"
                           checked={selectedCartItems.length === carts?.length}
                           onChange={() => handleSelectCartItems("All")}
                    />
                    <label htmlFor="all-cart"></label>
                </div>
            ),
            render: (_, item) => {
                return (
                    <div>
                        <input
                            checked={selectedCartItems.includes(item._id)}
                            onChange={() => handleSelectCartItems(item._id)}
                            type="checkbox"
                        />
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
        {
            name: "Action", field: "quantity", render: (quantity, item) => (
                <div className="flex justify-center items-center gap-x-3">
                    <div className="flex justify-center items-center gap-x-1">
                        <button className="btn btn-outline outline-sm" onClick={() => handleDecrement(item)}>-</button>
                        <h4 className="px-2">{quantity}</h4>
                        <button className="btn btn-outline outline-sm" onClick={() => handleIncrement(item)}>+</button>
                    </div>
                    <div className="cursor-pointer " onClick={() => handleDeleteCartItem(item._id)}>
                        <BiTrash/>
                    </div>
                </div>
            )
        },
    ]

    function goCheckout() {
        localStorage.setItem("selected-carts", JSON.stringify(selectedCartItems))
        navigate("/checkout")
    }


    return (
        <div className="py-6">

            <h2 className="text-xl font-semibold">My Carts</h2>
            <CommonTable className="mt-6" column={columns} data={carts ? carts : []}/>


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

export default Carts;



