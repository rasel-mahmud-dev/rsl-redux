import {createAsyncAction} from "rsl-redux/src";

export const deletePostAsync = createAsyncAction(
    "delete-post-request",
    async function (payload, thunkAPI) {
        return payload
    })

export const fetchPostsAsync = createAsyncAction(
    "fetch-posts-request",
    async function (_, thunkAPI) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                let res = await fetch("https://jsonplaceholder.typicode.com/posts")
                resolve(await res.json())
            }, 1000)
        })
    })

