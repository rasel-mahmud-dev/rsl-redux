import {configureStore} from "rsl-redux";
import postSlice from "./slices/postSlice";
import authSlice from "./slices/authSlice";
import productSlice from "./slices/productSlice.ts";
import cartSlice from "./slices/cartSlice.ts";

const store = configureStore({
    reducer: {
        [postSlice.name]: postSlice.reducer,
        [authSlice.name]: authSlice.reducer,
        [productSlice.name]: productSlice.reducer,
        [cartSlice.name]: cartSlice.reducer
    }
})

export type RootStateType =  ReturnType<typeof store.state>

export default store