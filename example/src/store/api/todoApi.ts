import {createApi} from "rsl-redux";

const postApi = createApi({
    baseURL: "https://jsonplaceholder.typicode.com",
    reducerPath: "todoApi",
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => `/todos`,
            cacheKey: ["TODOS"]
        }),

        deletePostMutation: builder.mutation({
            query: ({ id }) => ({
                url: `post/${id}`,
                method: 'DELETE',
                body: {},
            }),
            cacheKey: ["TODOS"]
        })
    }),
})


export const {getTodos, deletePostMutation} = postApi
