import React, {useEffect, useRef, useState} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "rsl-redux";
import Product from "../components/Product.jsx";
import {api} from "../axios/index.js";
import Breadcrumb from "../components/Breadcrumb.jsx";
import {FaAngleRight} from "react-icons/fa";
import Loader from "../components/Loader.jsx";
import {HiBars4} from "react-icons/hi2";
import {setSidebar} from "../store/slices/authSlice.js";
import {fetchAttributeSpec, fetchAttributeSpecMapping, fetchCategoryBrands} from "../store/actions/categoryAction.js";
import Popup from "../components/Popup.jsx";
import {setFilter} from "../store/slices/productSlice.js";


const SearchProduct = () => {
    const [getQuery] = useSearchParams()
    const {categoryName} = useParams()

    const filterObj = useRef({
        attributes: {}, brandIds: [],
        categoryIds: []

    })
    const {openSidebar} = useSelector(state => state.authState)

    const {categories, filter,  categoryBrands, specs} = useSelector(state => state.productState)

    const [expandAttributes, setExpandAttributes] = useState(["brand_id"])

    const [pagination] = useState({
        page: 1,
        totalPage: 10
    })

    const dispatch = useDispatch()

    let selectedCategory = categories.find(cat => cat.slug === categoryName)

    const [searchProuduct, setSearchProduct] = useState([])

    const text = getQuery.get("search")
    const [isSearching, setSearching] = useState(false)


    useEffect(() => {
        if (categoryName) {
            dispatch(fetchCategoryBrands(categoryName))
            dispatch(fetchAttributeSpec(categoryName))
            dispatch(fetchAttributeSpecMapping())
        }
    }, [categoryName]);


    useEffect(() => {
        dispatch(setFilter({
            categoryIds: categoryName ? [categoryName] : [],
            search: text,
        }))
    }, [categoryName, text])

    useEffect(() => {
        filterProduct(filter)
    }, [filter.attributes, filter.brandIds, filter.search])

    function filterProduct(filter) {
        setSearching(true)
        api.post("/products/filter?page=" + pagination.page, {
            search: filter.search ?? "",
            attributes: filter.attributes ?? {},
            categoryIds: filter.categoryIds ?? [],
            brandIds: filter.brandIds ?? []
        }).then(r => {
            setSearchProduct(r.data)
        }).finally(() => {
            setSearching(false)
        })
    }

    function renderOptions(attr, attributeName) {
        return (
            <div>
                {attr?.options?.map(option => (
                    <div key={option.name + option.value}
                         className="flex items-center gap-x-2 py-1 hover-list-primary rounded px-2">
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
        let updatedAttributes = {...filter.attributes}
        updatedAttributes[attributeName] = toggleAttributeValue(updatedAttributes[attributeName], value)

        dispatch(setFilter({
            attributes: updatedAttributes
        }))
    }

    function handleChangeBrand(name, value) {
        let updatedBrandIds = [...filter.brandIds]
        let index = updatedBrandIds.indexOf(value)
        if (index === -1) {
            updatedBrandIds.push(value)
        } else {
            updatedBrandIds.splice(index, 1)
        }

        dispatch(setFilter({
            brandIds: updatedBrandIds
        }))
    }

    function handleToggleLeft() {
        dispatch(setSidebar(openSidebar === "filter" ? "" : "filter"))
    }

    function getCategoryBrands(categoryName) {
        return categoryBrands[categoryName] ?? []
    }

    const attributeMap = specs?.[categoryName] ?? {}

    return (
        <div>
            <div className="bread-fixed">
                <div className="container">
                    <Breadcrumb selectedCategory={selectedCategory}/>
                </div>
            </div>

            {isSearching && <Loader/>}

            <div className="gap-6 mt-4">

                {openSidebar === "filter" && <div onClick={handleToggleLeft} className=" product-attr-sidebar-backdrop"></div> }
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

                            {expandAttributes.includes("brand_id") && <Brands
                                selectedBrands={filter.brandIds}
                                onChange={handleChangeBrand}
                                items={getCategoryBrands(categoryName)}/>
                            }
                        </div>

                        <div className="mt-5">
                            <h4 className="text-base font-semibold px-2 ">Attribute Filter</h4>

                            {Object.keys(attributeMap).map(attributeKey => (
                                <div key={attributeKey} className="">
                                    <div className="flex justify-between items-center py-2 px-2 cursor-pointer"
                                         onClick={() => handleToggleExpand(attributeKey)}>
                                        <span>{attributeMap?.[attributeKey]?.label}</span>
                                        <span><FaAngleRight className="text-xs"/></span>
                                    </div>
                                    {expandAttributes.includes(attributeKey) && renderOptions(attributeMap[attributeKey], attributeKey)}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {searchProuduct.length && <div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-6 mt-4 pb-10 product-content">
                    {searchProuduct.map(product => (
                        <Product key={product._id} {...product} />
                    ))}
                </div>}


                {!searchProuduct.length && (
                    <div className="product-content text-center">
                        <h2>No products match...</h2>
                    </div>
                )}

            </div>
        </div>
    );
};
export default SearchProduct;

function Brands({items, onChange, name, selectedBrands = []}) {

    const [isShowMore, setShowMore] = useState(false)

    return (
        <div>
            {
                items.slice(0, 16).map(brand => (
                    <div className="flex items-center gap-x-2 py-1 hover-list-primary rounded px-2" key={brand._id}>
                        <input
                            onChange={() => onChange(name, brand.slug)}
                            checked={selectedBrands.includes(brand.slug)}
                            type="checkbox"
                            id={brand.slug}
                        />
                        <label className="text-sm text-neutral-600"
                               htmlFor={brand.slug}>{brand.name}</label>
                    </div>
                ))
            }

            <div className="flex items-center gap-x-2 py-1 hover-list-primary rounded px-2">
                <label className="text-sm text-neutral-600" onClick={() => setShowMore(true)}>Show All</label>
            </div>

            {isShowMore && <Popup className="!fixed top-36 max-w-3xl w-full h-60  z-[10034540] bg-white   overflow-x-auto"
                                  onClose={() => setShowMore(false)}
                                  isOpen={isShowMore}>
                <div>
                    <div className="grid grid-cols-6 gap-x-5">
                        {
                            items.map(brand => (
                                <div className=" flex  items-center gap-x-2 py-1 hover-list-primary rounded px-2"
                                     key={brand._id}>
                                    <input            onChange={() => onChange(name, brand.slug)}
                                                      checked={selectedBrands.includes(brand.slug)}


                                                      type="checkbox" id={brand.slug}/>
                                    <label className="text-sm text-neutral-600"
                                           htmlFor={brand.slug}>{brand.name}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Popup>}


        </div>
    )
}