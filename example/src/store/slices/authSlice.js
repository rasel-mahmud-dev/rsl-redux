import {createSlice} from "rsl-redux";
import {
    authVerifyAction,
    createAccountAction, deleteAddress, deleteCustomer, fetchAddresses, fetchAdminCustomersProducts,
    fetchCategoryWiseOrdersSlatsAction,
    fetchDashboardSlatsAction,
    fetchOrdersSlatsAction,
    fetchOrdersSlatsSummaryAction,
    loginAction
} from "../actions/authAction.js";
import {deleteReview, fetchCustomerReviews, updateReviewAction} from "../actions/reviewAction.js";
import {
    deleteQuestionAnswer,
    fetchCustomerQuestionAnswers,
    updateQuestionAnswerAction
} from "../actions/questionsAction.js";

const initialState = {
    auth: null,
    authLoaded: false,
    testAuth: {},
    dashboardSlats: {
        "sales": [
            // {
            //     "totalSales": 0,
            //     "count": 0,
            //     "month": 0
            // }
        ],
        "carts": [],
        "users": [
            // {
            //     "count": 0,
            //     "month": 0
            // }
        ]
    },
    orderSlats: {}, // {2022: Array<{_id, price, quantity} }
    orderCategoryWiseSlats: {}, // {2022: Array<{_id, price, quantity} }
    dashboardSlatsSummary: {
        totalIncome: 0,
        totalSpend: 0,
        totalProducts: 0,
        totalUsers: 0,
        totalCategories: 0,
        totalOrders: 0
    },
    openSidebar: "",
    customers: [],
    addresses: [],
    customerReviews: [],
    customerQuestions: []
}

const authSlice = createSlice({
    name: 'authState',
    initialState,
    reducers: {
        setAuth(state, action) {
            state.auth = {
                ...action.payload
            }
        },
        logOut(state) {
            localStorage.removeItem("token")
            state.auth = null
        },
        setSidebar(state, action) {
            state.openSidebar = action.payload
        }
    },

    extraReducers: (builder) => {

        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.auth = action.payload.user
            state.authLoaded = true
            localStorage.setItem('token', action.payload.token)
        })


        builder.addCase(loginAction.rejected, (state, action) => {
            state.auth = null
            state.authLoaded = true
        })


        builder.addCase(fetchAdminCustomersProducts.fulfilled, (state, action) => {
            state.customers = action.payload
        })


        builder.addCase(deleteCustomer.fulfilled, (state, action) => {
            state.customers = state.customers.filter(cus => cus._id !== action.payload)
        })


        builder.addCase(fetchOrdersSlatsAction.fulfilled, (state, action) => {
            const {year, items} = action.payload
            state.orderSlats[year] = items
        })


        builder.addCase(fetchDashboardSlatsAction.fulfilled, (state, action) => {
            state.dashboardSlats = action.payload
        })


        builder.addCase(fetchAddresses.fulfilled, (state, action) => {
            state.addresses = action.payload
        })

        builder.addCase(deleteAddress.fulfilled, (state, action) => {
            state.addresses = state.addresses.filter(ad => ad._id !== action.payload)
        })

        builder.addCase(fetchCategoryWiseOrdersSlatsAction.fulfilled, (state, action) => {
            const {year, items} = action.payload
            state.orderCategoryWiseSlats[year] = items
        })


        builder.addCase(fetchOrdersSlatsSummaryAction.fulfilled, (state, action) => {
            state.dashboardSlatsSummary = {
                ...state.dashboardSlatsSummary,
                ...action.payload
            }
        })

        builder.addCase(createAccountAction.fulfilled, (state, action) => {
            state.auth = action.payload.user
            localStorage.setItem('token', action.payload.token)
        })

        builder.addCase(authVerifyAction.fulfilled, (state, action) => {
            state.auth = action.payload.user
            state.authLoaded = true
        })
        builder.addCase(authVerifyAction.rejected, (state) => {
            state.auth = null
            state.authLoaded = true
        })


        // reviews
        builder.addCase(fetchCustomerReviews.fulfilled, (state, action) => {
            state.customerReviews = action.payload
        })

        builder.addCase(updateReviewAction.fulfilled, (state, action) => {
            const {_id, data} = action.payload
            let customerReviews = [...state.customerReviews]
            let index = customerReviews.findIndex(r => r._id === _id)
            if (index !== -1) {
                customerReviews[index] = {
                    ...customerReviews[index],
                    ...data
                }
                state.customerReviews = customerReviews
            }
        })

        builder.addCase(deleteReview.fulfilled, (state, action) => {
            let customerReviews = [...state.customerReviews]
            state.customerReviews = customerReviews.filter(r => r._id !== action.payload)
        })


        // question and answers

        builder.addCase(fetchCustomerQuestionAnswers.fulfilled, (state, action) => {
            state.customerQuestions = action.payload
        })

        builder.addCase(updateQuestionAnswerAction.fulfilled, (state, action) => {
            const {_id, data} = action.payload
            let customerQuestions = [...state.customerQuestions]
            let index = customerQuestions.findIndex(r => r._id === _id)
            if (index !== -1) {
                customerQuestions[index] = {
                    ...customerQuestions[index],
                    ...data
                }
                state.customerQuestions = customerQuestions
            }
        })

        builder.addCase(deleteQuestionAnswer.fulfilled, (state, action) => {
            let customerQuestions = [...state.customerQuestions]
            state.customerQuestions = customerQuestions.filter(r => r._id !== action.payload)
        })

    }
})

export const {setAuth, logOut, setSidebar} = authSlice.actions
export default authSlice