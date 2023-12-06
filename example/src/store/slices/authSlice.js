import {createSlice} from "rsl-redux";

const initialState = {
    auth: null,
    testAuth: {}
}

const authSlice = createSlice({
    name: 'authState',
    initialState,
    reducers: {
        setAuth(state, action){
            state.auth = {
                ...action.payload
            }
        },
        logOut(state){
            state.auth = null
        }
    },
})

export const {setAuth, logOut} = authSlice.actions
export default authSlice