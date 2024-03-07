import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import formatPrice from "../../utils/formatPrice.js";
import CommonTable from "../../components/Table.jsx";
import {deleteAdminProduct, fetchAdminDashboardProducts} from "../../store/actions/adminAction.js";
import {Link} from "react-router-dom";
import getAssetPath from "../../utils/getAssetPath.js";
import {getDateTime} from "../../utils/date.js";
import FileChooser from "../../components/Modals/FileChooser.jsx";
import {api} from "../../axios/index.js";
import Toast from "../../utils/toast.js";
import downloadJson from "../../utils/downloadJson.js";
import Tooltip from "../../components/Tooltip.jsx";


const ProductList = () => {
    const {adminProducts} = useSelector(state => state.productState)

    const [isOpenImportModal, setOpenImportModal] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAdminDashboardProducts())
    }, [])

    function handleDeleteItem(id) {
        dispatch(deleteAdminProduct(id))
    }

    async function handleImportBulk(content) {
        try {
            if (!content) throw Error("Please choose json file, that has name property")
            let {data} = await api.post("/products", JSON.parse(content))

            Toast.openSuccess(data.message)
        } catch (ex) {
            Toast.openError(ex?.message)
        } finally {
            setOpenImportModal(false)
        }
    }

    async function handleDownloadJson() {
        try {
            const fileName = "products.json"
            await downloadJson(adminProducts, fileName)
        } catch (ex) {
            Toast.openError("File download fail")
        } finally {
        }
    }

    const columns = [
        {

            name: "Image",
            field: "coverImage",
            thClass: "!text-start w-20",
            tdClass: "!text-start w-20",
            render: (cover_image) => (
                <div className="w-10">
                    <img src={getAssetPath(cover_image)} alt=""/>
                </div>
            )
        },
        {
            name: "title", field: "title", render: title => <Tooltip tips={title}>{title}</Tooltip>
        },
        {
            name: "Price",
            field: "price",
            thClass: "w-24",
            tdClass: "w-24",
            render: (v) => <Tooltip tips={formatPrice(v)}>{formatPrice(v)}</Tooltip>
        },
        {name: "Stock", field: "stock", thClass: "w-20", tdClass: "w-20"},
        {name: "Discount", field: "discount", thClass: "w-20", tdClass: "w-20"},
        {name: "Category", field: "categoryId", render: title => <Tooltip tips={title}>{title}</Tooltip>},
        {name: "Brand", field: "brandId", render: title => <Tooltip tips={title}>{title}</Tooltip>},
        {
            name: "Added On", field: "createdAt", render: (v) => {
                const a = getDateTime(new Date(v))
                return <Tooltip tips={a}>{a}</Tooltip>
            }
        },
        {
            name: "Updated On", field: "updatedAt", render: (v) => {
                const a = getDateTime(new Date(v))
                return <Tooltip tips={a}>{a}</Tooltip>
            }
        },
        {
            name: "Action", field: "_id", render: (_id) => (
                <div
                    className="flex items-center gap-x-5 px-6 justify-start md:justify-center  font-medium text-sm break-keep">
                    <button
                        className={`border border-blue-600 bg-blue-600/10  text-blue-400   px-5 py-2 rounded-lg hover:text-white hover:bg-blue-600/60`}>
                        <Link to={`/admin/edit-product/${_id}`}>Edit</Link>
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
        <div className="py-6 px-2 md:px-4">


            {isOpenImportModal && (
                <FileChooser
                    accept={[".json"]}
                    onClose={() => setOpenImportModal(false)}
                    onSubmit={handleImportBulk}/>
            )}


            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Product List ({adminProducts?.length})</h2>

                <div className="flex justify-between items-center gap-x-3">
                    <button onClick={handleDownloadJson} className="btn btn-outline">Export</button>
                    <button onClick={() => setOpenImportModal(true)} className="btn btn-outline">Import</button>
                    <Link to={`/admin/add-product`}>
                        <button
                            className={`btn btn-outline px-5 py-2 `}>
                            Add new
                        </button>
                    </Link>

                </div>

            </div>

            <CommonTable className="table-start-align mt-6" column={columns} data={adminProducts ? adminProducts : []}/>


        </div>
    );
};

export default ProductList;



