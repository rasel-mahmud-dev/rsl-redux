
import {createAsyncAction} from "rsl-redux";
import {api} from "../../axios/index.js";

export const fetchCategories = createAsyncAction(
    "fetch-categories",
    async function () {
        try {
            const res = await api.get("/categories")
            console.log(res.data)
            return res.data

        } catch (e) {
            throw e
        }

    })

export const fetchBrands = createAsyncAction(
    "fetch-brands",
    async function () {
        try {
            const res = await api.get("/brands")
            console.log(res.data)
            return res.data

        } catch (e) {
            throw e
        }

    })
