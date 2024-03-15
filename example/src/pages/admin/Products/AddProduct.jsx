import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../../axios/index.js";
import Toast from "../../../utils/toast.js";
import FileUpload from "../../../components/FileUpload.jsx";
import {
    fetchAttributeSpec, fetchAttributeSpecMapping, fetchCategoryBrands
} from "../../../store/actions/categoryAction.js";
import Input from "../../../components/Form/Input.jsx";
import config from "../../../config/index.js";
import {imageExtensions} from "../../../utils/constant/extension.js";

const AddProduct = () => {

    const {categories, categoryBrands, specsMapping, specs} = useSelector(state => state.productState)

    const {productId} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [product, setProduct] = useState({
        attributesArray: [],
        title: '',
        slug: '',
        price: 0,
        stock: 0,
        discount: 0,
        coverImage: '',
        images: [],
        description: '',
        attributes: {},
        categoryId: '',
        brandId: '',
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
        const catSlug = product?.categoryId
        if (catSlug) {
            dispatch(fetchCategoryBrands(catSlug))
            dispatch(fetchAttributeSpec(catSlug))
        }
    }, [product?.categoryId]);


    useEffect(() => {
        const catSlug = product?.categoryId
        if (catSlug) {
            let specs = specsMapping[catSlug]
            if (specs) {
                handleChange({target: {name: "attributesArray", value: specs}})
            }
        }
    }, [product?.categoryId, specsMapping]);


    useEffect(() => {
        dispatch(fetchAttributeSpecMapping())
        let localPhoto = localStorage.getItem("upload-temp")
        if (localPhoto) {
            localPhoto = JSON.parse(localPhoto) ?? {}
            setProduct(prev => ({...prev, ...localPhoto}))
        }
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "coverImage") {
            return handleUploadImage(name, value)
        }
        setProduct({...product, [name]: value});
    };

    function handleUploadImage(name, value) {

        if (value.instanceOf === File) {
            return Toast.openError("Invalid file")
        }

        if (value.size > 500000) {
            return Toast.openError("file should be less than 500kb")
        }

        const formData = new FormData()
        formData.append(value.name, value)
        formData.append("fileName", value.name)

        api.post("/files/upload", formData)
            .then(({data}) => {
                if (data?.url) {
                    setProduct(prev => ({...prev, [name]: data.url}));
                    localStorage.setItem("upload-temp", JSON.stringify({[name]: data.url}))
                }

            }).catch(_ => {
            Toast.openError("Image save fail")
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (productId) {
                await api.patch("/products/" + productId, product)
                Toast.openSuccess("Product has been updated")
            } else {
                const r = await api.post("/products", [product])
                if (r.status === 201) Toast.openSuccess("Product has been added")
            }

            localStorage.removeItem("upload-temp")
            config.PROD && navigate("/admin/products")

        } catch (ex) {
            Toast.openError(ex?.message)
        }
    };

    const categorySpecs = specs[product.categoryId] || {}

    function handleChangeAttribute(e) {
        const {name, value} = e.target
        setProduct(prev => ({
            ...prev, attributes: {
                ...prev.attributes, [name]: value
            }
        }));
    }

    const categoryBrandsLists = categoryBrands[product?.categoryId] ?? []


    return (<div className="py-10 container">
            <h2 className="font-bold uppercase text-slate-900 text-xl mb-6">{productId ? "Update " : "Add "} Product</h2>
            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-2 gap-x-10">
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Common</h4>

                        <Input label="Title" value={product.title} name="title" onChange={handleChange}/>

                        {productId && <Input label="Slug" value={product.slug} name="slug" onChange={handleChange}/>}

                        <Input label="Price" type="number" value={product.price} name="price" onChange={handleChange}/>
                        <Input label="Stock" type="number" value={product.stock} name="stock" onChange={handleChange}/>
                        <Input label="Discount" type="number" value={product.discount} name="discount"
                               onChange={handleChange}/>

                        <Input label="Description" type="textarea" value={product.description} name="description"
                               onChange={handleChange}/>


                        <div className="flex flex-col mb-3">
                            <FileUpload
                                label="Cover:"
                                mimeType={imageExtensions}
                                resize={{
                                    maxWidth: 250,
                                    maxHeight: 250,
                                    quality: 0.9,
                                }}
                                placeholder="Choose cover photo"
                                inputClass="text-gray-500 "
                                imagePreviewClass="w-24 aspect-square object-contain         "
                                name="coverImage"
                                value={product.coverImage}
                                onChange={handleChange}
                            />
                        </div>
                        <h4 className="mb-3 font-semibold text-sm">Or</h4>
                        <Input label="Link"
                               value={product.coverImage}
                               name="coverImage"
                               onChange={(e) => setProduct(p => ({
                                   ...p, coverImage: e.target.value
                               }))}
                        />

                    </div>
                    <div className="mt-5">

                        <div>

                            {/*<div className="flex flex-col mb-3">*/}
                            {/*    <label htmlFor="">Cover Image:</label>*/}
                            {/*    <input className="rs-input" type="text" name="coverImage" value={product?.coverImage}*/}
                            {/*           onChange={handleChange}/>*/}
                            {/*</div>*/}

                            {/*{product?.coverImage && <div className="w-20">*/}
                            {/*    <img src={getAssetPath(product?.coverImage)} alt=""/>*/}
                            {/*</div> }*/}


                            <div className="flex flex-col mb-3">
                                <label htmlFor="brandId">Brand:</label>
                                <select className="rs-input" name="brandId" id="brandId" value={product.brandId}
                                        onChange={handleChange}>

                                    <option value="">Select Brand</option>

                                    {categoryBrandsLists?.map(cat => (<option value={cat.slug}>{cat.name}</option>))}

                                </select>
                            </div>

                            <div className="flex flex-col mb-3">
                                <label htmlFor="">Category:</label>
                                <select className="rs-input" name="categoryId" id="" value={product.categoryId}
                                        onChange={handleChange}>
                                    <option value="">Select Category</option>
                                    {categories?.map(cat => (<option value={cat.slug}>{cat.name}</option>))}
                                </select>
                            </div>
                        </div>


                        <h4 className="font-semibold text-slate-900">Attributes</h4>
                        {!product?.attributesArray?.length && (<div>
                                Please select a category
                            </div>)}
                        <div>
                            {product?.attributesArray?.map(attrName => (<div className="flex flex-col mb-3">
                                    <label htmlFor="">{categorySpecs?.[attrName]?.label}</label>
                                    <select className="rs-input" value={product.attributes[attrName]} name={attrName}
                                            onChange={handleChangeAttribute}>
                                        <option value="">Select {categorySpecs?.[attrName]?.label}</option>
                                        {categorySpecs?.[attrName]?.options?.map(opt => (
                                            <option value={opt.value}>{opt.name}</option>))}
                                    </select>
                                </div>))}
                        </div>
                    </div>
                </div>


                {/* Other input fields for price, stock, discount, coverImage, description, attributes, categoryId, brandId */}
                <button type="submit" className="primary-btn">{productId ? "Update " : "Add "} Product</button>
            </form>
        </div>);
};

export default AddProduct;
