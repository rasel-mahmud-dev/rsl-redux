import React from 'react';
import Loader from "../Loader.jsx";

const ChartLoading = () => {
    return (
        <div>
            <div>
                <Loader
                    size="small"
                    title=""
                    className="flex justify-center items-center pl-0 md:pl-20 mt-4 md:mt-0"
                    titleClass="text-xs !font-semibold"
                />
            </div>
        </div>
    );
};

export default ChartLoading;