import React, {useEffect, useState} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "rsl-redux";
import Product from "../component/Product.jsx";
import {api} from "../axios/index.js";
import Breadcrumb from "../component/Breadcrumb.jsx";
import {setFilter} from "../store/slices/productSlice.js";
import {FaAngleRight} from "react-icons/fa";

const attributes = {
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
    }
}

const categoryMap = {
    "6570c5ae26c947e3c99321f7": ["battery", "screen", "resulation", "ram", "laptop_storage"]
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

    function renderOptions(attr) {
        return (
            <div>
                {attr?.options?.map(option => (
                    <div className="flex items-center gap-x-2 px-2">
                        <input type="checkbox"/>
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
                    {cats?.map((attributeKey) => (
                        <div key={attributeKey}>
                            <div className="flex justify-between items-center py-2 px-2">
                                <span>{attributes[attributeKey].label}</span>
                                <span><FaAngleRight className="text-xs"/></span>
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