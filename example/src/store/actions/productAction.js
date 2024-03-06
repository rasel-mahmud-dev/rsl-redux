import {createAsyncAction} from "rsl-redux";
import {api} from "../../axios/index.js";

export const fetchProducts = createAsyncAction(
    "fetch-products",
    async function (pageNumber) {
        try {
            const res = await api.get("/products?page_number=" + pageNumber)
            return {data: res?.data ?? [], pageNumber}

        } catch (e) {
            throw e
        }

    })

export const fetchOrdersAction = createAsyncAction(
    "fetchOrdersAction",
    async function (pageNumber) {
        try {
            const res = await api.get("/orders?page_number=" + pageNumber)
            return {data: res?.data ?? [], pageNumber}

        } catch (e) {
            throw e
        }

    })
export const searchProductAction = createAsyncAction(
    "search-products",
    async function (text) {
        const res = await api.get("/products/search?text=" + text)
        return res?.data
    })


export const deleteBrand = createAsyncAction(
    "deleteBrand",
    async function (brandId) {
        const res = await api.delete("/brands/" + brandId)
        if (res.status === 200) return brandId
        throw Error("Brand Delete fail")
    })