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