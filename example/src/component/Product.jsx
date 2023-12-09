import React, {FC} from 'react';
import {useDispatch} from "rsl-redux";
import {addToCart} from "../store/slices/cartSlice.js";
import getAssetPath from "../utils/getAssetPath.js";


const Product = (props) => {
    const {title, id, price, cover_image = ""} = props

    const dispatch = useDispatch()

    function handleAddToCart(){
        dispatch(addToCart({
            title,
            price,
            id,
            cover_image
        }))
    }
    return (
        <div className="bg-white rounded-xl overflow-hidden">
            <div className=" pt-3">
                <img className="object-contain max-w-[150px] max-h-[150px] mx-auto  " src={getAssetPath(cover_image)} alt={title} />
            </div>
            <div className="p-3">
                <h4 className="text-md font-medium">{title}</h4>
                <p>Tk:{price}</p>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;