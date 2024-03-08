import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../../axios/index.js";
import Toast from "../../../utils/toast.js";
import Input from "../../../components/Form/Input.jsx";


const CreateAddress = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const [address, setAddress] = useState({
        address: '',
        apartmentSuit: '',
        city: '',
        country: '',
        firstName: '',
        lastName: '',
        phone: '',
        zipCode: '',
        state: '',
        email: ''
    });

    useEffect(() => {
        if (id) {
            api.get("/shipping-addresses/" + id).then(r => {
                if (r.data) {
                    let updatedState = {}
                    for (let dataKey in r.data) {
                        if (Object.keys(address).includes(dataKey)) {
                            updatedState[dataKey] = r.data[dataKey]
                        }
                    }
                    setAddress(updatedState)
                }
            })
        }
    }, [id]);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddress({...address, [name]: value});
    };


    const handleSubmit = async (e) => {

        try {
            e.preventDefault();
            if (id) {
                await api.patch("/shipping-addresses/" + id, address)
                Toast.openSuccess("Address has been updated")
            } else {
                await api.post("/shipping-addresses", address)
                Toast.openSuccess("Address has been added")
            }
            navigate("/dashboard/address-book")

        } catch (ex) {
            Toast.openError(ex?.message)
        }

    };

    return (
        <div className="py-10 container">
            <h2 className="font-bold uppercase text-slate-900 text-xl mb-6">{id ? "Update " : "Add "} Address</h2>
            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-2 gap-x-10">
                        <Input label="Address" id="address" name="address" value={address.address}
                               onChange={handleChange}/>
                        <Input label="Apartment Suit" id="apartmentSuit" name="apartmentSuit"
                               value={address.apartmentSuit} onChange={handleChange}/>
                        <Input label="City" id="city" name="city" value={address.city} onChange={handleChange}/>
                        <Input label="Country" id="country" name="country" value={address.country}
                               onChange={handleChange}/>
                        <Input label="First Name" id="firstName" name="firstName" value={address.firstName}
                               onChange={handleChange}/>
                        <Input label="Last Name" id="lastName" name="lastName" value={address.lastName}
                               onChange={handleChange}/>
                        <Input label="Phone" id="phone" name="phone" value={address.phone} onChange={handleChange}/>
                        <Input label="Zip Code" id="zipCode" name="zipCode" value={address.zipCode}
                               onChange={handleChange}/>
                        <Input label="State" id="state" name="state" value={address.state} onChange={handleChange}/>
                        <Input label="Email" id="email" name="email" value={address.email} onChange={handleChange}/>
                    </div>


                <button type="submit" className="primary-btn">{id ? "Update " : "Add "} Address</button>
            </form>
        </div>
    );
};

export default CreateAddress;
