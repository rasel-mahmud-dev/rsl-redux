import React, {lazy, Suspense, useEffect} from 'react';
import {api} from "../../axios/index.js";
import {
    fetchCategoryWiseOrdersSlatsAction,
    fetchOrdersSlatsAction,
    fetchOrdersSlatsSummaryAction
} from "../../store/actions/authAction.js";

import {useDispatch, useSelector} from "rsl-redux";

const OrderStats = lazy(() => import("../../components/Stats/OrderStats"));
const OrderByCategories = lazy(() => import("../../components/Stats/OrderByCategories.jsx"));
const TotalIncome = lazy(() => import("../../components/Stats/TotalIncome"));


const year = new Date().getFullYear()

const DashboardHome = () => {

    const {orderCategoryWiseSlats, auth, dashboardSlatsSummary}  = useSelector(state=>state.authState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategoryWiseOrdersSlatsAction({
            year,
            role: "customer",
            type: "categoryWise"
        }))
        dispatch(fetchOrdersSlatsSummaryAction({
            role: "customer",
            taskList: [
                "totalIncome",
                "totalProducts"
            ]
        }))
    }, []);


    return (
        <div className="mt-3 ">
            <h3 className="page-title mb-3">Customer Dashboard </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
                <div className="card bg-white w-full flex justify-center rounded-lg">
                    <Suspense fallback={<h1>Loading</h1>}>
                        <TotalIncome value={dashboardSlatsSummary.totalSpend + " TK"} label="Spend"/>
                    </Suspense>
                </div>

                <div className="card bg-white w-full flex justify-center rounded-lg">
                    <Suspense fallback={<h1>Loading</h1>}>
                        <TotalIncome label="Spend"/>
                    </Suspense>
                </div>

                <div className="card bg-white w-full flex justify-center rounded-lg">
                    <Suspense fallback={<h1>Loading</h1>}>
                        <TotalIncome label="Spend"/>
                    </Suspense>
                </div>
            </div>

            <div className="card bg-white mt-4 rounded-lg px-4">
                <Suspense fallback={<h1>Loading</h1>}>
                    <OrderByCategories label="Sales" year={year} items={orderCategoryWiseSlats[year]}/>
                </Suspense>
            </div>

            <div className="card bg-white mt-2 md:mt-4 rounded-lg px-4">
                <Suspense fallback={<h1>Loading</h1>}>
                    <OrderByCategories label="Sales Count" type="quantity" year={year}
                                       items={orderCategoryWiseSlats[year]}/>
                    {/*<OrderStats label="Sales Count" year={year} items={orderSlats[year]}/>*/}
                </Suspense>
            </div>

        </div>
    );
};

export default DashboardHome;