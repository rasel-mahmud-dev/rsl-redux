import {createAsyncAction} from "rsl-redux";
import {api} from "../../axios/index.js";
import catchErrorMessage from "../../utils/catchErrorMessage.js";


export const fetchWishlists = createAsyncAction(
    "fetch-wishlist",
    async function () {
        try {
            const res = await api.get("/wishlist")
            return res.data

        } catch (e) {
            throw catchErrorMessage(e)
        }

    })


export const addToWishlistAction = createAsyncAction(
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


export const removeFromWishlistAction = createAsyncAction(
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


export const deleteWishlistItemAction = createAsyncAction(
    "deleteWishlistAction",
    async function (cartId) {
        try {
            await api.delete("/carts/" + cartId)
            return cartId

        } catch (e) {
            throw catchErrorMessage(e)
        }

    })

export const orderWishlistProductsAction = createAsyncAction(
    "orderWishlistProductsAction",
    async function (products) {
        try {
            const {data} = await api.post("/orders", products)
            return data
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })