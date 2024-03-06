import React, {lazy, Suspense, useEffect} from 'react';
import {fetchOrdersSlatsAction, fetchOrdersSlatsSummaryAction} from "../../store/actions/authAction.js";
import {useDispatch, useSelector} from "rsl-redux";

const OrderStats = lazy(()=>import("../../components/Stats/OrderStats"));
const OrderByCategories = lazy(()=>import("../../components/Stats/OrderByCategories"));
const TotalIncome = lazy(()=>import("../../components/Stats/TotalIncome"));
const TotalOrder = lazy(()=>import("../../components/Stats/TotalOrder"));

const year = new Date().getFullYear()


const DashboardHome = () => {

    const {orderSlats, auth, dashboardSlatsSummary}  = useSelector(state=>state.authState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOrdersSlatsAction({
            year,
            role: auth.role
        }))
        dispatch(fetchOrdersSlatsSummaryAction({
            role: auth.role,
            taskList: [
                "totalIncome",
                "totalProducts"
            ]

        }))
    }, []);


    return (
        <div className="mt-3 ">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 w-full">
                <div className="card bg-white w-full flex justify-center rounded-lg">
                    <Suspense fallback={<h1>Loading</h1>}>
                        <TotalIncome value={dashboardSlatsSummary.totalIncome + " TK"} label="Sales"/>
                    </Suspense>
                </div>

                <div className="card bg-white w-full flex justify-center rounded-lg">
                    <Suspense fallback={<h1>Loading</h1>}>
                        <TotalIncome label="Sales"/>
                    </Suspense>
                </div>

                <div className="card bg-white w-full flex justify-center rounded-lg">
                    <Suspense fallback={<h1>Loading</h1>}>
                        <TotalIncome label="Sales"/>
                    </Suspense>
                </div>
            </div>

            <div className="card bg-white mt-2 md:mt-4 rounded-lg px-4">
                <Suspense fallback={<h1>Loading</h1>}>
                    <OrderStats label="Sales" year={year} items={orderSlats[year]}/>
                </Suspense>
            </div>

            <div className="card bg-white mt-4 rounded-lg px-4">
                <Suspense fallback={<h1>Loading</h1>}>
                    <OrderByCategories/>
                </Suspense>
            </div>


        </div>
    );
};

export default DashboardHome;