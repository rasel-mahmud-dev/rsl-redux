import {createSlice} from "rsl-redux";
import {addToCartAction, deleteCartItemAction, fetchCarts} from "../actions/cartAction.js";
import Toast from "../../utils/toast.js";
import {act} from "react-dom/test-utils";


const initialState = {
    carts: []
}

const cartSlice = createSlice({
    name: 'cartState',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItemIndex = state.carts.findIndex(item => item.id === action.payload.id);

            if (existingItemIndex !== -1) {
                // If the item already exists in the cart, update its quantity
                const updatedCart = [...state.carts];
                updatedCart[existingItemIndex].quantity += action.payload.quantity;
                return {
                    ...state,
                    carts: updatedCart,
                };
            } else {
                // If the item doesn't exist, add it to the cart
                return {
                    ...state,
                    carts: [...state.carts, action.payload],
                };
            }
        },
        incrementQuantity: (state, action) => {
            const existingItemIndex = state.carts.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                const updatedCart = [...state.carts];
                updatedCart[existingItemIndex].quantity += 1;
                return {
                    ...state,
                    carts: updatedCart,
                };
            } else {
                return state;
            }
        },
        decrementQuantity: (state, action) => {
            const existingItemIndex = state.carts.findIndex(item => item.id === action.payload.id);

            if (existingItemIndex !== -1) {
                // If the item exists, increment its quantity by the payload amount
                const updatedCart = [...state.carts];
                if (updatedCart[existingItemIndex].quantity > 1) {
                    updatedCart[existingItemIndex].quantity -= 1;
                }

                return {
                    ...state,
                    carts: updatedCart,
                };
            } else {
                return state;
            }
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCarts.fulfilled, (state, action) => {
            state.carts = action.payload
        })

        builder.addCase(addToCartAction.fulfilled, (state, action) => {
            const existingItemIndex = state.carts.findIndex(item => item.product_id === action.payload.product_id);
            console.log(existingItemIndex, action.payload)
            if (existingItemIndex !== -1) {
                // If the item already exists in the cart, update its quantity
                const updatedCart = [...state.carts];
                updatedCart[existingItemIndex].quantity += action.payload.quantity;
                return {
                    ...state,
                    carts: updatedCart,
                };
            } else {
                // If the item doesn't exist, add it to the cart
                return {
                    ...state,
                    carts: [...state.carts, action.payload],
                };
            }
        })

        builder.addCase(addToCartAction.rejected, (state, action) => {
            if (action.payload && typeof action.payload === "string") {
                Toast.openError(action.payload)
            }
        })
        builder.addCase(deleteCartItemAction.fulfilled, (state, action) => {
            return {
               ...state,
               carts: state.carts.filter(item=>item._id !== action.payload)
           }
        })
    }
})


export const {addToCart, incrementQuantity, decrementQuantity} = cartSlice.actions
export default cartSlice