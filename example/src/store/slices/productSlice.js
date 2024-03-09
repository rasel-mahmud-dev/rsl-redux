import {createSlice} from "rsl-redux";
import {deleteBrand, fetchOrdersAction, fetchProducts} from "../actions/productAction.js";
import {
    deleteCategory,
    fetchAttributeSpec, fetchAttributeSpecMapping,
    fetchBrands,
    fetchCategories,
    fetchCategoryBrands
} from "../actions/categoryAction.js";
import {deleteAdminProduct, fetchAdminDashboardProducts, fetchAdminProducts} from "../actions/adminAction.js";
import {fetchWishlists} from "../actions/wishlistAction.js";
import {addReviewAction, fetchReviews} from "../actions/reviewAction.js";
import {addQuestionAnswerAction, fetchQuestionAnswers} from "../actions/questionsAction.js";

const initialState = {
    showCategories: [
        {
            "name": "Laptop",
            "slug": "laptop",
            "image": "-original-imaguyhz7cyftguh.webp"
        },
        {
            "name": "Health & Beauty",
            "slug": "health-beauty",
            "image": "-original-imagnrmsyuhjce9a.webp"
        },
        {
            "name": "Watches",
            "slug": "watches",
            "image": "-original-imaghbkf6jzfxfz55.webp"
        },

        {
            "name": "Groceries",
            "slug": "groceries",
            "image": "https://rukminim2.flixcart.com/image/612/612/xif0q/nut-dry-fruit/m/0/b/500-popular-california-1-pouch-farmley-original-imagvy272uh8fkt2.jpeg?q=70"
        },

        {
            "created_at": "2023-12-08T19:19:05.643Z",
            "name": "Mobile",
            "slug": "mobile",
            "image": "-original-imaghx9q5rvcdghy.webp"
        },
        {
            "created_at": "2023-12-09T15:38:20.286Z",
            "name": "Watches",
            "slug": "watches",
            "image": "-original-imagg8d9hbkhfffg.webp"
        },
        {
            "created_at": "2023-12-09T15:53:42.942Z",
            "name": "T-shart",
            "slug": "t-shart",
            "image": "s-cmb-po2-dab-wynk-smartees-original-imagm5vhumtz8epz.webp"
        },
        {
            "created_at": "2023-12-09T16:16:53.216Z",
            "name": "Jeans",
            "slug": "jeans",
            "image": "32-pm206796a083-pepe-jeans-original-imagqhmbzgxx3yhz.webp"
        },
        {
            "created_at": "2023-12-19T04:13:20.261Z",
            "name": "Televisions",
            "slug": "televisions",
            "image": "u-series-55-u1s-55uc1a00-oneplus-original-imag7xtnzgaaxqrg.webp"
        }
    ],
    homeProducts: {},
    products: [],
    brands: [],
    specsMapping: {},
    categoryBrands: {}, // {catSlug: Brand[]}
    specs: {}, // {catSlug: Brand[]}
    wishlist: [],
    orders: {}, // {1: {items: Array<>, count: number} }
    adminProducts: [],
    categories: [],
    filter: {
        search: "",
        categoryIds: [],
        brandIds: [],
        pageNumber: 1,
        attributes: {}
    },
    reviews: {}, // key product id
    questionAnswers: {}, // key product id
}

const productSlice = createSlice({
    name: 'productState',
    initialState: initialState,
    reducers: {

        setFilter(state, action) {
            for (let payloadKey in action.payload) {
                state.filter[payloadKey] = action.payload[payloadKey]
            }
        },

        addToWishlist(state, action) {
            state.wishlist.push(action.payload)
        },

        removeFromWishlist(state, action) {
            state.wishlist = state.wishlist.filter(item => item.productId !== action?.payload)
        }

    },

    extraReducers: (builder) => {

        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            const {pageNumber, data} = action.payload
            // state.products[pageNumber] = data
            state.homeProducts[pageNumber] = data

        })

        builder.addCase(fetchWishlists.fulfilled, (state, action) => {
            state.wishlist = action?.payload || []

        })

        builder.addCase(fetchOrdersAction.fulfilled, (state, action) => {
            state.orders[action.payload.pageNumber] = {
                items: action.payload.items,
                count: action.payload.count
            }
        })

        builder.addCase(fetchAdminProducts.fulfilled, (state, action) => {
            state.adminProducts = action.payload
        })
        builder.addCase(fetchAdminDashboardProducts.fulfilled, (state, action) => {
            state.adminProducts = action.payload
        })

        builder.addCase(fetchCategoryBrands.fulfilled, (state, action) => {
            const {slug, items} = action.payload
            state.categoryBrands[slug] = items
        })

        builder.addCase(fetchAttributeSpec.fulfilled, (state, action) => {
            const {slug, items} = action.payload
            state.specs[slug] = items
        })

        builder.addCase(fetchAttributeSpecMapping.fulfilled, (state, action) => {
            state.specsMapping = action.payload
        })

        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })

        builder.addCase(deleteAdminProduct.fulfilled, (state, action) => {
            state.adminProducts = state.adminProducts.filter(p => p._id !== action.payload)
            state.products = state.products.filter(p => p._id !== action.payload)
        })

        builder.addCase(fetchBrands.fulfilled, (state, action) => {
            state.brands = action.payload
        })

        builder.addCase(deleteBrand.fulfilled, (state, action) => {
            state.brands = state.brands.filter(p => p._id !== action.payload)
        })

        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter(p => p._id !== action.payload)
        })


        // Reviews
        builder.addCase(fetchReviews.fulfilled, (state, action) => {
            const {productId, data} = action.payload
            if (productId) {
                state.reviews[productId] = data
            }
        })
        builder.addCase(addReviewAction.fulfilled, (state, action) => {
            const {productId, data} = action.payload
            if (productId) {
                if (!state.reviews[productId]) state.reviews[productId] = []
                state.reviews[productId].push(data)
            }
        })


        // Question and answers


        builder.addCase(fetchQuestionAnswers.fulfilled, (state, action) => {
            const {productId, data} = action.payload
            if (productId) {
                state.questionAnswers[productId] = data
            }
        })

        builder.addCase(addQuestionAnswerAction.fulfilled, (state, action) => {
            const {productId, data} = action.payload
            if (productId) {
                if (!state.questionAnswers[productId]) state.questionAnswers[productId] = []
                state.questionAnswers[productId].push(data)
            }
        })

    }
})


export const {removeFromWishlist, addToWishlist, setFilter} = productSlice.actions
export default productSlice