// BrandForm.jsx

import React, {useEffect, useState} from 'react';
import {api} from "../../../axios/index.js";
import {useNavigate, useParams} from "react-router-dom";
import Toast from "../../../utils/toast.js";
import {fetchBrands} from "../../../store/actions/categoryAction.js";
import {useDispatch} from "rsl-redux";
import getAssetPath from "../../../utils/getAssetPath.js";
import Input from "../../../components/Form/Input.jsx";
import MultiInput from "../../../components/Form/MultiInput.jsx";
import MultiSelectInput from "../../../components/Form/MultiSelect.jsx";

const BrandForm = () => {


    const {brandId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [brand, setBrand] = useState({
        name: "",
        image: "",
        slug: "",
        categories: []
    });

    useEffect(() => {
        if (brandId) {
            api.get("/brands/single?_id=" + brandId).then(r => {
                if (r.data) {
                    let updatedState = {}
                    for (let dataKey in r.data) {
                        if (Object.keys(brand).includes(dataKey)) {
                            updatedState[dataKey] = r.data[dataKey]
                        }
                    }
                    setBrand(updatedState)
                }
            })
        }
    }, [brandId]);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setBrand(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (brandId) {
                let r = await api.patch("/brands/" + brandId, brand)
                if (r.status === 200) Toast.openSuccess("Brand has been updated")
            } else {
                let r = await api.post("/brands", [brand])
                if (r.status === 201) Toast.openSuccess("Brand has been added")
            }

            navigate("/admin/brands")

        } catch (ex) {
            Toast.openError(ex?.message)
        } finally {
            dispatch(fetchBrands())
        }

    };

    return (
        <div className="py-10 container">

            <h2 className="font-bold uppercase text-slate-900 text-xl mb-6">{brandId ? "Update " : "Add "} Brand</h2>


            <form onSubmit={handleSubmit} className="max-w-xl">

                <div>

                    <Input name="name" value={brand.name} onChange={handleChange} label="Name"/>

                    <Input readOnly={!!brandId} name="slug" value={brand.slug} onChange={handleChange} label="Slug"/>

                    <div className="flex flex-col mb-3">
                        <label htmlFor="">Image:</label>
                        <input className="rs-input" type="text" name="image" value={brand.image}
                               onChange={handleChange}/>
                    </div>

                    {brand?.image && <div className="w-20">
                        <img src={getAssetPath(brand?.image)} alt=""/>
                    </div>}


                    {/*<MultiInput*/}
                    {/*    defaultValues={brand.categories}*/}
                    {/*    placeholder="categories"*/}
                    {/*    name="categories"*/}
                    {/*    label="Categories"*/}
                    {/*    className="!flex-col"*/}
                    {/*    inputClass="!text-neutral-500"*/}
                    {/*    errorMessage=""*/}
                    {/*    labelClass="!mb-1"*/}
                    {/*    onChange={handleChange}*/}
                    {/*/>*/}

                    <MultiSelectInput
                        defaultValues={brand.categories}
                        placeholder="categories"
                        name="categories"
                        label="Categories"
                        className="!flex-col"
                        inputClass="!text-neutral-500"
                        errorMessage=""
                        labelClass="!mb-1"
                        onChange={handleChange}
                    />

                </div>

                <button
                    type="submit"
                    className="primary-btn"
                >{brandId ? "Update " : "Add "} Brand
                </button>
            </form>
        </div>
    );
};

export default BrandForm;
