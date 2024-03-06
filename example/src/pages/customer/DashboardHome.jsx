import React, {lazy, Suspense, useEffect} from 'react';
import {api} from "../../axios/index.js";
import {fetchOrdersSlatsAction, fetchOrdersSlatsSummaryAction} from "../../store/actions/authAction.js";

import {useDispatch, useSelector} from "rsl-redux";

const OrderStats = lazy(() => import("../../components/Stats/OrderStats"));
const OrderByCategories = lazy(() => import("../../components/Stats/OrderByCategories"));
const TotalIncome = lazy(() => import("../../components/Stats/TotalIncome"));
const TotalOrder = lazy(() => import("../../components/Stats/TotalOrder"));


const year = new Date().getFullYear()

const DashboardHome = () => {

    const {orderSlats, dashboardSlatsSummary}  = useSelector(state=>state.authState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOrdersSlatsAction({
            year,
            role: "customer"
        }))
        dispatch(fetchOrdersSlatsSummaryAction({
            role: "customer"
        }))
    }, []);


    return (
        <div className="mt-3 ">
            <h3 className="page-title mb-3">Customer Dashboard </h3>

            <div className="flex gap-x-4 w-full">
                <div className="card bg-white w-full flex justify-center rounded-lg">
                    <Suspense fallback={<h1>Loading</h1>}>
                        <TotalIncome value={dashboardSlatsSummary.totalSpend + " TK"} label="Spend" />
                    </Suspense>
                </div>

                <div className="card bg-white w-full flex justify-center rounded-lg">
                    <Suspense fallback={<h1>Loading</h1>}>
                        <TotalIncome label="Spend" />
                    </Suspense>
                </div>

                <div className="card bg-white w-full flex justify-center rounded-lg">
                    <Suspense fallback={<h1>Loading</h1>}>
                        <TotalIncome label="Spend" />
                    </Suspense>
                </div>
            </div>

            <div className="card bg-white mt-4 rounded-lg px-4">
                <Suspense fallback={<h1>Loading</h1>}>
                    <OrderStats year={year} items={orderSlats[year]}/>
                </Suspense>
            </div>

        </div>
    );
};

export default DashboardHome;