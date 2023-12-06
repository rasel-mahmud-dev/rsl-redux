import {createAsyncAction} from "rsl-redux";
import {api} from "../../axios";

export const loginAction = createAsyncAction(
    "auth-login",
    async function (payload) {
        try {
            const {data} = await api.post("/users/login", payload)
            return data
        } catch (e) {
            throw e
        }

    })
export const loginAction2 = createAsyncAction(
    "auth-login",
    async function (payload) {
        try {
            const {data} = await api.post("/users/login", payload)
            return data
        } catch (e) {
            throw e
        }

    })

export const createAccountAction = createAsyncAction(
    "create_account",
    async function (payload) {
        try {
            const {data} = await api.post("/users/create-account", payload)
            return data
        } catch (e) {
            return e.message
        }

    })

export const authVerifyAction = createAsyncAction(
    "verify_auth_account",
    async function () {
        try {
            const {data} = await api.get("/users/auth")
            return data
        } catch (e) {
            return e.message
        }

    })
