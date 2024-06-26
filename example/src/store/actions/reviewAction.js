import {createAsyncThunk} from "rsl-redux";
import {api} from "../../axios/index.js";
import catchErrorMessage from "../../utils/catchErrorMessage.js";


export const addReviewAction = createAsyncThunk(
    "addReview",
    async function ({
                        title,
                        rate,
                        productId,
                        summary,
                        images
                    }) {
        try {
            const {status, data} = await api.post("/reviews", {
                title,
                rate,
                productId,
                summary,
                images
            })
            if (status === 201) {
                return {productId: productId, data}
            }

        } catch (e) {
            throw catchErrorMessage(e)
        }

    })




export const updateReviewAction = createAsyncThunk(
    "updateReviewAction",
    async function ({
                        _id,
                        title,
                        rate,
                        productId,
                        summary,
                        images
                    }) {
        try {
            const {status, data} = await api.patch("/reviews/" + _id, {
                title,
                rate,
                productId,
                summary,
                images
            })
            if (status === 201) {
                return {_id, data}
            }

        } catch (e) {
            throw catchErrorMessage(e)
        }

    })



export const fetchReviews = createAsyncThunk(
    "fetchReviews",
    async function (productId) {
        try {
            const {data} = await api.get("/reviews/" + productId)
            return {productId, data}
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })



export const fetchCustomerReviews = createAsyncThunk(
    "fetchCustomerReviews",
    async function () {
        try {
            const {data} = await api.get("/reviews/all")
            return data
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })


export const deleteReview = createAsyncThunk(
    "deleteReview",
    async function (id) {
        try {
            const {status} = await api.delete("/reviews/" + id)
            if (status !== 200) throw Error("Delete fail")
            return id
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })

export const authVerifyAction = createAsyncThunk(
    "verify_auth_account",
    async function () {
        try {
            const {data} = await api.get("/auth/auth")
            return data
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })