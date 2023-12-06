import {createAsyncAction} from "rsl-redux";
import {api} from "../../axios";

export const loginAction = createAsyncAction(
    "delete-post-request",
    async function (payload) {
        try {
            const {data} = await api.post("/users/login", payload)
            return data
        } catch (e) {
            return e.message
        }

    })
