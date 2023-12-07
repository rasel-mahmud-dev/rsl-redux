import React, {useEffect, useState} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "rsl-redux";
import Product from "../component/Product.jsx";
import {api} from "../axios/index.js";
import Breadcrumb from "../component/Breadcrumb.jsx";
import {setFilter} from "../store/slices/productSlice.js";
import {FaAngleRight} from "react-icons/fa";

const categoryMap = {
    "6570c5ae26c947e3c99321f7": {
        attributes: {
            battery: {
                label: "Battery",
                options: [
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                ]
            },
            Storage: {
                label: "Battery",
                options: [
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                ]
            },
            formFactor: {
                label: "Form Factor",
                options: [
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                ]
            },
            formFactor2: {
                label: "Form Factor",
                options: [
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                ]
            },
            formFactor3: {
                label: "Form Factor",
                options: [
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                ]
            },
            formFactor4: {
                label: "Form Factor",
                options: [
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh", value: 1200},
                    {name: "1200amh 2", value: 1200},
                ]
            }
        }
    }
}


const SearchProduct = () => {
    const [getQuery] = useSearchParams()
    const {categoryName} = useParams()
    const {categories, filter} = useSelector(state => state.productState)

    let selectedCategory = categories.find(cat => cat.slug === categoryName)

    const [searchProuduct, setSearchProduct] = useState([])

    const text = getQuery.get("search")

    const dispatch = useDispatch()

    useEffect(() => {
        let filter = {}
        if (selectedCategory) {
            filter["categoryIds"] = [selectedCategory._id]
        }
        filter["search"] = text
        dispatch(setFilter(filter))
    }, [selectedCategory]);

    useEffect(() => {
        filterProduct(filter)
    }, [filter.search, filter.categoryIds]);


    function filterProduct(filter) {
        api.post("/products/filter", {
            ...filter
        }).then(r => {
            setSearchProduct(r.data)

        })
    }

    let cats = categoryMap?.[selectedCategory?._id]


    let attributes = cats?.attributes ?? []

    function renderOptions(attr){
        return (
            <div>
                {attr.options.map(option=>(
                    <div className="flex items-center gap-x-2 px-2">
                        <input type="checkbox" />
                       <span> {option.name}</span>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div>

            <div>
                <Breadcrumb selectedCategory={selectedCategory}/>
            </div>

            <div className="grid grid-cols-12 gap-6 mt-4">
                <div className="col-span-3 bg-white p-2 sidebar">
                    {Object.keys(attributes).map((attributeKey)=>(
                        <div key={attributeKey}>
                           <div className="flex justify-between items-center py-2 px-2">
                               <span>{attributes[attributeKey].label}</span>
                               <span><FaAngleRight className="text-xs" /></span>
                           </div>
                            {renderOptions(attributes[attributeKey])}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-5 gap-6 mt-4 col-span-9">
                    {searchProuduct.map(product => (
                        <Product key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchProduct;