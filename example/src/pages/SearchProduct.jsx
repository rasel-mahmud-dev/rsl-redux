import React, {useEffect, useState} from 'react';
import { useSearchParams} from "react-router-dom";
import {useDispatch} from "rsl-redux";
import {searchProductAction} from "../store/actions/productAction.js";
import Product from "../component/Product.jsx";


const SearchProduct = () => {
    const [getQuery] = useSearchParams()

    const [searchProuduct, setSearchProduct] = useState([])

    const text = getQuery.get("text")

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(searchProductAction(text)).unwrap().then((r)=>{
            setSearchProduct(r)
        }).catch(e=>{
            console.log(e)
        })
    }, [text]);

    return (
        <div>
            <div className="grid grid-cols-5 gap-6 mt-4">
                {searchProuduct.map(product => (
                    <Product key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
};

export default SearchProduct;