import {createAsyncThunk} from "rsl-redux";

export const deletePostAsync = createAsyncThunk(
    "delete-post-request",
    async function (payload, thunkAPI) {
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + payload, {
                method: "DELETE"
            })
            if(res.ok){
                return payload
            }

            // throw Error("network fail")

        } catch (e) {
            throw e
        }

    })


export const fetchPostsAsync = createAsyncThunk(
    "fetch-posts-request",
    async function (_, thunkAPI) {
        return new Promise(async (resolve, reject) => {
            let res = await fetch("https://jsonplaceholder.typicode.com/posts")
            resolve(await res.json())
        })
    })

