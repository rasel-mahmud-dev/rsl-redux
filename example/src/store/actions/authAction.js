import {createAsyncAction} from "rsl-redux";
import {api} from "../../axios";
import catchErrorMessage from "../../utils/catchErrorMessage.js";

export const loginAction = createAsyncAction(
    "auth-login",
    async function (payload) {
        try {
            const {data} = await api.post("/auth/login", payload)
            return data
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })

export const createAccountAction = createAsyncAction(
    "create_account",
    async function (payload) {
        try {
            const {data} = await api.post("/auth/create-account", payload)
            return data
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })

export const authVerifyAction = createAsyncAction(
    "verify_auth_account",
    async function () {
        try {
            const {data} = await api.get("/auth/auth")
            return data
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })

export const fetchDashboardSlatsAction = createAsyncAction(
    "fetchDashboardSlatsAction",
    async ({year, role}) => {
        try {
            const {data} = await api.post("/slats/admin-dashboard/home", {
                year,
                role
            })
            return data
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })
export const fetchOrdersSlatsAction = createAsyncAction(
    "fetchOrdersSlatsAction",
    async ({year, role}) => {
        try {
            const {data} = await api.post("/orders/stats", {
                year,
                role
            })
            return {items: data, year}
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })

export const fetchCategoryWiseOrdersSlatsAction = createAsyncAction(
    "fetchCategoryWiseOrdersSlatsAction",
    async ({year, role, type}) => {
        try {
            const {data} = await api.post("/orders/stats", {
                year,
                role,
                type
            })
            return {items: data, year}
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })

export const fetchOrdersSlatsSummaryAction = createAsyncAction(
    "fetchOrdersSlatsSummaryAction",
    async ({role, taskList}) => {
        try {
            const {data} = await api.post("/orders/stats/summary", {
                role, taskList
            })

            return data
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })
