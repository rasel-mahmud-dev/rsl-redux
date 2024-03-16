import {createAsyncThunk} from "rsl-redux";
import {api} from "../../axios/index.js";
import catchErrorMessage from "../../utils/catchErrorMessage.js";


export const fetchCarts = createAsyncThunk(
    "fetch-carts",
    async function () {
        try {
            const res = await api.get("/carts")
            return res.data

        } catch (e) {
            throw catchErrorMessage(e)
        }

    })

export const addToCartAction = createAsyncThunk(
    "addToCartAction",
    async function (cart) {
        try {
            const res = await api.post("/carts", cart)
            return res.data
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })


export const deleteCartItemAction = createAsyncThunk(
    "deleteCartAction",
    async function (cartId) {
        try {
            await api.delete("/carts/" + cartId)
            return cartId

        } catch (e) {
            throw catchErrorMessage(e)
        }

    })

export const orderCartProductsAction = createAsyncThunk(
    "orderCartProductsAction",
    async function (products) {
        try {
            const {data} = await api.post("/orders", products)
            return data
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })