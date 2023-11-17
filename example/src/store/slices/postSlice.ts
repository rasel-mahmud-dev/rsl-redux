import {createSlice} from "rsl-redux";
import {deletePostAsync, fetchPostsAsync} from "../actions/postAction";

const postSlice = createSlice({
    name: 'postState',
    initialState: {
        posts: []
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(deletePostAsync.fulfilled, (state, action) => {
            state.posts = state.posts.filter(post=>post.id !== action.payload)
        })

        builder.addCase(deletePostAsync.rejected, (state, action) => {
            console.log("rejected rejected rejected")
            // handle an error case::
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