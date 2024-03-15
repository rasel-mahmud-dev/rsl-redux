import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import CommonTable from "../../../components/Table.jsx";
import {Link} from "react-router-dom";
import {deleteBrand} from "../../../store/actions/productAction.js";
import getAssetPath from "../../../utils/getAssetPath.js";
import FileChooser from "../../../components/Modals/FileChooser.jsx";
import {api} from "../../../axios/index.js";
import Toast from "../../../utils/toast.js";
import downloadJson from "../../../utils/downloadJson.js";
import {fetchBrands} from "../../../store/actions/categoryAction.js";


const BrandList = () => {
    const {brands} = useSelector(state => state.productState)

    const [isOpenImportModal, setOpenImportModal] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchBrands())
    }, []);


    function handleDeleteItem(id) {
        dispatch(deleteBrand(id)).unwrap().then()
            .catch(ex=>{
                Toast.openError(ex)
            })
    }

    async function handleImportBulk(content) {
        try {
            if (!content) throw Error("Please choose json file, that has name property")
            let {data} = await api.post("/brands", JSON.parse(content))

            Toast.openSuccess(data.message)
        } catch (ex) {
            Toast.openError(ex?.message)
        } finally {
            setOpenImportModal(false)
        }
    }

    async function handleDownloadJson() {
        try {
            const fileName = "brands.json"
            await downloadJson(brands, fileName)
        } catch (ex) {
            Toast.openError("File download fail")
        } finally {
        }
    }

    const columns = [
        {
            name: "Image",
            field: "image",
            thClass: "!text-start w-20",
            tdClass: "!text-start w-20",
            render: (image) => (
                <div className="w-10">
                    <img src={getAssetPath(image)} alt=""/>
                </div>
            )
        },
        {
            name: "Name", field: "name", thClass: "!text-start", tdClass: "!text-start"
        },
        {
            name: "Slug", field: "slug", thClass: "!text-start", tdClass: "!text-start"
        },
        {
            name: "Categories", field: "categories", thClass: "!text-start", tdClass: "!text-start",
            render: (v) => (
                <div className="flex flex-wrap gap-1">
                    {v?.map(el=>(
                        <li className="list-none text-xs px-2 py-px border ">{el}</li>
                    ))}
                </div>
            ),
        },
        {name: "Added On", field: "createdAt", render: (v) => new Date(v).toDateString()},
        {
            name: "Action", field: "_id", render: (_id) => (
                <div
                    className="flex items-center gap-x-5 px-6 justify-start md:justify-center  font-medium text-sm break-keep">
                    <button
                        className={`border border-blue-600 bg-blue-600/10  text-blue-400   px-5 py-2 rounded-lg hover:text-white hover:bg-blue-600/60`}>
                        <Link to={`/admin/edit-brand/${_id}`}>Edit</Link>
                    </button>
                    <button onClick={() => handleDeleteItem(_id)}
                            className={`border border-orange-600 bg-orange-600/10 text-orange-600 px-5 py-2 rounded-lg hover:bg-orange-600/50`}>
                        Delete
                    </button>
                </div>
            )
        },
    ]

    return (
        <div className="py-6 container">

            {isOpenImportModal && (
                <FileChooser
                    accept={[".json"]}
                    onClose={() => setOpenImportModal(false)}
                    onSubmit={handleImportBulk}/>
            )}

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Brand List ({brands?.length})</h2>
                <div className="flex justify-between items-center gap-x-3">
                    <button onClick={handleDownloadJson} className="btn btn-outline">Export</button>
                    <button onClick={() => setOpenImportModal(true)} className="btn btn-outline">Import</button>
                    <Link to={`/admin/add-brand`}>
                        <button
                            className={`btn btn-outline px-5 py-2 `}>
                            Add new
                        </button>
                    </Link>

                </div>
            </div>
            <CommonTable className="table-start-align mt-6" column={columns} data={brands ? brands : []}/>
        </div>
    );
}

export default BrandList;



