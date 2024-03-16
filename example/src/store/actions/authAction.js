import {createAsyncThunk} from "rsl-redux";
import {api} from "../../axios";
import catchErrorMessage from "../../utils/catchErrorMessage.js";

export const loginAction = createAsyncThunk(
    "auth-login",
    async function (payload) {
        try {
            const {data} = await api.post("/auth/login", payload)
            return data
        } catch (e) {
            throw catchErrorMessage(e)
        }
    })

export const createAccountAction = createAsyncThunk(
    "create_account",
    async function (payload) {
        try {
            const {data} = await api.post("/auth/create-account", payload)
            return data
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })


export const fetchAddresses = createAsyncThunk(
    "fetchAddresses",
    async function () {
        try {
            const {data} = await api.get("/shipping-addresses")
            return data
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })


export const deleteAddress = createAsyncThunk(
    "deleteAddress",
    async function (id) {
        try {
            const {status} = await api.delete("/shipping-addresses/" + id)
            if (status !== 200) throw Error("Delete fail")
            return id
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })

export const authVerifyAction = createAsyncThunk(
    "verify_auth_account",
    async function () {
        try {
            const {data} = await api.get("/auth/auth")
            return data
        } catch (e) {
            throw catchErrorMessage(e)
        }
    })

export const fetchAdminCustomersProducts = createAsyncThunk(
    "fetchAdminCustomersProducts",
    async function () {
        try {
            const {data} = await api.get("/auth/customers")
            return data
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })

export const deleteCustomer = createAsyncThunk(
    "deleteCustomer",
    async function (id) {
        try {
            const {data, status} = await api.delete("/auth/customers/" + id)
            if (status !== 201) throw Error("Delete fail")
            return id
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })

export const fetchDashboardSlatsAction = createAsyncThunk(
    "fetchDashboardSlatsAction",
    async ({year, role, taskList = []}) => {
        try {
            const {data} = await api.post("/slats/admin-dashboard/home", {
                year,
                role,
                taskList
            })
            return data
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })
export const fetchOrdersSlatsAction = createAsyncThunk(
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
export const fetchCartsSlatsAction = createAsyncThunk(
    "fetchCartsSlatsAction",
    async ({year, role, taskList = []}) => {
        try {
            const {data} = await api.post("/orders/stats", {
                year,
                role,
                taskList
            })
            return {items: data, year}
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })

export const fetchCategoryWiseOrdersSlatsAction = createAsyncThunk(
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

export const fetchOrdersSlatsSummaryAction = createAsyncThunk(
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
