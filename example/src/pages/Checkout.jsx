import React, {useEffect, useState} from 'react';

import {Link} from "react-router-dom";

const Checkout = () => {

    const [selectedCartItems, setSelectedCartItems] = useState([])

    useEffect(()=>{
        const items = localStorage.getItem("selected-carts")
        const el = JSON.parse(items)
        setSelectedCartItems(el)
    }, [])


    function orderNow() {
        console.log(selectedCartItems)
    }


    return (
        <div>
            <div className="py-6">

                <h2 className="text-xl font-semibold">Checkout</h2>


                <div className="py-20">
                    <button onClick={orderNow} className="primary-btn bg-pi">Order</button>
                </div>


                <div className="flex justify-between items-center">
                    <Link to="/carts" className="text-neutral-800">
                        <button className="primary-btn">Back to Cart</button>
                    </Link>
                    <button className="primary-btn bg-pi">Checkout</button>
                </div>

            </div>

        </div>
    );
};

export default Checkout;