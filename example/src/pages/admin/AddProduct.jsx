import React, {useEffect, useState} from 'react';
import {useSelector} from "rsl-redux";
import {attributes, categoryMap} from "../SearchProduct.jsx";
import {useParams} from "react-router-dom";
import {api} from "../../axios/index.js";
import Toast from "../../utils/toast.js";


const AddProduct = () => {

    const {categories, brands} = useSelector(state => state.productState)

    const {productId} = useParams()

    const [product, setProduct] = useState({
        attributesArray: [],
        title: '',
        slug: '',
        price: 0,
        stock: 0,
        discount: 0,
        cover_image: '',
        images: [],
        description: '',
        attributes: {},
        category_id: '',
        brand_id: '',
    });


    useEffect(() => {
        if (productId) {
            api.get("/products/single?_id=" + productId).then(r => {
                if (r.data) {
                    let updatedState = {}
                    for (let dataKey in r.data) {
                        if (Object.keys(product).includes(dataKey)) {
                            updatedState[dataKey] = r.data[dataKey]
                        }
                    }
                    setProduct(updatedState)
                }
            })
        }
    }, [productId]);


    useEffect(() => {
        if (product.category_id) {
            let a = categoryMap[product.category_id]
            handleChange({target: {name: "attributesArray", value: a}})
        }
    }, [product.category_id]);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    };

    const handleSubmit = async (e) => {

        try {
            e.preventDefault();
            if (productId) {
                await api.patch("/products/" + productId, product)
                return Toast.openSuccess("Product has been updated")
            }

            const r = await api.post("/products", [product])
            if (r.status === 201) return Toast.openSuccess("Product has been added")
        } catch (ex) {
            Toast.openError(ex?.message)
        }

    };

    function handleChangeAttribute(e) {
        const {name, value} = e.target
        setProduct(prev => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                [name]: value
            }
        }));
    }

    return (
        <div className="py-10 ">
            <h2 className="font-bold uppercase text-slate-900 text-xl mb-6">{productId ? "Update " : "Add "} Product</h2>
            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-2 gap-x-10">
                    <div>
                        <h4 className="font-semibold text-slate-900">Common</h4>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="">Title:</label>
                            <input className="rs-input" type="text" name="title" value={product.title}
                                   onChange={handleChange}/>
                        </div>
                        {productId && <div className="flex flex-col mb-3">
                            <label htmlFor="">Slug:</label>
                            <input className="rs-input" type="text" name="slug" value={product.slug}
                                   onChange={handleChange}/>
                        </div> }

                        <div className="flex flex-col mb-3">
                            <label htmlFor="">Price:</label>
                            <input className="rs-input" type="number" name="price" value={product.price}
                                   onChange={handleChange}/>
                        </div>

                        <div className="flex flex-col mb-3">
                            <label htmlFor="">Stock:</label>
                            <input className="rs-input" type="number" name="stock" value={product.stock}
                                   onChange={handleChange}/>
                        </div>

                        <div className="flex flex-col mb-3">
                            <label htmlFor="">Discount:</label>
                            <input className="rs-input" type="number" name="discount" value={product.discount}
                                   onChange={handleChange}/>
                        </div>

                        <div className="flex flex-col mb-3">
                            <label htmlFor="">Cover Image:</label>
                            <input className="rs-input" type="text" name="cover_image" value={product.cover_image}
                                   onChange={handleChange}/>
                        </div>

                        <div className="flex flex-col mb-3">
                            <label htmlFor="">Description:</label>
                            <textarea className="rs-input" name="description" value={product.description}
                                      onChange={handleChange}></textarea>
                        </div>

                    </div>
                    <div className="">

                        <div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="">Brand:</label>
                                <select className="rs-input" name="brand_id" id="" value={product.brand_id}
                                        onChange={handleChange}>
                                    <option value="">Select Brand</option>
                                    {brands.map(cat => (
                                        <option value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col mb-3">
                                <label htmlFor="">Category:</label>
                                <select className="rs-input" name="category_id" id="" value={product.category_id}
                                        onChange={handleChange}>
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        <h4 className="font-semibold text-slate-900">Attributes</h4>
                        {!product?.attributesArray?.length && (
                            <div>
                                Please select a category
                            </div>
                        )}
                        <div>
                            {product?.attributesArray?.map(attrName => (
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="">{attributes?.[attrName]?.label}</label>
                                    <select className="rs-input" value={product.attributes[attrName]} name={attrName}
                                            onChange={handleChangeAttribute}>
                                        <option value="">Select {attributes?.[attrName]?.label}</option>
                                        {attributes?.[attrName]?.options?.map(opt => (
                                            <option value={opt.value}>{opt.name}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                {/* Other input fields for price, stock, discount, cover_image, description, attributes, category_id, brand_id */}
                <button type="submit" className="primary-btn">{productId ? "Update " : "Add "} Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
