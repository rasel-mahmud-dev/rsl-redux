import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import Product from "../component/Product.jsx";
import {fetchProducts} from "../store/actions/productAction.js";
import HeroBanner from "../component/HeroBanner.jsx";

const Products = () => {
    const {products, categories} = useSelector((state) => state.productState)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    return (
        <div>
            <HeroBanner categories={categories}  />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 lg:gap-6 mt-4">
                {products.map(product => (
                    <Product key={product.id} {...product} />
                ))}
            </div>
        </div>

    );
};


export default Products;