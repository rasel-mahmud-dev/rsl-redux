import {createSlice} from "rsl-redux/src/index";

const authSlice = createSlice({
    name: 'authState',
    initialState: {
        auth: null,
        testAuth: {}
    },
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