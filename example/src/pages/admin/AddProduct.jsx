import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../axios/index.js";
import Toast from "../../utils/toast.js";
import FileUpload from "../../components/FileUpload.jsx";
import {fetchCategoryBrands} from "../../store/actions/categoryAction.js";

const AddProduct = () => {

    const {categories, brands, categoryBrands, specsMapping, specs} = useSelector(state => state.productState)

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
        if (product?.categoryId) {

            let cat = categories.find(cat => cat.slug === product.categoryId)
            if (cat) {
                dispatch(fetchCategoryBrands(product?.categoryId))
                let a = specsMapping[cat.slug]
                handleChange({target: {name: "attributesArray", value: a}})
            }
        }
    }, [product?.categoryId, categories]);


    useEffect(() => {
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

            }).catch(ex => {
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
                if (r.status === 201) return Toast.openSuccess("Product has been added")

            }

            localStorage.removeItem("upload-temp")
            navigate("/admin/products")

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

    function getCategoryBrands() {
        return categoryBrands[product?.categoryId] ?? []
    }


    return (
        <div className="py-10 container">
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
                        </div>}

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
                            <label htmlFor="">Description:</label>
                            <textarea className="rs-input" name="description" value={product.description}
                                      onChange={handleChange}></textarea>
                        </div>

                        <div className="flex flex-col mb-3">
                            <label htmlFor="">Cover:</label>
                            <FileUpload className="rs-input "
                                        imagePreviewClass="w-24 aspect-square object-contain         "
                                        name="coverImage"
                                        value={product.coverImage}
                                        onChange={handleChange}/>
                        </div>

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
                                <label htmlFor="">Brand:</label>
                                <select className="rs-input" name="brandId" id="" value={product.brandId}
                                        onChange={handleChange}>
                                    <option value="">Select Brand</option>
                                    {getCategoryBrands().map(cat => (
                                        <option value={cat.slug}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col mb-3">
                                <label htmlFor="">Category:</label>
                                <select className="rs-input" name="categoryId" id="" value={product.categoryId}
                                        onChange={handleChange}>
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option value={cat.slug}>{cat.name}</option>
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
                                    <label htmlFor="">{specs?.[attrName]?.label}</label>
                                    <select className="rs-input" value={product.attributes[attrName]} name={attrName}
                                            onChange={handleChangeAttribute}>
                                        <option value="">Select {specs?.[attrName]?.label}</option>
                                        {specs?.[attrName]?.options?.map(opt => (
                                            <option value={opt.value}>{opt.name}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                {/* Other input fields for price, stock, discount, coverImage, description, attributes, categoryId, brandId */}
                <button type="submit" className="primary-btn">{productId ? "Update " : "Add "} Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
