import React, {lazy, Suspense, useEffect, useMemo} from 'react';
import {
    fetchCartsSlatsAction,
    fetchCategoryWiseOrdersSlatsAction, fetchDashboardSlatsAction,
    fetchOrdersSlatsSummaryAction
} from "../../store/actions/authAction.js";

import {useDispatch, useSelector} from "rsl-redux";
import BarChart from "../../components/Stats/BarChart.jsx";
import formatPrice from "../../utils/formatPrice.js";
import ChartLoading from "../../components/Stats/ChartLoading.jsx";

const OrderByCategories = lazy(() => import("../../components/Stats/OrderByCategories.jsx"));


const year = new Date().getFullYear()

const DashboardHome = () => {

    const {orderCategoryWiseSlats, dashboardSlats} = useSelector(state => state.authState)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDashboardSlatsAction({
            year,
            role: "customer",
            taskList: [
                "cartCount",
            ]
        }))
        dispatch(fetchCartsSlatsAction({
            year,
            role: "customer",
        }))
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


    const {sales,  carts} = dashboardSlats

    const totalSales = useMemo(() => sales?.reduce((acc, cur) => acc + cur.totalSales, 0), [sales?.length])
    const totalOrders = useMemo(() => sales?.reduce((acc, cur) => acc + cur.count, 0), [sales?.length])
    const totalCarts = useMemo(() => carts?.reduce((acc, cur) => acc + cur.count, 0), [carts?.length])

    return (
        <div className="mt-3 ">
            <h3 className="page-title mb-3">Customer Dashboard </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 w-full">
                <div className=" !p-0 !m-0 bg-white rounded-lg">
                    <Suspense fallback={<ChartLoading/>}>
                        <BarChart bgColor="bg-blue-500/10" countProperty="totalSales" label="Order amount" items={sales}
                                  totalValue={"TK." + formatPrice(totalSales)}/>
                    </Suspense>
                </div>

                <div className=" !p-0 !m-0 bg-white rounded-lg">
                    <Suspense fallback={<ChartLoading/>}>
                        <BarChart bgColor="bg-orange-500/10" countProperty="count" items={carts}
                                  totalValue={totalCarts} label="Carts"/>
                    </Suspense>
                </div>

                <div className=" !p-0 !m-0 bg-white rounded-lg">
                    <Suspense fallback={<ChartLoading/>}>
                        <BarChart bgColor="bg-green-500/10" countProperty="count" items={sales} totalValue={totalOrders}
                                  label="Orders"/>
                    </Suspense>
                </div>
            </div>


            <div className="card bg-white mt-4 rounded-lg px-4">
                <Suspense fallback={<ChartLoading/>}>
                    <OrderByCategories label="Orders" year={year} items={orderCategoryWiseSlats[year]}/>
                </Suspense>
            </div>

            <div className="card bg-white mt-2 md:mt-4 rounded-lg px-4">
                <Suspense fallback={<ChartLoading/>}>
                    <OrderByCategories label="Orders Count" type="quantity" year={year}
                                       items={orderCategoryWiseSlats[year]}/>
                    {/*<OrderStats label="Sales Count" year={year} items={orderSlats[year]}/>*/}
                </Suspense>
            </div>

        </div>
    );
};

export default DashboardHome;