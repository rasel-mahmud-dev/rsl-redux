import React, {useEffect, useRef, useState} from 'react';
import {NavLink, useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "rsl-redux";
import Product from "../components/Product.jsx";
import {api} from "../axios/index.js";
import Breadcrumb from "../components/Breadcrumb.jsx";
import {setFilter} from "../store/slices/productSlice.js";
import {FaAngleRight} from "react-icons/fa";
import Loader from "../components/Loader.jsx";
import {HiBars4} from "react-icons/hi2";
import {setSidebar} from "../store/slices/authSlice.js";
import {specs} from "./spec.js";


export const categoryMap = {
    "laptop": [
        "processor-type",
        "processor-model",
        "generation-series",
        "display-size",
        "display-type",
        "ram-size",
        "ram-type",
        "hdd",
        "ssd",
        "graphics",
        "operating-system",
        "laptop-battery"
    ],
    "watches": ["battery", "screen", "resulation", "ram", "laptop_storage"],
    "mobile": ["battery", "screen", "resulation", "ram", "laptop_storage"],
    "t-shart": ["gender", "fabric", "t_shart_size", "t_shart_pattern", "occasion", "t_shart_color"],
    "jeans": ["gender", "t_shart_size", "occasion", "t_shart_color"],
}


const SearchProduct = () => {
    const [getQuery] = useSearchParams()
    const {categoryName} = useParams()
    const filterObj = useRef({attributes: {}})
    const {openSidebar} = useSelector(state => state.authState)
    const {categories, filter, brands} = useSelector(state => state.productState)

    const [expandAttributes, setExpandAttributes] = useState(["brand_id"])

    const [pagination, setPagination] = useState({
        page: 1,
        totalPage: 10
    })

    let selectedCategory = categories.find(cat => cat.slug === categoryName)

    const [searchProuduct, setSearchProduct] = useState([])

    const text = getQuery.get("search")
    const [isSearching, setSearching] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        let filter = {}
        if (categoryName) {
            if (categories?.length) {
                selectedCategory = categories.find(cat => cat.slug === categoryName)
                if (selectedCategory) {
                    filter["categoryIds"] = [selectedCategory._id]
                }
            }
        }

        filter["search"] = text
        filterObj.current = filter

    }, [text, categoryName, categories]);


    useEffect(() => {
        if (Object.keys(filterObj.current).length > 0) {
            filterProduct(filterObj.current)
        }
    }, [filterObj.current]);


    function filterProduct(filter) {
        setSearching(true)
        api.post("/products/filter?page=" + pagination.page, {
            ...filter
        }).then(r => {
            setSearchProduct(r.data)
        }).finally(() => {
            setSearching(false)
        })
    }

    let cats = categoryMap?.[categoryName]

    function renderOptions(attr, attributeName) {
        return (
            <div>
                {attr?.options?.map(option => (
                    <div key={option.name + option.value} className="flex items-center gap-x-2 py-1 hover-list-primary rounded px-2">
                        <input checked={filterObj.current?.attributes?.[attributeName]?.includes(option.value)}
                               id={option.value} type="checkbox"
                               onChange={() => handleChooseAttributeValue(attributeName, option.value)}/>
                        <label htmlFor={option.value}
                               className="text-sm text-neutral-600 cursor-pointer"> {option.name}</label>
                    </div>
                ))}
            </div>
        )
    }

    function handleToggleExpand(attributeKey) {
        if (expandAttributes.includes(attributeKey)) {
            setExpandAttributes(prev => prev.filter(p => p !== attributeKey))
        } else {
            setExpandAttributes(prev => ([...prev, attributeKey]))
        }
    }

    function toggleAttributeValue(obj, value) {
        if (!obj) return [value]
        if (obj.includes(value)) {
            obj = obj.filter(p => p !== value)
        } else {
            obj.push(value)
        }

        return obj

    }

    function handleChooseAttributeValue(attributeName, value) {
        filterObj.current = {
            ...filterObj.current,
            attributes: {
                ...filterObj.current.attributes,
                [attributeName]: toggleAttributeValue(filterObj.current.attributes?.[attributeName], value)
            }
        }
        filterProduct(filterObj.current)
    }

    function handleToggleLeft() {
        dispatch(setSidebar(openSidebar === "filter" ? "" : "filter"))
    }

    return (
        <div>
            <div className="bread-fixed">
                <div className="container">
                    <Breadcrumb selectedCategory={selectedCategory}/>
                </div>
            </div>

            {isSearching && <Loader/>}

            <div className="gap-6 mt-4">

                <div
                    className={`bg-white p-2 sidebar product-attr-sidebar  ${openSidebar === "filter" ? "filter-sidebar" : ""}`}>
                    <div className="">

                        <div
                            className="text-sm font-medium list-none flex items-center justify-between  px-2 mt-4 mb-4 md:hidden ">
                            {openSidebar === "filter" && <li className="">
                                <HiBars4 className="text-xl text-gray-900" onClick={handleToggleLeft}/>
                            </li>}
                            <h4 className="text-gray-900 text-base font-semibold uppercase">Filter Product</h4>
                        </div>


                        <div>
                            <div className="flex justify-between items-center py-2 px-2 cursor-pointer"
                                 onClick={() => handleToggleExpand("brand_id")}>
                                <span>Brands</span>
                                <span><FaAngleRight className="text-xs"/></span>
                            </div>

                            {expandAttributes.includes("brand_id") && brands.map(brand => (
                                <div className="flex items-center gap-x-2  px-2" key={brand._id}>
                                    <input type="checkbox" id={brand.slug}/>
                                    <label className="text-sm text-neutral-600"
                                           htmlFor={brand.slug}>{brand.name}</label>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4">
                            {cats?.map((attributeKey) => (
                                <div key={attributeKey} className="">
                                    <div className="flex justify-between items-center py-2 px-2 cursor-pointer"
                                         onClick={() => handleToggleExpand(attributeKey)}>
                                        <span>{specs[attributeKey].label}</span>
                                        <span><FaAngleRight className="text-xs"/></span>
                                    </div>
                                    {expandAttributes.includes(attributeKey) && renderOptions(specs[attributeKey], attributeKey)}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                <div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-6 mt-4 product-content">
                    {searchProuduct.map(product => (
                        <Product key={product._id} {...product} />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default SearchProduct;