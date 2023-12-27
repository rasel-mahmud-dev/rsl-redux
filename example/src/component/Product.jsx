import React, {FC} from 'react';
import {useDispatch} from "rsl-redux";
import {addToCart} from "../store/slices/cartSlice.js";
import getAssetPath from "../utils/getAssetPath.js";
import subStr from "../utils/subStr.js";
import {addToCartAction} from "../store/actions/cartAction.js";


const Product = (props) => {
    const {title, _id, price, cover_image = ""} = props

    const dispatch = useDispatch()

    function handleAddToCart(){
        dispatch(addToCartAction({
            title,
            price,
            product_id: _id,
            cover_image,
            quantity: 1
        })).unwrap().then(r=>{
            console.log(r)
        })
    }


    function imagePath(link){
        if(!link) return "/images/no-product.png"
        return getAssetPath(link)
    }

    function handleImgLoadError(e) {
        e.target.src = "/images/no-product.png"
    }

    return (
        <div className="bg-white rounded-xl overflow-hidden">
            <div className="product-image">
                <img onError={handleImgLoadError} className="object-contain max-w-[150px] max-h-[150px] mx-auto" src={imagePath(cover_image)} alt={title} />
            </div>
            <div className="p-3">
                <h4 className="text-sm font-medium">{subStr(title, 80)}</h4>
                <p>Tk:{price}</p>
                <button className="bg-pink-400 primary-btn py-1 text-neutral-100" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;