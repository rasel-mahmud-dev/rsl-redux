import React from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import CommonTable from "../../component/Table.jsx";
import {Link} from "react-router-dom";
import {deleteCategory} from "../../store/actions/categoryAction.js";
import getAssetPath from "../../utils/getAssetPath.js";


const ProductList = () => {
    const {categories} = useSelector(state => state.productState)

    const dispatch = useDispatch()

    function handleDeleteItem(id) {
        dispatch(deleteCategory(id))
    }

    const columns = [
        {
            name: "Image", field: "image", thClass: "!text-start w-20", tdClass: "!text-start w-20", render: (image)=>(
                <div className="w-10">
                    <img src={getAssetPath(image)} alt=""/>
                </div>
            )
        },
        {
            name: "Name", field: "name", thClass: "!text-start", tdClass: "!text-start"
        },
        {
            name: "Slug", field: "slug", thClass: "!text-start", tdClass: "!text-start"
        },
        {name: "Added On", field: "created_at", render: (v) => new Date(v).toDateString()},
        {
            name: "Action", field: "_id", render: (_id) => (
                <div className="flex items-center gap-x-5 px-6 justify-center font-medium text-sm break-keep">
                    <button
                        className={`border border-blue-600 bg-blue-600/10  text-blue-400   px-5 py-2 rounded-lg hover:text-white hover:bg-blue-600/60`}>
                        <Link to={`/admin/edit-category/${_id}`}>Edit</Link>
                    </button>
                    <button onClick={() => handleDeleteItem(_id)}
                            className={`border border-orange-600 bg-orange-600/10 text-orange-600 px-5 py-2 rounded-lg hover:bg-orange-600/50`}>
                        Delete
                    </button>
                </div>
            )
        },
    ]

    return (
        <div className="py-6">

            <div className="flex justify-between">
                <h2 className="text-xl font-semibold">Category List</h2>
                <Link to={`/admin/add-category`}>
                    <button
                        className={`border border-blue-600 bg-blue-600/10  text-blue-400   px-5 py-2 rounded-lg hover:text-white hover:bg-blue-600/60`}>
                        Add new
                    </button>
                </Link>
            </div>



            <CommonTable className="employee-list-table mt-6" column={columns} data={categories ? categories : []}/>


        </div>
    );
};

export default ProductList;



