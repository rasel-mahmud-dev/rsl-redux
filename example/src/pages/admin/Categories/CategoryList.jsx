import React, {useState} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import CommonTable from "../../../components/Table.jsx";
import {Link} from "react-router-dom";
import {deleteCategory} from "../../../store/actions/categoryAction.js";
import getAssetPath from "../../../utils/getAssetPath.js";
import {api} from "../../../axios/index.js";
import Toast from "../../../utils/toast.js";
import downloadJson from "../../../utils/downloadJson.js";
import FileChooser from "../../../components/Modals/FileChooser.jsx";


const ProductList = () => {

    const {categories} = useSelector(state => state.productState)

    const dispatch = useDispatch()

    function handleDeleteItem(id) {
        dispatch(deleteCategory(id))
    }

    const [isOpenImportModal, setOpenImportModal] = useState(false)


    async function handleImportBulk(content) {
        try {
            if (!content) throw Error("Please choose json file, that has name property")
            let {data} = await api.post("/categories", JSON.parse(content))

            Toast.openSuccess(data.message)
        } catch (ex) {
            Toast.openError(ex?.message)
        } finally {
            setOpenImportModal(false)
        }
    }

    async function handleDownloadJson() {
        try {
            const fileName = "categories.json"
            await downloadJson(categories, fileName)
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
        {name: "Added On", field: "created_at", render: (v) => new Date(v).toDateString()},
        {
            name: "Action", field: "_id", render: (_id) => (
                <div
                    className="flex items-center gap-x-5 px-6 justify-start md:justify-center font-medium text-sm break-keep">
                    <button
                        className={`border border-blue-600 bg-blue-600/10  text-blue-400   px-5 py-2 rounded-lg hover:text-white hover:bg-blue-600/60`}>
                        <Link to={`/admin/edit-category/${_id}`}>Edit</Link>
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

            <div className="flex justify-between">
                <h2 className="text-xl font-semibold">Category List ({categories?.length})</h2>
                <div className="flex justify-between items-center gap-x-3">
                    <button onClick={handleDownloadJson} className="btn btn-outline">Export</button>
                    <button onClick={() => setOpenImportModal(true)} className="btn btn-outline">Import</button>
                    <Link to={`/admin/add-category`}>
                        <button
                            className={`btn btn-outline px-5 py-2 `}>
                            Add new
                        </button>
                    </Link>

                </div>

            </div>


            <CommonTable className="table-start-align mt-6" column={columns} data={categories ? categories : []}/>


        </div>
    );
};

export default ProductList;



