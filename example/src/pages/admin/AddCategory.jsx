// CategoryForm.jsx

import React, {useEffect, useState} from 'react';
import {api} from "../../axios/index.js";
import {useParams} from "react-router-dom";
import Toast from "../../utils/toast.js";
import {fetchBrands, fetchCategories} from "../../store/actions/categoryAction.js";
import {useDispatch} from "rsl-redux";
import getAssetPath from "../../utils/getAssetPath.js";

const CategoryForm = () => {
    const {categoryId} = useParams()

    const dispatch = useDispatch()

    const [category, setCategory] = useState({
        name: "",
        image: "",
        slug: ""
    });

    useEffect(() => {
        if (categoryId) {
            api.get("/categories/single?_id=" + categoryId).then(r => {
                if (r.data) {
                    let updatedState = {}
                    for (let dataKey in r.data) {
                        if (Object.keys(category).includes(dataKey)) {
                            updatedState[dataKey] = r.data[dataKey]
                        }
                    }
                    setCategory(updatedState)
                }
            })
        }
    }, [categoryId]);


    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(value)
        setCategory(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (categoryId) {
                let r = await api.patch("/categories/" + categoryId, category)
                if (r.status === 200) return Toast.openSuccess("Category has been updated")
            }

            let r = await api.post("/categories", [category])
            if (r.status === 201) return Toast.openSuccess("Category has been added")

        } catch (ex) {
            Toast.openError(ex?.message)
        }  finally {
            dispatch(fetchCategories())
        }

    };

    function handleLoadError(e){
        console.log(e)
    }

    return (
        <div className="py-10 ">
            <h2 className="font-bold uppercase text-slate-900 text-xl mb-6">{categoryId ? "Update " : "Add "} Category</h2>


            <form onSubmit={handleSubmit} className="max-w-xl">

                <div>

                    <div className="flex flex-col mb-3">
                        <label htmlFor="">Name:</label>
                        <input className="rs-input" type="text" name="name" value={category.name}
                               onChange={handleChange}/>
                    </div>

                    {categoryId && (
                        <div className="flex flex-col mb-3">
                            <label htmlFor="">Slug:</label>
                            <input className="rs-input" type="text" name="slug" value={category?.slug}
                                   onChange={handleChange}/>
                        </div>
                    )}

                    <div className="flex flex-col mb-3">
                        <label htmlFor="">Image:</label>
                        <input className="rs-input" type="text" name="image" value={category?.image}
                               onChange={handleChange}/>
                    </div>

                    {category?.image && getAssetPath(category?.image) && <div className="w-20">
                        <img onError={handleLoadError} src={getAssetPath(category?.image) ?? ""} alt=""/>
                    </div> }


                </div>

                <button
                    type="submit"
                    className="primary-btn"
                >{categoryId ? "Update " : "Add "} Category
                </button>
            </form>
        </div>
    );
};

export default CategoryForm;
