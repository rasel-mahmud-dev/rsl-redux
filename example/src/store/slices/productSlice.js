import {createSlice} from "rsl-redux";
import {deleteBrand, fetchProducts} from "../actions/productAction.js";
import {deleteCategory, fetchBrands, fetchCategories} from "../actions/categoryAction.js";
import {deleteAdminProduct, fetchAdminProducts} from "../actions/adminAction.js";

const initialState = {
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