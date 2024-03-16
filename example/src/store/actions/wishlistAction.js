import {createAsyncThunk} from "rsl-redux";
import {api} from "../../axios/index.js";
import catchErrorMessage from "../../utils/catchErrorMessage.js";


export const fetchWishlists = createAsyncThunk(
    "fetch-wishlist",
    async function () {
        try {
            const res = await api.get("/wishlist")
            return res.data

        } catch (e) {
            throw catchErrorMessage(e)
        }

    })


export const addToWishlistAction = createAsyncThunk(
    "addToWishlistAction",
    async function (productId) {
        try {
            const res = await api.post("/wishlist", {
                productId: productId
            })
            return res.data

        } catch (e) {
            throw catchErrorMessage(e)
        }

    })


export const removeFromWishlistAction = createAsyncThunk(
    "removeFromWishlistAction",
    async function (productId) {
        try {
            const res = await api.delete("/wishlist", {
                data: {
                    productId: productId
                }
            })
            return res.data

        } catch (e) {
            throw catchErrorMessage(e)
        }

    })


export const deleteWishlistItemAction = createAsyncThunk(
    "deleteWishlistAction",
    async function (cartId) {
        try {
            await api.delete("/carts/" + cartId)
            return cartId

        } catch (e) {
            throw catchErrorMessage(e)
        }

    })

export const orderWishlistProductsAction = createAsyncThunk(
    "orderWishlistProductsAction",
    async function (products) {
        try {
            const {data} = await api.post("/orders", products)
            return data
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })