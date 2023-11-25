import React, {FC} from 'react';
import {ProductType} from "../store/slices/productSlice.ts";


interface Props extends ProductType {

}


const Product: FC<Props> = (props) => {
    const {title, price, image} = props
    return (
        <div className="bg-white rounded-xl overflow-hidden">
            <img src={image} alt={title} />
            <div className="p-3">
                <h4 className="text-md font-medium">{title}</h4>
                <p>Tk:{price}</p>

                <button>Buy Now:</button>
            </div>
        </div>
    );
};

export default Product;