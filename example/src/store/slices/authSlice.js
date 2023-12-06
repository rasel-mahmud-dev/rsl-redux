import {createSlice} from "rsl-redux";
import {authVerifyAction, createAccountAction, loginAction, loginAction2} from "../actions/authAction.js";

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
            localStorage.removeItem("token")
            state.auth = null
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

        builder.addCase(loginAction2.rejected, (state, action)=>{
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

export const {setAuth, logOut} = authSlice.actions
export default authSlice