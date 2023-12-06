import {createSlice} from "rsl-redux";
import {fetchProducts} from "../actions/productAction.js";
import {fetchCategories} from "../actions/categoryAction.js";

const initialState = {
    products: [],
    categories: []
}

const productSlice = createSlice({
    name: 'productState',
    initialState: initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload
        })

        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })
    }
})


// export const {} = productSlice.actions
export default productSlice