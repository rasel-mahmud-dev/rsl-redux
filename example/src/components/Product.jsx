import React, {FC} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import getAssetPath from "../utils/getAssetPath.js";
import subStr from "../utils/subStr.js";
import {addToCartAction} from "../store/actions/cartAction.js";
import Toast from "../utils/toast.js";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {addToWishlistAction} from "../store/actions/wishlistAction.js";


const Product = (props) => {
    const {title, _id, price, cover_image = ""} = props
    const {auth} = useSelector(state=>state.authState)
    const {wishlist} = useSelector(state=>state.productState)
    const dispatch = useDispatch()

    function handleAddToCart() {
        if(!auth){
            return Toast.openError("Need to login for add item in cart.")
        }
        dispatch(addToCartAction({
            title,
            price,
            product_id: _id,
            cover_image,
            quantity: 1
        })).unwrap().then(() => {
            Toast.openSuccess("Successfully added on the cart")
        })
    }

    function handleTooggleWishlist(id){
        if(!auth){
            return Toast.openError("Need to login for add item in wishlist.")
        }
        dispatch(addToWishlistAction(id)).unwrap().then(()=>{
            Toast.openSuccess("Product has been successfully added in wishlist")
        }).catch(ex=>{
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

    const isInWishlist = wishlist?.findIndex(w=>w.productId === _id) !== -1

    return (
        <div className="bg-white rounded-xl overflow-hidden">
            <div className="product-image relative">
                <img onError={handleImgLoadError} className="object-contain max-w-[150px] max-h-[150px] mx-auto"
                     src={imagePath(cover_image)} alt={title}/>

                {isInWishlist ?
                    <AiFillHeart onClick={()=>handleTooggleWishlist(_id)} className="absolute top-3 right-3" />
                    : <AiOutlineHeart onClick={()=>handleTooggleWishlist(_id)} className="absolute top-3 right-3" />
                }
            </div>
            <div className="p-3">
                <h4 className="text-sm font-medium">{subStr(title, 80)}</h4>
                <p>Tk:{price}</p>
                <button className="mx-auto block primary-btn py-1 mt-4 text-neutral-100"
                        onClick={handleAddToCart}>Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Product;