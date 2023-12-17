import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import Product from "../component/Product.jsx";
import {fetchProducts} from "../store/actions/productAction.js";
import HeroBanner from "../component/HeroBanner.jsx";
import getAssetPath from "../utils/getAssetPath.js";
import {useNavigate} from "react-router-dom";

const Products = () => {
    const {products, categories} = useSelector((state) => state.productState)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const navigate = useNavigate()


    return (
        <div>
            <div className="home-category-list">
                <div
                    className="flex items-center justify-between max-w-8xl mx-auto  gap-x-2 md:gap-x-4 scroll-x-transparent overflow-x-auto md:overflow-visible ">
                    {categories.map((cat) => (
                        <div key={cat._id} className="home-category-list-item">
                            <div onClick={()=>navigate(`/p/${cat._id}`)}
                                className="flex home-category-list-item-content flex-col items-center  border md:border-none rounded-full md:bg-transparent ">
                                <img alt={cat.name} className="category-list-item-img" src={getAssetPath(cat.image)}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <HeroBanner categories={categories} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 lg:gap-6 mt-4">
                {products.map(product => (
                    <Product key={product.id} {...product} />
                ))}
            </div>
        </div>

    );
};


export default Products;