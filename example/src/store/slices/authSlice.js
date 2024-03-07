import {createSlice} from "rsl-redux";
import {
    authVerifyAction,
    createAccountAction,
    fetchCategoryWiseOrdersSlatsAction,
    fetchDashboardSlatsAction,
    fetchOrdersSlatsAction,
    fetchOrdersSlatsSummaryAction,
    loginAction
} from "../actions/authAction.js";

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
        totalCategories: 0
    },
    openSidebar: ""
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


        builder.addCase(fetchOrdersSlatsAction.fulfilled, (state, action) => {
            const {year, items} = action.payload
            state.orderSlats[year] = items
        })


        builder.addCase(fetchDashboardSlatsAction.fulfilled, (state, action) => {
            state.dashboardSlats = action.payload
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
    }
})

export const {setAuth, logOut, setSidebar} = authSlice.actions
export default authSlice