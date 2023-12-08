
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import formatPrice from "../../utils/formatPrice.js";
import CommonTable from "../../component/Table.jsx";
import {fetchAdminProducts} from "../../store/actions/adminAction.js";


const ProductList = () => {
    const {adminProducts} = useSelector(state => state.prodcutsState)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchAdminProducts())
    }, [])


    const columns = [
        {
            name: "title", field: "title"
        },
        {name: "Price", field: "price", render: (v) => formatPrice(v)},
        {name: "Stock", field: "stock", render: (v) => formatPrice(v)},
        {name: "Discount", field: "discount"},
        {name: "Added On", field: "created_at", render: (v) => new Date(v).toDateString()},
        {
            name: "Action", field: "quantity", render: (quantity, item) => (
                <div className="flex justify-center items-center gap-x-3">

                </div>
            )
        },
    ]

    console.log(carts)
    return (
        <div className="py-6">

            <h2 className="text-xl font-semibold">My Carts</h2>

            <CommonTable className="employee-list-table mt-6" column={columns} data={carts ? carts : []}/>


        </div>
    );
};

export default ProductList;



