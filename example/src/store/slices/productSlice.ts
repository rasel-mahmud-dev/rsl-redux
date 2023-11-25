import {createSlice} from "rsl-redux";
import {fetchProducts} from "../actions/productAction.ts";

export type ProductType = {
    title: string,
    id: string,
    price: number
}

type StateType = {
    products: Array<ProductType>
}

const initialState: StateType = {
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