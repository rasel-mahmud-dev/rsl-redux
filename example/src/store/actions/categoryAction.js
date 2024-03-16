import {createAsyncThunk} from "rsl-redux";
import {api} from "../../axios/index.js";
import Crypto from "../../utils/crypto.js";

export const fetchCategories = createAsyncThunk(
    "fetch-categories",
    async function () {
        try {
            const res = await api.get("/categories")
            return res.data

        } catch (e) {
            throw e
        }

    })

export const fetchCategoryBrands = createAsyncThunk(
    "fetchCategoryBrands",
    async function (catSlug) {
        try {
            const res = await api.get("/brands/category/" + catSlug)

            return {
                slug: catSlug,
                items: res.data
            }

        } catch (e) {
            throw e
        }

    })


export const fetchAttributeSpec = createAsyncThunk(
    "fetchAttributeSpec",
    async function (catSlug) {
        try {
            const res = await api.get("/attributes/specs/" + catSlug)
            const data = Crypto.decrypt(res.data)
            const arr = JSON.parse(data)
            return {
                slug: catSlug,
                items: arr
            }

        } catch (e) {
            throw e
        }

    })

export const fetchAttributeSpecMapping = createAsyncThunk(
    "fetchAttributeSpecMapping",
    async function () {
        try {
            const res = await api.get("/attributes/specs-mapping")

            const data = Crypto.decrypt(res.data)
            const arr = JSON.parse(data)

            return arr


        } catch (e) {
            console.log(e)
            throw e
        }

    })


export const fetchBrands = createAsyncThunk(
    "fetch-brands",
    async function () {
        try {
            const res = await api.get("/brands")
            return res.data

        } catch (e) {
            throw e
        }

    })


export const deleteCategory = createAsyncThunk(
    "deleteCategory",
    async function (categoryId) {
        const res = await api.delete("/categories/" + categoryId)
        if (res.status === 200) return categoryId
        throw Error("Category Delete fail")
    })