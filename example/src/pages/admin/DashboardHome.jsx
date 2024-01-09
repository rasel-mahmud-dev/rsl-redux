import React, {lazy, Suspense} from 'react';
const OrderStats = lazy(()=>import("../../component/Stats/OrderStats"));
const OrderByCategories = lazy(()=>import("../../component/Stats/OrderByCategories"));

const DashboardHome = () => {
    return (
        <div>
            <div className="card">
                <Suspense fallback={<h1>Loading</h1>}>
                    <OrderStats />
                </Suspense>
            </div>

            <div className="card">
                <Suspense fallback={<h1>Loading</h1>}>
                    <OrderByCategories />
                </Suspense>
            </div>
        </div>
    );
};

export default DashboardHome;