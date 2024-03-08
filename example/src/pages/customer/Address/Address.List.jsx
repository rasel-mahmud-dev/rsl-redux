import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import {deleteAddress, fetchAddresses} from "../../../store/actions/authAction.js";
import {Link} from "react-router-dom";
import Toast from "../../../utils/toast.js";

const AddressList = ({addresses, onDelete}) => {
    return (
        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
            {addresses.map((address, index) => (
                <div key={index} className="address-item bg-primary-500-01 p-4 rounded-lg">

                    <div className="flex items-center justify-between">
                        <div>{address.firstName} {address.lastName}</div>
                        <div className="flex items-center gap-x-1">
                            <button onClick={() => onDelete(address._id)}
                                    className="btn btn-outline outline-sm text-xs">Delete
                            </button>
                            <Link to={`/dashboard/address-book/update/${address._id}`}>
                                <button className="btn btn-outline outline-sm text-xs">Edit</button>
                            </Link>
                        </div>
                    </div>
                    <div>{address.phone}</div>
                    <div>{address.city}, {address.state}, {address.country}, {address.zipCode}</div>
                    <div>{address.address}</div>
                    <div>{address.type}</div>
                    <div>{address.defaultDelivery ? 'DEFAULT DELIVERY ADDRESS' : ''}</div>
                    <div>{address.defaultBilling ? 'DEFAULT BILLING ADDRESS' : ''}</div>
                </div>
            ))}
        </div>
    );
};

export default function () {

    const {addresses} = useSelector(state => state.authState)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAddresses())
    }, []);

    function handleDelete(id) {
        dispatch(deleteAddress(id)).unwrap().then(() => {
            Toast.openSuccess("Shipping address deleted")
        }).catch(ex => {
            Toast.openError(ex?.message)
        })
    }

    return (
        <div className="py-6 px-2 md:px-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Address List ({addresses?.length})</h2>

                <Link to={`/dashboard/address-book/new`}>
                    <button
                        className={`btn btn-outline px-5 py-2 `}>
                        Add new
                    </button>
                </Link>


            </div>
            <div className="mt-4">
                <AddressList onDelete={handleDelete} addresses={addresses}/>

            </div>
        </div>

    )
};
