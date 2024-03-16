import {createAsyncThunk} from "rsl-redux";
import {api} from "../../axios/index.js";


export const fetchAdminProducts = createAsyncThunk(
    "fetchAdminProducts",
    async function () {
        try {
            const res = await api.get("/products")
            return res.data

        } catch (e) {
            throw e
        }

    })


export const fetchAdminDashboardProducts = createAsyncThunk(
    "fetchAdminDashboardProducts",
    async function () {
        try {
            const res = await api.get("/products/list")
            return res.data

        } catch (e) {
            throw e
        }

    })

export const deleteAdminProduct = createAsyncThunk(
    "deleteAdminProduct",
    async function (productId) {
        const res = await api.delete("/products/" + productId)
        if (res.status === 200) return productId
        throw Error("Product Delete fail")
    }
)