import React from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import CommonTable from "../../component/Table.jsx";

import {Link} from "react-router-dom";


const BrandList = () => {
    const {brands} = useSelector(state => state.productState)

    const dispatch = useDispatch()

    const columns = [
        {
            name: "Name", field: "name", thClass: "!text-start", tdClass: "!text-start"
        },
        {name: "Added On", field: "created_at", render: (v) => new Date(v).toDateString()},
        {
            name: "Action", field: "_id", render: (_id) => (
                <div className="flex items-center gap-x-5 px-6 justify-center font-medium text-sm break-keep">
                    <button
                            className={`border border-blue-600 bg-blue-600/10  text-blue-400   px-5 py-2 rounded-lg hover:text-white hover:bg-blue-600/60`}>
                        <Link to={`/admin/edit-brand/${_id}`}>Edit</Link>
                    </button>
                    <button
                            className={`border border-orange-600 bg-orange-600/10 text-orange-600 px-5 py-2 rounded-lg hover:bg-orange-600/50`}>
                        Delete
                    </button>
                </div>
            )
        },
    ]

    return (
        <div className="py-6">

            <h2 className="text-xl font-semibold">Brand List</h2>

            <CommonTable className="employee-list-table mt-6" column={columns} data={brands ? brands : []}/>


        </div>
    );
};

export default BrandList;



