import React, {useEffect, useRef, useState} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "rsl-redux";
import Product from "../component/Product.jsx";
import {api} from "../axios/index.js";
import Breadcrumb from "../component/Breadcrumb.jsx";
import {setFilter} from "../store/slices/productSlice.js";
import {FaAngleRight} from "react-icons/fa";
import Loader from "../component/Loader.jsx";

export const attributes = {
    battery: {
        label: "Battery",
        options: [
            {name: "1200amh", value: 1200},
            {name: "1200amh", value: 1200},
            {name: "1200amh", value: 1200},
            {"name": "2000Amp", value: 2000},
            {"name": "3000Amp", value: 3000},
            {"name": "4000Amp", value: 4000},
            {"name": "5000Amp", value: 5000},
            {"name": "6000Amp", value: 6000},
            {"name": "7000Amp", value: 7000}
        ]
    },
    formFactor: {
        label: "Form Factor",
        options: [
            {"name": "Mini ITX"},
            {"name": "Micro ITX"},
            {"name": "ITX"}
        ]
    },

    "generation": {
        label: "Generation",
        options: [
            {name: "1st Generation", value: 1},
            {name: "2nd Generation", value: 2},
            {name: "3th Generation", value: 3},
            {name: "4th Generation", value: 4},
            {name: "5th Generation", value: 5},
            {name: "6th Generation", value: 6},
            {name: "7th Generation", value: 7},
            {name: "8th Generation", value: 8},
            {name: "9th Generation", value: 9},
            {name: "10th Generation", value: 10},
            {name: "11th Generation", value: 11},
        ]
    },
    Seriez: {
        "label": "Seriez",
        "options": [
            {"name": "H"},
            {"name": "Z"},
            {"name": "B"},
            {"name": "X"}
        ],

    },
    processorType: {
        label: "Processor Type",
        options: [
            {name: "Intel", value: "intel"},
            {name: "AMD", value: "amd"}
        ]
    },

    ram: {
        "label": "Ram",
        "options": [
            {"name": "1GB", value: 1},
            {"name": "2GB", value: 2},
            {"name": "3GB", value: 3},
            {"name": "4GB", value: 4},
            {"name": "8GB", value: 8},
            {"name": "16GB", value: 16}
        ]
    },
    bus_speed: {
        "label": "BUS Speed",
        "options": [
            {"name": "1000Mhz"},
            {"name": "1333Mhz"},
            {"name": "1600Mhz"},
            {"name": "2666Mhz"}


        ]
    },
    processor: {
        "label": "Processor",
        "options": [
            {"name": "intel dual-core", value: "intel-dual-code"},
            {"name": "intel core-i3", value: "intel-i3"},
            {"name": "intel core-i5", value: "intel-i5"},
            {"name": "intel core-i7", value: "intel-i7"},
            {"name": "intel core-i9", value: "intel-i9"}
        ]
    },

    internal_storage: {
        label: "Internal Storage",
        options: [
            {name: "8GB", value: 8},
            {name: "32GB", value: 32},
            {name: "64GB", value: 64},
            {name: "128GB", value: 128},
            {name: "256GB", value: 256}
        ]
    },
    mobile_storage: {
        label: "Laptop Storage",
        options: [
            {name: "8GB", value: 8},
            {name: "32GB", value: 32},
            {name: "64GB", value: 64},
            {name: "128GB", value: 128},
            {name: "256GB", value: 256}
        ]
    },
    laptop_storage: {
        label: "Storage",
        options: [
            {name: "128GB SSD", value: 128},
            {name: "256GB SSD", value: 256},
            {name: "500GB SSD", value: 500}
        ]
    },
    mobile_screen: {
        label: "Screen size",
        options: [
            {name: "5inch", value: 5},
            {name: "5.4inch", value: 5.4},
            {name: "5.5inch", value: 5.5},
            {name: "6inch", value: 6},
            {name: "6.2inch", value: 6.2},
            {name: "6.4inch", value: 6.4},
            {name: "6.5inch", value: 6.5},
            {name: "6.6inch", value: 6.6}
        ]

    },
    screen: {
        label: "Display Size",
        options: [
            {name: "13inch", value: 13},
            {name: "14inch", value: 14},
            {name: "15inch", value: 15},
            {name: "15.6inch", value: 15.6},
            {name: "17inch", value: 17},
            {name: "18inch", value: 18},
            {name: "19inch", value: 19},
            {name: "22inch", value: 22},
            {name: "24inch", value: 24},
            {name: "27inch", value: 27},
            {name: "32inch", value: 32},
            {name: "64inch", value: 64}
        ]
    },
    resulation: {
        label: "Resulation",
        options: [
            {name: "600x1000", value: "600x1000"},
            {name: "720x1366", value: "720x1366"},
            {name: "1080x1920", value: "1080x1920"},
            {name: "1440x2800", value: "1440x2800"}

        ]
    },
    gender: {
        label: "Gender",
        options: [
            {name: "Male", value: "600x1000"},
            {name: "Female", value: "720x1366"},
            {name: "1080x1920", value: "1080x1920"},
            {name: "1440x2800", value: "1440x2800"}

        ]
    },
    t_shart_size: {
        label: "Size",
        options: [
            {name: "3XS", value: "3XS"},
            {name: "2XS", value: "2XS"},
            {name: "XS", value: "XS"},
            {name: "S", value: "S"},
            {name: "M", value: "M"},
            {name: "L", value: "L"},
            {name: "XL", value: "XL"},
            {name: "2XL", value: "2XL"},
            {name: "3XL", value: "3XL"},
            {name: "4XL", value: "4XL"},
            {name: "5XL", value: "5XL"},
            {name: "6XL", value: "6XL"},
            {name: "7XL", value: "7XL"},
            {name: "8XL", value: "8XL"},
            {name: "Free", value: "Free"},
        ]
    },
    fabric: {
        label: "Fabric",
        options: [
            {name: "Cotton Blend", value: "Cotton Blend"},
            {name: "Elastane", value: "Elastane"},
            {name: "Linen Blend", value: "Linen Blend"},
            {name: "Modal", value: "Modal"},
            {name: "Nylon", value: "Nylon"},
            {name: "Organic Cotton", value: "Organic Cotton"},
            {name: "Poly Cotton", value: "Poly Cotton"},
            {name: "Polyester", value: "Polyester"},
            {name: "Pure Cotton", value: "Pure Cotton"},
            {name: "Viscose Rayon", value: "Viscose Rayon"},
            {name: "Wool Blend", value: "Wool Blend"},
        ]
    },
    t_shart_pattern: {
        label: "Pattern",
        options: [
            {name: "Abstract", value: "Abstract"},
            {name: "Animal Print", value: "Animal Print"},
            {name: "Cartoon", value: "Cartoon"},
            {name: "Checkered", value: "Checkered"},
            {name: "Chevron/Zig Zag", value: "Chevron/Zig Zag"},
            {name: "Colorblock", value: "Colorblock"},
            {name: "Conversational", value: "Conversational"},
            {name: "Embroidered", value: "Embroidered"},
            {name: "Floral Print", value: "Floral Print"},
            {name: "Geometric Print", value: "Geometric Print"},
            {name: "Graphic Print", value: "Graphic Print"},
            {name: "Military Camouflage", value: "Military Camouflage"},
            {name: "Polka Print", value: "Polka Print"},
            {name: "Printed", value: "Printed"},
            {name: "Self Design", value: "Self Design"},
            {name: "Solid", value: "Solid"},
            {name: "Sporty", value: "Sporty"},
            {name: "Striped", value: "Striped"},
            {name: "Superhero", value: "Superhero"},
            {name: "Tie & Dye", value: "Tie & Dye"},
            {name: "Tribal Print", value: "Tribal Print"},
            {name: "Typography", value: "Typography"},
            {name: "Washed/Ombre", value: "Washed/Ombre"},
        ]
    },
    occasion: {
        label: "Occasion",
        options: [
            {name: "Beach Wear", value: "Beach Wear"},
            {name: "Casual", value: "Casual"},
            {name: "Formal", value: "Formal"},
            {name: "Lounge Wear", value: "Lounge Wear"},
            {name: "Party", value: "Party"},
            {name: "Sports", value: "Sports"},
        ]
    },
    t_shart_color: {
        label: "Color",
        options: [
            {name: "Beige", value: "Beige"},
            {name: "Black", value: "Black"},
            {name: "Blue", value: "Blue"},
            {name: "Brown", value: "Brown"},
            {name: "Dark Blue", value: "Dark Blue"},
            {name: "Dark Green", value: "Dark Green"},
            {name: "Gold", value: "Gold"},
            {name: "Green", value: "Green"},
            {name: "Grey", value: "Grey"},
            {name: "Light Blue", value: "Light Blue"},
            {name: "Light Green", value: "Light Green"},
            {name: "Maroon", value: "Maroon"},
            {name: "Multicolor", value: "Multicolor"},
            {name: "Navy Blue", value: "Navy Blue"},
            {name: "Orange", value: "Orange"},
            {name: "Pink", value: "Pink"},
            {name: "Purple", value: "Purple"},
            {name: "Red", value: "Red"},
            {name: "Silver", value: "Silver"},
            {name: "White", value: "White"},
            {name: "Yellow", value: "Yellow"},
        ]
    }
}

