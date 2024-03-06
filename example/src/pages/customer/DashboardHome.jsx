
import React, {lazy, Suspense} from 'react';

const OrderStats = lazy(()=>import("../../components/Stats/OrderStats"));
const OrderByCategories = lazy(()=>import("../../components/Stats/OrderByCategories"));
const TotalIncome = lazy(()=>import("../../components/Stats/TotalIncome"));
const TotalOrder = lazy(()=>import("../../components/Stats/TotalOrder"));

const DashboardHome = () => {
    return (
        <div className="mt-3 ">

            <div className="flex gap-x-4 w-full">
                <div className="card bg-white w-full flex justify-center rounded-lg">
                    <Suspense fallback={<h1>Loading</h1>}>
                        <TotalIncome />
                    </Suspense>
                </div>

                <div className="card bg-white w-full flex justify-center rounded-lg">
                    <Suspense fallback={<h1>Loading</h1>}>
                        <TotalIncome />
                    </Suspense>
                </div>

                <div className="card bg-white w-full flex justify-center rounded-lg">
                    <Suspense fallback={<h1>Loading</h1>}>
                        <TotalIncome />
                    </Suspense>
                </div>
            </div>

            <div className="card bg-white mt-4 rounded-lg px-4">
                <Suspense fallback={<h1>Loading</h1>}>
                    <OrderStats />
                </Suspense>
            </div>

            <div className="card bg-white mt-4 rounded-lg px-4">
                <Suspense fallback={<h1>Loading</h1>}>
                    <OrderByCategories />
                </Suspense>
            </div>



        </div>
    );
};

export default DashboardHome;