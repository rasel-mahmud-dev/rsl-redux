import {createSlice} from "rsl-redux";
import {deleteBrand, fetchProducts} from "../actions/productAction.js";
import {deleteCategory, fetchBrands, fetchCategories} from "../actions/categoryAction.js";
import {deleteAdminProduct, fetchAdminProducts} from "../actions/adminAction.js";

const initialState = {
    showCategories: [
        {
            "_id": "6570c5ae26c947e3c99321f7",
            "name": "Laptop",
            "slug": "laptop",
            "image": "-original-imaguyhz7cyftguh.webp"
        },
        {
            "_id": "6570c5ae26c947e3c99321f8",
            "name": "Health & Beauty",
            "slug": "health-beauty",
            "image": "-original-imagnrmsyuhjce9a.webp"
        },
        {
            "_id": "6570c5ae26c947e3c99321f9",
            "name": "Watches, Bags, Jewellery",
            "slug": "watches-bags-jewellery",
            "image": "-original-imaghbkf6jzfxfz55.webp"
        },


        {
            "_id": "6570c5ae26c947e3c99321fd",
            "name": "TV & Home Appliances",
            "slug": "tv-home-appliances",
            "image": "telev3.webp"
        },

        {
            "_id": "65736c291959c8d6cfec1e0d",
            "created_at": "2023-12-08T19:19:05.643Z",
            "name": "Mobile",
            "slug": "mobile",
            "image": "-original-imaghx9q5rvcdghy.webp"
        },
        {
            "_id": "657489ecf06523a9349cdd92",
            "created_at": "2023-12-09T15:38:20.286Z",
            "name": "Watches",
            "slug": "watches",
            "image": "-original-imagg8d9hbkhfffg.webp"
        },
        {
            "_id": "65748d86f06523a9349cdd93",
            "created_at": "2023-12-09T15:53:42.942Z",
            "name": "T-shart",
            "slug": "t-shart",
            "image": "s-cmb-po2-dab-wynk-smartees-original-imagm5vhumtz8epz.webp"
        },
        {
            "_id": "657492f54b5b3e0607eeb3ae",
            "created_at": "2023-12-09T16:16:53.216Z",
            "name": "Jeans",
            "slug": "jeans",
            "image": "32-pm206796a083-pepe-jeans-original-imagqhmbzgxx3yhz.webp"
        },
        {
            "_id": "658118609414196f798f2f86",
            "created_at": "2023-12-19T04:13:20.261Z",
            "name": "Televisions",
            "slug": "televisions",
            "image": "u-series-55-u1s-55uc1a00-oneplus-original-imag7xtnzgaaxqrg.webp"
        }
    ],
    homeProducts: {},
    products: [],
    brands: [],
    adminProducts: [],
    categories: [],
    filter: {
        search: "",
        categoryIds: [],
        brandIds: [],
        pageNumber: 1
    }
}

const productSlice = createSlice({
    name: 'productState',
    initialState: initialState,
    reducers: {

        setFilter(state, action) {
            for (let payloadKey in action.payload) {
                state.filter[payloadKey] = action.payload[payloadKey]
            }
        }

    },

    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            const {pageNumber, data} = action.payload
            // state.products[pageNumber] = data
            state.homeProducts[pageNumber] = data

        })

        builder.addCase(fetchAdminProducts.fulfilled, (state, action) => {
            state.adminProducts = action.payload
        })

        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })

        builder.addCase(deleteAdminProduct.fulfilled, (state, action) => {
            state.adminProducts = state.adminProducts.filter(p => p._id !== action.payload)
            state.products = state.products.filter(p => p._id !== action.payload)
        })

        builder.addCase(fetchBrands.fulfilled, (state, action) => {
            state.brands = action.payload
        })

        builder.addCase(deleteBrand.fulfilled, (state, action) => {
            state.brands = state.brands.filter(p => p._id !== action.payload)
        })

        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter(p => p._id !== action.payload)
        })


    }
})


export const {setFilter} = productSlice.actions
export default productSlice