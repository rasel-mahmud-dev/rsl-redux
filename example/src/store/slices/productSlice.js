import {createSlice} from "rsl-redux";
import {fetchProducts} from "../actions/productAction.js";

const initialState = {
    products: []
}

const productSlice = createSlice({
    name: 'productState',
    initialState: initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload
        })
    }
})



// export const {} = productSlice.actions
export default productSlice