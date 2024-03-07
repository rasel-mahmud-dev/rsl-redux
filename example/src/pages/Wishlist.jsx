import React, {useState} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import CommonTable from "../components/Table.jsx";
import {decrementQuantity, incrementQuantity} from "../store/slices/cartSlice.js";
import getAssetPath from "../utils/getAssetPath.js";
import {BiTrash} from "react-icons/bi";
import {deleteCartItemAction} from "../store/actions/cartAction.js";
import toast from "../utils/toast.js";
import {Link, useNavigate} from "react-router-dom";
import {getDateTime} from "../utils/date.js";


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
            name: "Image", tdClass: "w-32", thClass: "w-32 !px-5", field: "image", render: (_, {product}) => {
                return (
                    <div className="w-14">
                        <img onError={handleImgLoadError}
                             className="object-contain aspect-square mx-auto"
                             src={imagePath(product?.coverImage)}
                             alt=""/>
                    </div>

                )
            }
        },

        {
            name: "title", field: "title", render: (_, {product}) => {
                return (
                    <div>{product?.title || "Product deleted"}</div>
                )
            }
        },
        {
            name: "Price", field: "price", render: (_, {product}) => {
                return Number(product.price).toFixed(2)
            }
        },
        {name: "Added On", field: "createdAt", render: (v) => getDateTime(new Date(v))},
        {
            name: "Action", thClass: "!text-center flex justify-start md:justify-center ", field: "quantity", render: (quantity, item) => (
                <div className="flex justify-start md:justify-center  items-center gap-x-3">

                    <button className="btn btn-outline outline-sm  !py-2 cursor-pointer " onClick={() => handleDeleteCartItem(item._id)}>
                        <BiTrash/>
                    </button>
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
            <CommonTable className="mt-6 table-start-align" column={columns} data={wishlist ? wishlist : []}/>


            <div className="flex justify-between items-center">
                <Link to="/" className="text-neutral-800">
                    <button className="primary-btn">Back to shop</button>
                </Link>

            </div>

        </div>
    );
};

export default Wishlist;



