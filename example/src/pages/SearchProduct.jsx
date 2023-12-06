import React, {useEffect, useState} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "rsl-redux";
import {searchProductAction} from "../store/actions/productAction.js";
import Product from "../component/Product.jsx";
import {api} from "../axios/index.js";
import Breadcrumb from "../component/Breadcrumb.jsx";


const SearchProduct = () => {
    const [getQuery] = useSearchParams()
    const {categoryName} = useParams()
    const {categories} = useSelector(state=>state.productState)

    let selectedCategory = categories.find(cat=>cat.slug === categoryName)

    const [searchProuduct, setSearchProduct] = useState([])

    const text = getQuery.get("text")

    const dispatch = useDispatch()

    useEffect(() => {
        let filter = {}
        if(selectedCategory){
            filter["categoryIds"] = [selectedCategory._id]
        }
        if(text){
            filter["text"] = text
        }
        filterProduct(filter)
    }, [text, selectedCategory]);


    function filterProduct(filter) {
        api.post("/products/filter", {
           ...filter
        }).then(r => {
            setSearchProduct(r.data)

        })
    }


    return (
        <div>

            <div>
                <Breadcrumb selectedCategory={selectedCategory}/>

            </div>

            <div className="grid grid-cols-5 gap-6 mt-4">
                {searchProuduct.map(product => (
                    <Product key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
};

export default SearchProduct;