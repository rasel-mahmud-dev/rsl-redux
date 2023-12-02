import React, {FC} from 'react';
import {ProductType} from "../store/slices/productSlice.ts";
import {useDispatch} from "rsl-redux";
import {addToCart} from "../store/slices/cartSlice.ts";

interface Props extends ProductType {

}

const Product: FC<Props> = (props) => {
    const {title, id, price, image} = props

    const dispatch = useDispatch()

    function handleAddToCart(){
        dispatch(addToCart({
            title,
            price,
            id,
            image
        }))
    }

    return (
        <div className="bg-white rounded-xl overflow-hidden">
            <img src={image} alt={title} />
            <div className="p-3">
                <h4 className="text-md font-medium">{title}</h4>
                <p>Tk:{price}</p>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;