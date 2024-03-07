import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import formatPrice from "../../utils/formatPrice.js";
import CommonTable from "../../components/Table.jsx";
import {deleteAdminProduct, fetchAdminProducts} from "../../store/actions/adminAction.js";
import {Link} from "react-router-dom";
import getAssetPath from "../../utils/getAssetPath.js";


const ProductList = () => {
    const {adminProducts} = useSelector(state => state.productState)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchAdminProducts())
    }, [])

    function handleDeleteItem(id){
        dispatch(deleteAdminProduct(id))
    }


    const columns = [
        {
            name: "Image", field: "coverImage", thClass: "!text-start w-20", tdClass: "!text-start w-20", render: (cover_image)=>(
                <div className="w-10">
                    <img src={getAssetPath(cover_image)} alt=""/>
                </div>
    )
        },
        {
            name: "title", field: "title", thClass: "!text-start", tdClass: "!text-start"
        },
        {name: "Price", field: "price", render: (v) => formatPrice(v)},
        {name: "Stock", field: "stock", render: (v) => formatPrice(v)},
        {name: "Discount", field: "discount"},
        {name: "Added On", field: "created_at", render: (v) => new Date(v).toDateString()},
        {
            name: "Action", field: "_id", render: (_id) => (
                <div className="flex items-center gap-x-5 px-6 justify-center font-medium text-sm break-keep">
                    <button
                            className={`border border-blue-600 bg-blue-600/10  text-blue-400   px-5 py-2 rounded-lg hover:text-white hover:bg-blue-600/60`}>
                        <Link to={`/admin/edit-product/${_id}`}>Edit</Link>
                    </button>
                    <button onClick={()=>handleDeleteItem(_id)}
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
                <h2 className="text-xl font-semibold">Product List</h2>
                <Link to={`/admin/add-product`}>
                    <button
                        className={`border border-blue-600 bg-blue-600/10  text-blue-400   px-5 py-2 rounded-lg hover:text-white hover:bg-blue-600/60`}>
                        Add new
                    </button>
                </Link>
            </div>

            <CommonTable className="employee-list-table mt-6" column={columns} data={adminProducts ? adminProducts : []}/>


        </div>
    );
};

export default ProductList;



