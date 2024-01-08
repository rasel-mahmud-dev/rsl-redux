import {createAsyncAction} from "rsl-redux";
import {api} from "../../axios/index.js";
import catchErrorMessage from "../../utils/catchErrorMessage.js";


export const fetchCarts = createAsyncAction(
    "fetch-carts",
    async function () {
        try {
            const res = await api.get("/carts")
            return res.data

        } catch (e) {
            throw catchErrorMessage(e)
        }

    })

export const addToCartAction = createAsyncAction(
    "addToCartAction",
    async function (cart) {
        try {
            const res = await api.post("/carts", cart)
            return res.data

        } catch (e) {
            throw catchErrorMessage(e)
        }

    })


export const deleteCartItemAction = createAsyncAction(
    "deleteCartAction",
    async function (cartId) {
        try {
             await api.delete("/carts/" + cartId)
            return cartId

        } catch (e) {
            throw catchErrorMessage(e)
        }

    })