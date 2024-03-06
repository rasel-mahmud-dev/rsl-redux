import React, {useState} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import CommonTable from "../components/Table.jsx";
import {decrementQuantity, incrementQuantity} from "../store/slices/cartSlice.js";
import getAssetPath from "../utils/getAssetPath.js";
import {BiTrash} from "react-icons/bi";
import {deleteCartItemAction} from "../store/actions/cartAction.js";
import toast from "../utils/toast.js";
import {Link, useNavigate} from "react-router-dom";


const Wishlist = () => {


    const {auth} = useSelector(state => state.authState)
    const {wishlist} = useSelector(state => state.productState)

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


    const columns = [
        {
            name: "Image", field: "image", render: (_, item) => {
                return (
                    <div className="w-20 mx-auto">
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
        {name: "Added On", field: "created_at", render: (v) => new Date(v).toDateString()},
        {
            name: "Action", field: "quantity", render: (quantity, item) => (
                <div className="flex justify-center items-center gap-x-3">

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

            <h2 className="text-xl font-semibold">My Wishlist</h2>
            <CommonTable className="mt-6" column={columns} data={wishlist ? wishlist : []}/>


            <div className="flex justify-between items-center">
                <Link to="/" className="text-neutral-800">
                    <button className="primary-btn">Back to shop</button>
                </Link>

            </div>

        </div>
    );
};

export default Wishlist;



