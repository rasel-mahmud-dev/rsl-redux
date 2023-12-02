import {createSlice} from "rsl-redux";

export type CartType = {
    title: string,
    image?: string,
    id: string,
    price: number
    quantity: number; // Adding the quantity field
}

type StateType = {
    carts: Array<CartType>
}

const initialState: StateType = {
    carts: []
}

const cartSlice= createSlice({
    name: 'cartState',
    initialState: initialState,
    reducers: {
        addToCart: (state, action)=>{
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
        }
    },

    extraReducers: () => {

    }
})



export const {addToCart} = cartSlice.actions
export default cartSlice