export const categoryMap = {
    "laptop": ["battery", "screen", "resulation", "ram", "laptop_storage"],
    "watches": ["battery", "screen", "resulation", "ram", "laptop_storage"],
    "mobile": ["battery", "screen", "resulation", "ram", "laptop_storage"],
    "t-shart": ["gender", "fabric", "t_shart_size", "t_shart_pattern", "occasion", "t_shart_color"],
    "jeans": ["gender", "t_shart_size", "occasion", "t_shart_color"],
}


const SearchProduct = () => {
    const [getQuery] = useSearchParams()
    const {categoryName} = useParams()
    const filterObj = useRef({attributes: {}})
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

    let cats = categoryMap?.[selectedCategory?.slug]

    function renderOptions(attr, attributeName) {
        return (
            <div>
                {attr?.options?.map(option => (
                    <div key={option.name + option.value} className="flex items-center gap-x-2 px-2">
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

    return (
        <div>
            <div className="bread-fixed">
                <div className="container">
                    <Breadcrumb selectedCategory={selectedCategory}/>
                </div>
            </div>

            {isSearching && <Loader/>}

            <div className="gap-6 mt-4">
                <div className="bg-white p-2 sidebar product-attr-sidebar    ">
                    <div className="">
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
                                        <span>{attributes[attributeKey].label}</span>
                                        <span><FaAngleRight className="text-xs"/></span>
                                    </div>
                                    {expandAttributes.includes(attributeKey) && renderOptions(attributes[attributeKey], attributeKey)}
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