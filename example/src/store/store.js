import {configureStore} from "rsl-redux";
import authSlice from "./slices/authSlice.js";
import productSlice from "./slices/productSlice.js";
import cartSlice from "./slices/cartSlice.js";

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [productSlice.name]: productSlice.reducer,
        [cartSlice.name]: cartSlice.reducer
    }
})


export default store