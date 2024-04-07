# Rsl-Redux
# My Own Redux Toolkit
In this project, I create redux-toolkit from scratch.

### Features
- Async action
- Sync action
- Store
- Dispatch
- useSelector
- RTK query


A simple lightweight redux-toolkit clone.


![](https://github.com/rasel-mahmud-dev/rsl-redux/blob/main/public/file.png?raw=true)


[![NPM](https://nodei.co/npm/rsl-redux.png?downloads=true)](https://nodei.co/npm/rsl-redux/)

## Installation

Install `rsl-redux` with [npm](https://www.npmjs.com/):

```
npm install rsl-redux
```

## Usage


### With Vanila JS Project:

```jsx
import {createSlice, configureStore} from "rsl-redux"

const blogSlice = createSlice({
    name: "blogState",
    initialState: {
        posts: []
    },
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload
        },
        removePost(state, action) {
            const updatedPosts = [...state.posts]
            state.posts = updatedPosts.filter(post => post.id !== action.payload)
        }
    }
})

const {setPosts, removePost} = blogSlice.actions

const store = configureStore({
    reducer: {
        [blogSlice.name]: blogSlice.reducer
    }
})

// subscription added
store.subscribe((store) => {
    console.log("redux state", store.getState().blogState.posts)
})

const blogs = [
    {
        "id": 2,
        "title": "blog 3",
        "slug": "blog-3"
    },
    {
        "id": 3,
        "title": "blog 4",
        "slug": "blog-4"
    },
    {
        "id": 4,
        "title": "blog 5",
        "slug": "blog-5"
    },
    {
        "id": 5,
        "title": "blog 6",
        "slug": "blog-6"
    },
    {
        "id": 6,
        "title": "blog 7",
        "slug": "blog-7"
    },
    {
        "id": 7,
        "title": "blog 8",
        "slug": "blog-8"
    },
    {
        "id": 8,
        "title": "blog 9",
        "slug": "blog-9"
    },
    {
        "id": 9,
        "title": "blog 10",
        "slug": "blog-10"
    },
    {
        "id": 10,
        "title": "blog 11",
        "slug": "blog-11"
    },
    {
        "id": 11,
        "title": "blog 12",
        "slug": "blog-12"
    }
]

// store all posts in slice.
store.dispatch(setPosts(blogs))

store.dispatch(removePost(1))
store.dispatch(removePost(2))
store.dispatch(removePost(3))
store.dispatch(removePost(4))
store.dispatch(removePost(5))
store.dispatch(removePost(6))
store.dispatch(removePost(7))
store.dispatch(removePost(8))
store.dispatch(removePost(9))
store.dispatch(removePost(10))
store.dispatch(removePost(11))
```

### Output:

```jsx
[vite] connecting...
client.ts:173 [vite] connected.
main.jsx:42 redux state (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
main.jsx:42 redux state (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
main.jsx:42 redux state (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
main.jsx:42 redux state (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
main.jsx:42 redux state (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
main.jsx:42 redux state (6) [{…}, {…}, {…}, {…}, {…}, {…}]
main.jsx:42 redux state (5) [{…}, {…}, {…}, {…}, {…}]
main.jsx:42 redux state (4) [{…}, {…}, {…}, {…}]
main.jsx:42 redux state (3) [{…}, {…}, {…}]
main.jsx:42 redux state (2) [{…}, {…}]
main.jsx:42 redux state [{…}]
main.jsx:42 redux state []

```

# Now we use it in our Redux project.

---

### Our Project `store` root file

```jsx
import {configureStore} from "rsl-redux";
import authSlice from "./slices/authSlice.js";
import productSlice from "./slices/productSlice.js";
import cartSlice from "./slices/cartSlice.js";

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [productSlice.name]: productSlice.reducer,
        [cartSlice.name]: cartSlice.reducer
    }
})

export default store
```

# Slices

---

`authSlice.js`

### Auth slice to store auth related all state

```jsx
import { createSlice } from "rsl-redux";
import { 
	authVerifyAction, 
	createAccountAction, 
	deleteAddress, 
	deleteCustomer, 
	fetchAddresses, 
	fetchAdminCustomersProducts, 
	fetchCategoryWiseOrdersSlatsAction, 
	fetchDashboardSlatsAction, 
	fetchOrdersSlatsAction, 
	fetchOrdersSlatsSummaryAction,
	loginAction 
} from "../actions/authAction.js";

import { 
	deleteReview, 
	fetchCustomerReviews, 
	updateReviewAction
} from "../actions/reviewAction.js"
;
import { 
	deleteQuestionAnswer, 
	fetchCustomerQuestionAnswers, 
	updateQuestionAnswerAction 
} from "../actions/questionsAction.js";

const initialState = {
    auth: null,
    authLoaded: false,
    dashboardSlats: {
        "sales": [],
        "carts": [],
        "users": []
    },
    orderSlats: {},
    orderCategoryWiseSlats: {},
    dashboardSlatsSummary: {
        totalIncome: 0,
        totalSpend: 0,
        totalProducts: 0,
        totalUsers: 0,
        totalCategories: 0,
        totalOrders: 0
    },
    openSidebar: "",
    addresses: [],
    customerReviews: {},
    customerQuestions: {}
}

const authSlice = createSlice({
    name: 'authState',
    initialState,
    reducers: {
        setAuth(state, action) { state.auth = { ...action.payload } },
        logOut(state) { localStorage.removeItem("token"); state.auth = null },
        setSidebar(state, action) { state.openSidebar = action.payload }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.fulfilled, (state, action) => {...})
        builder.addCase(loginAction.rejected, (state, action) => {...})
        builder.addCase(fetchAdminCustomersProducts.fulfilled, (state, action) => {...})
        builder.addCase(deleteCustomer.fulfilled, (state, action) => {...})
        builder.addCase(fetchOrdersSlatsAction.fulfilled, (state, action) => {...})
        builder.addCase(fetchDashboardSlatsAction.fulfilled, (state, action) => {...})
        builder.addCase(fetchAddresses.fulfilled, (state, action) => {...})
        builder.addCase(deleteAddress.fulfilled, (state, action) => {...})
        builder.addCase(fetchCategoryWiseOrdersSlatsAction.fulfilled, (state, action) =>{...})
        builder.addCase(fetchOrdersSlatsSummaryAction.fulfilled, (state, action) => {...})
    }
});

export const { setAuth, logOut, setSidebar } = authSlice.actions;
export default authSlice;

```

`productSlice.js`

Store all products related state.

```jsx
// productSlice.js

const initialState = {
    showCategories: [], // Array<{name: string, slug: string, image: string}>
    homeProducts: {},
    products: [], // Array<Product>
    brands: [], // Array<Brand>
    specsMapping: {},
    categoryBrands: {}, // {[catSlug: string]: Brand[]}
    specs: {},
    wishlist: [],
    orders: {}, // {1: {items: Array<Orders>, count: number} }
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
            state.wishlist = state.wishlist.filter(item => item.productId !== action?.pyload)
        }

    },

    extraReducers: (builder) => {
				builder.addCase(fetchProducts.fulfilled, (state, action) => {...})
				builder.addCase(fetchWishlists.fulfilled, (state, action) => {...})
				builder.addCase(fetchOrdersAction.fulfilled, (state, action) => {...})
				builder.addCase(fetchAdminProducts.fulfilled, (state, action) => {...})
				builder.addCase(deleteBrand.fulfilled, (state, action) => {...})
				builder.addCase(deleteCategory.fulfilled, (state, action) => {...})
				
				// Reviews
				builder.addCase(fetchReviews.fulfilled, (state, action) => {...})
				builder.addCase(addReviewAction.fulfilled, (state, action) => {...})
				
				// Question and answers
				builder.addCase(fetchQuestionAnswers.fulfilled, (state, action) => {...})
				builder.addCase(addQuestionAnswerAction.fulfilled, (state, action) => {...})
    }
})

export const {removeFromWishlist, addToWishlist, setFilter} = productSlice.actions
export default productSlice

```

In **`productSlice.js`**, we handle the state related to products within our e-commerce application. This slice plays a crucial role in managing product data, including details, categories, brands, reviews, questionAnswers, product attributes and wishlist.

Asynchronous actions, managed through middleware like Redux Thunk or Redux Saga, handle tasks such as fetching product data from an API. You'll find action creators like **`fetchProducts`**, **`fetchBrands`**, **`fetchCategories`**, and **`fetchReviews`**, triggering API requests to update the Redux store with the retrieved data.

## Actions:

---

```jsx
actions/
│   ├── adminAction.js
│   ├── authAction.js
│   ├── cartAction.js
│   ├── categoryAction.js
│	  ├── productAction.js
│   ├── questionsAction.js
│   ├── reviewAction.js
│   └── wishlistAction.js
```

`authAction.js`

```jsx
// authAction.js
import {createAsyncAction} from "rsl-redux";
import {api} from "../../axios";
import catchErrorMessage from "../../utils/catchErrorMessage.js";

export const loginAction = createAsyncAction("auth-login", async function (payload) {...})

export const createAccountAction = createAsyncAction("create_account", async function (payload) {...})

export const fetchAddresses = createAsyncAction("fetchAddresses", async function () {...})
export const fetchCategoryWiseOrdersSlatsAction = createAsyncAction("fetchCategoryWiseOrdersSlatsAction", async function ({year, role, type}) {...})

export const fetchOrdersSlatsSummaryAction = createAsyncAction("fetchOrdersSlatsSummaryAction", async function ({role, taskList}) {...})

```

create our fetch posts and delete post  async actions

```jsx
// productAction.js

import {createAsyncAction} from "rsl-redux";
import {api} from "../../axios/index.js";
import catchErrorMessage from "../../utils/catchErrorMessage.js";

export const fetchProducts = createAsyncAction("fetch-products", async function (pageNumber) {...})
export const fetchOrdersAction = createAsyncAction("fetchOrdersAction", async function (pageNumber) {...})
export const searchProductAction = createAsyncAction("search-products", async function (text) {...})
export const deleteBrand = createAsyncAction("deleteBrand", async function (brandId) {...})

```

# Access Store State

---

Now we access store state and dispatch some actions.

```jsx
import React, {useEffect, useRef, useState} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "rsl-redux";
import Product from "../components/Product.jsx";
import {api} from "../axios/index.js";
import Breadcrumb from "../components/Breadcrumb.jsx";
import {FaAngleRight} from "react-icons/fa";
import Loader from "../components/Loader.jsx";
import {HiBars4} from "react-icons/hi2";
import {setSidebar} from "../store/slices/authSlice.js";
import {fetchAttributeSpec, fetchAttributeSpecMapping, fetchCategoryBrands} from "../store/actions/categoryAction.js";
import Popup from "../components/Popup.jsx";
import {setFilter} from "../store/slices/productSlice.js";

const SearchProduct = () => {
    const [getQuery] = useSearchParams()
    const {categoryName} = useParams()

    const filterObj = useRef({
        attributes: {}, brandIds: [],
        categoryIds: []

    })
    const {openSidebar} = useSelector(state => state.authState)

    const {categories, filter,  categoryBrands, specs} = useSelector(state => state.productState)

    const [expandAttributes, setExpandAttributes] = useState(["brand_id"])

    const [pagination] = useState({
        page: 1,
        totalPage: 10
    })

    const dispatch = useDispatch()

    let selectedCategory = categories.find(cat => cat.slug === categoryName)

    const [searchProuduct, setSearchProduct] = useState([])

    const text = getQuery.get("search")
    const [isSearching, setSearching] = useState(false)

    useEffect(() => {
        if (categoryName) {
            dispatch(fetchCategoryBrands(categoryName))
            dispatch(fetchAttributeSpec(categoryName))
            dispatch(fetchAttributeSpecMapping())
        }
    }, [categoryName]);

    useEffect(() => {
        dispatch(setFilter({
            categoryIds: categoryName ? [categoryName] : [],
            search: text,
        }))
    }, [categoryName, text])

    useEffect(() => {
        filterProduct(filter)
    }, [filter.attributes, filter.brandIds, filter.search])

    function filterProduct(filter) {...}
    
   
     return (
	       <div>...</div>
      )
}
```

Here use, dispatch some action

`dispatch(fetchCategoryBrands(categoryName))`
`dispatch(fetchAttributeSpec(categoryName))`
`dispatch(fetchAttributeSpecMapping())`

And access state using `useSelector`   hook.

`const {categories, filter,  categoryBrands, specs} = useSelector(state => state.productState)`

Check Example [Live example]

![SDF](https://github.com/rasel-mahmud-dev/rsl-redux/blob/main/example/public/22323.gif?raw=true)

https://rsl-redux-shop.netlify.app/

## Params
