import React from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import getAssetPath from "../utils/getAssetPath.js";
import subStr from "../utils/subStr.js";
import {addToCartAction, deleteCartItemAction} from "../store/actions/cartAction.js";
import Toast from "../utils/toast.js";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {addToWishlistAction, removeFromWishlistAction} from "../store/actions/wishlistAction.js";
import {addToWishlist, removeFromWishlist} from "../store/slices/productSlice.js";
import {Link} from "react-router-dom";


const Product = (props) => {
    const {title, slug, _id, price, coverImage = "", cartId} = props
    const {auth} = useSelector(state => state.authState)
    const {wishlist} = useSelector(state => state.productState)
    const dispatch = useDispatch()

    function handleAddToCart() {
        if (!auth) {
            return Toast.openError("Need to login for add item in cart.")
        }
        if(cartId){
            dispatch(deleteCartItemAction(cartId)).unwrap().then(() => {
                Toast.openSuccess("Successfully removed from the cart")
            })
        } else {
            dispatch(addToCartAction({
                title,
                price,
                productId: _id,
                coverImage,
                quantity: 1
            })).unwrap().then(() => {
                Toast.openSuccess("Successfully added on the cart")
            })
        }
    }

    const wishListIndex = wishlist?.findIndex(w => w.productId === _id)
    const isInWishlist = wishListIndex !== -1

    function handleTooggleWishlist(id) {
        if (!auth) {
            return Toast.openError("Need to login for add item in wishlist.")
        }

        const item = wishlist[wishListIndex]

        if (isInWishlist) {
            dispatch(removeFromWishlist(id))
            dispatch(removeFromWishlistAction(id)).unwrap().then(() => {
                Toast.openSuccess("Product has been successfully removed from wishlist")
            }).catch(ex => {
                // revert to state
                dispatch(addToWishlist(item))
                Toast.openError(ex)
            })
        } else {
            dispatch(addToWishlist({
                productId: id,
                customerId: auth._id,
                createdAt: new Date()
            }))
            dispatch(addToWishlistAction(id)).unwrap().then(() => {
                Toast.openSuccess("Product has been successfully added in wishlist")
            }).catch(ex => {
                dispatch(removeFromWishlist(id))
                Toast.openError(ex)
            })
        }
    }

    function imagePath(link) {
        if (!link) return "/images/no-product.png"
        return getAssetPath(link)
    }

    function handleImgLoadError(e) {
        e.target.src = "/images/no-product.png"
    }

    return (
        <div className="bg-white rounded-xl overflow-hidden">
            <div className="product-image relative">
                <Link to={`/${slug}`}><img onError={handleImgLoadError}
                                           className="object-contain max-w-[150px] max-h-[150px] mx-auto"
                                           src={imagePath(coverImage)} alt={title}/>
                </Link>
                {isInWishlist ?
                    <AiFillHeart onClick={() => handleTooggleWishlist(_id)} className="absolute top-3 right-3"/>
                    : <AiOutlineHeart onClick={() => handleTooggleWishlist(_id)} className="absolute top-3 right-3"/>
                }
            </div>
            <div className="p-3">
                <Link to={`/${slug}`}>
                    <h4 className="text-sm font-medium">{subStr(title, 80)}</h4>
                </Link>
                <p>Tk:{price}</p>
                <button className="mx-auto block primary-btn py-1 mt-4 text-neutral-100"
                        onClick={handleAddToCart}>{cartId ? "Remove from " : "Add to "} Cart
                </button>
            </div>
        </div>
    );
};

export default Product;