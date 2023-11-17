import {createSlice} from "rsl-redux/src/index.js";
import {deletePostAsync, fetchPostsAsync} from "../actions/postAction";

const postSlice = createSlice({
    name: 'postState',
    initialState: {
        posts: []
    },
    reducers: {},

    extraReducers: (builder) => {

        builder.addCase(deletePostAsync.fulfilled, (state, action) => {
            return {
                ...state,
                posts: state.posts.filter(post=>post.id !== action.payload)
            }
        })

        builder.addCase(fetchPostsAsync.fulfilled, (state, action) => {
            // this function need to invoked after call dispatch
            return {
                ...state,
                posts:  action.payload
            }
        })
    }
})



// export const {} = postSlice.actions
export default postSlice