import {createAsyncAction} from "rsl-redux";
import {api} from "../../axios/index.js";

export const fetchProducts = createAsyncAction(
    "fetch-products",
    async function () {
        try {
            const res = await api.get("/products")
            return res.data

        } catch (e) {
            throw e
        }

    })
export const searchProductAction = createAsyncAction(
    "search-products",
    async function (text) {
        try {
            const res = await api.get("/products/search?text=" + text)
            return res.data

        } catch (e) {
            throw e
        }

    })