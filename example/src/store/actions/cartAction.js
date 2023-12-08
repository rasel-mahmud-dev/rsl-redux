import {createAsyncAction} from "rsl-redux";
import {api} from "../../axios/index.js";


export const fetchCarts = createAsyncAction(
    "fetch-carts",
    async function () {
        try {
            const res = await api.get("/carts")
            return res.data

        } catch (e) {
            throw e
        }

    })