import React, {useEffect} from 'react';
import { useSearchParams} from "react-router-dom";
import {useDispatch} from "rsl-redux";
import {searchProductAction} from "../store/actions/productAction.js";


const SearchProduct = () => {
    const [getQuery] = useSearchParams()

    const text = getQuery.get("text")

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(searchProductAction(text)).unwrap().then((r)=>{
            console.log(r)
        }).catch(e=>{
            console.log(e)
        })
    }, [text]);

    return (
        <div>

        </div>
    );
};

export default SearchProduct;