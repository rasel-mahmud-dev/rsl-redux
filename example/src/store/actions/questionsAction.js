import {createAsyncThunk} from "rsl-redux";
import {api} from "../../axios/index.js";
import catchErrorMessage from "../../utils/catchErrorMessage.js";


export const addQuestionAnswerAction = createAsyncThunk(
    "addQuestionAnswer",
    async function ({
                        question,
                        answer,
                        productId
                    }) {
        try {
            const {status, data} = await api.post("/question-answers/question", {
                question,
                answer,
                productId,

            })
            if (status === 201) {
                return {productId: productId, data}
            }

        } catch (e) {
            throw catchErrorMessage(e)
        }

    })


export const updateQuestionAnswerAction = createAsyncThunk(
    "updateQuestionAnswerAction",
    async function ({
                        _id,
                        question,
                        answer,
                        productId
                    }) {
        try {
            const {status, data} = await api.patch("/question-answers/" + _id, {
                question,
                answer,
                productId
            })
            if (status === 201) {
                return {_id, data}
            }

        } catch (e) {
            throw catchErrorMessage(e)
        }

    })


export const updateAnswerAction = createAsyncThunk(
    "updateAnswerAction",
    async function ({
                        _id,
                        answer,
                        productId
                    }) {
        try {
            const {status} = await api.put("/question-answers/answer/" + _id, {
                answer,
                productId
            })
            if (status === 201) {
                return {_id, productId,  answer}
            }

        } catch (e) {
            throw catchErrorMessage(e)
        }

    })


export const fetchQuestionAnswers = createAsyncThunk(
    "fetchQuestionAnswers",
    async function (productId) {
        try {
            const {data} = await api.get("/question-answers/" + productId)
            return {productId, data}
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })


export const fetchCustomerQuestionAnswers = createAsyncThunk(
    "fetchCustomerQuestionAnswers",
    async function () {
        try {
            const {data} = await api.get("/question-answers/all")
            return data
        } catch (e) {
            throw catchErrorMessage(e)
        }

    })


export const deleteQuestionAnswer = createAsyncThunk(
    "deleteQuestionAnswer",
    async function (id) {
        try {
            const {status} = await api.delete("/question-answers/" + id)
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