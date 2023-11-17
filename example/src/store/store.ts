import postSlice from "./slices/postSlice";
import authSlice from "./slices/authSlice";
import {configureStore} from "rsl-redux";

const store = configureStore({
    reducer: {
        [postSlice.name]: postSlice.reducer,
        [authSlice.name]: authSlice.reducer
    }
})

export default store