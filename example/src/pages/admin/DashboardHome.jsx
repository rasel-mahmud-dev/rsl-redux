import React, {lazy, Suspense, useEffect, useMemo, useState} from 'react';
import {
    fetchCategoryWiseOrdersSlatsAction,
    fetchDashboardSlatsAction,
    fetchOrdersSlatsAction,
    fetchOrdersSlatsSummaryAction
} from "../../store/actions/authAction.js";
import {useDispatch, useSelector} from "rsl-redux";
import BarChart from "../../components/Stats/BarChart.jsx";
import formatPrice from "../../utils/formatPrice.js";
const OrderByCategories = lazy(() => import("../../components/Stats/OrderByCategories.jsx"));

const year = new Date().getFullYear()


const DashboardHome = () => {

    const {
        orderSlats,
        orderCategoryWiseSlats,
        dashboardSlats,
        auth,
        dashboardSlatsSummary
    } = useSelector(state => state.authState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOrdersSlatsAction({
            year,
            role: auth.role
        }))

        dispatch(fetchDashboardSlatsAction({
            year,
            role: auth.role
        }))

        dispatch(fetchCategoryWiseOrdersSlatsAction({
            year,
            role: auth.role,
            type: "categoryWise"
        }))
        dispatch(fetchOrdersSlatsSummaryAction({
            role: auth.role,
            taskList: [
                "totalIncome",
                "totalProducts"
            ]

        }))
    }, []);

    const {sales, users} = dashboardSlats

    const totalSales = useMemo(() => sales?.reduce((acc, cur) => acc + cur.totalSales, 0), [sales?.length])
    const totalOrders = useMemo(() => sales?.reduce((acc, cur) => acc + cur.count, 0), [sales?.length])
    const totalCustomer = useMemo(() => users?.reduce((acc, cur) => acc + cur.count, 0), [users?.length])


    return (
        <div className="mt-3 px-2 md:px-4 ">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 w-full">
                <div className=" !p-0 !m-0 bg-white rounded-lg">
                    <Suspense fallback={<h1>Loading</h1>}>
                        <BarChart bgColor="bg-blue-500/10"  countProperty="totalSales" label="All Earnings" items={sales}
                             totalValue={"TK." + formatPrice(totalSales)}/>
                    </Suspense>
                </div>

                <div className=" !p-0 !m-0 bg-white rounded-lg">
                    <Suspense fallback={<h1>Loading</h1>}>
                        <BarChart bgColor="bg-orange-500/10" countProperty="count" items={users} totalValue={totalCustomer} label="Customers"/>
                    </Suspense>
                </div>

                <div className=" !p-0 !m-0 bg-white rounded-lg">
                    <Suspense fallback={<h1>Loading</h1>}>
                        <BarChart bgColor="bg-green-500/10" countProperty="count" items={sales} totalValue={totalOrders} label="Orders"/>
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