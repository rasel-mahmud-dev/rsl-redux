import {createSlice} from "rsl-redux";
import {authVerifyAction, createAccountAction, loginAction} from "../actions/authAction.js";

const initialState = {
    auth: null,
    testAuth: {},
    openSidebar: ""
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
            localStorage.removeItem("token")
            state.auth = null
        }    ,
        setSidebar(state, action){
            state.openSidebar = action.payload
        }
    },

    extraReducers: (builder)=>{

        builder.addCase(loginAction.fulfilled, (state, action)=>{
            state.auth = action.payload.user
            localStorage.setItem('token', action.payload.token)
        })


        builder.addCase(loginAction.rejected, (state, action)=>{
            console.log(state, action)
        })

        builder.addCase(createAccountAction.fulfilled, (state, action)=>{
            state.auth = action.payload.user
            localStorage.setItem('token', action.payload.token)
        })

        builder.addCase(authVerifyAction.fulfilled, (state, action)=>{
            state.auth = action.payload.user
        })
    }
})

export const {setAuth, logOut, setSidebar} = authSlice.actions
export default authSlice