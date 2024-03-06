import {createAsyncAction} from "rsl-redux";
import {api} from "../../axios/index.js";


export const fetchAdminProducts = createAsyncAction(
    "fetchAdminProducts",
    async function () {
        try {
            const res = await api.get("/products")
            return res.data

        } catch (e) {
            throw e
        }

    })


export const fetchAdminDashboardProducts = createAsyncAction(
    "fetchAdminDashboardProducts",
    async function () {
        try {
            const res = await api.get("/products/list")
            return res.data

        } catch (e) {
            throw e
        }

    })

export const deleteAdminProduct = createAsyncAction(
    "deleteAdminProduct",
    async function (productId) {
        const res = await api.delete("/products/" + productId)
        if (res.status === 200) return productId
        throw Error("Product Delete fail")
    }
)