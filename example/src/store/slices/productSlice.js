import {createSlice} from "rsl-redux";
import {fetchProducts} from "../actions/productAction.js";
import {fetchCategories} from "../actions/categoryAction.js";
import {fetchAdminProducts} from "../actions/adminAction.js";

const initialState = {
    products: [],
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
            state.products = action.payload
        })

        builder.addCase(fetchAdminProducts.fulfilled, (state, action) => {
            state.adminProducts = action.payload
        })

        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })
    }
})


export const {setFilter} = productSlice.actions
export default productSlice