import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../../axios/index.js";
import Toast from "../../../utils/toast.js";
import FileUpload from "../../../components/FileUpload.jsx";


const AddUser = () => {

    const {customerId} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [product, setProduct] = useState({
        username: '',
        email: '',
        password: "",
        avatar: ''
    });

    useEffect(() => {
        if (customerId) {
            api.get("/auth/customers/" + customerId).then(r => {
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
    }, [customerId]);


    useEffect(() => {
        let localPhoto = localStorage.getItem("upload-temp")
        if (localPhoto) {
            localPhoto = JSON.parse(localPhoto) ?? {}
            setProduct(prev => ({...prev, ...localPhoto}))
        }
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "avatar") {
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
            if (customerId) {
                await api.patch("/auth/customers/" + customerId, product)
                navigate("/admin/customers")
                return Toast.openSuccess("Account has been updated")
            }

            await api.post("/auth/customers", [product])
            Toast.openSuccess("Account has been added")

            navigate("/admin/customers")

        } catch (ex) {
            Toast.openError(ex?.message)
        }

    };

    return (
        <div className="py-10 container">
            <h2 className="font-bold uppercase text-slate-900 text-xl mb-6">{customerId ? "Update " : "Add "} Account</h2>
            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-2 gap-x-10">
                    <div>
                        <h4 className="font-semibold text-slate-900">General Information</h4>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="">Username:</label>
                            <input className="rs-input" type="text" name="username" value={product.username}
                                   onChange={handleChange}/>
                        </div>

                        <div className="flex flex-col mb-3">
                            <label htmlFor="">Email:</label>
                            <input className="rs-input" type="email" name="email" value={product.email}
                                   onChange={handleChange}/>
                        </div>

                        <div className="flex flex-col mb-3">
                            <label htmlFor="">Password:</label>
                            <input className="rs-input" type="password" name="password" value={product.password}
                                   onChange={handleChange}/>
                        </div>


                        <div className="flex flex-col mb-3">
                            <label htmlFor="">Cover:</label>
                            <FileUpload className="rs-input"
                                        imagePreviewClass="w-24 aspect-square object-contain         "
                                        name="avatar"
                                        value={product.avatar}
                                        onChange={handleChange}/>
                        </div>

                    </div>

                </div>


                {/* Other input fields for price, stock, discount, avatar, description, attributes, categoryId, brandId */}
                <button type="submit" className="primary-btn">{customerId ? "Update " : "Add "} Account</button>
            </form>
        </div>
    );
};

export default AddUser;
