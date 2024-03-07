import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "rsl-redux";
import Toast from "../../../utils/toast.js";
import {getDateTime} from "../../../utils/date.js";
import {Link} from "react-router-dom";
import FileChooser from "../../../components/Modals/FileChooser.jsx";
import CommonTable from "../../../components/Table.jsx";
import getAssetPath from "../../../utils/getAssetPath.js";
import downloadJson from "../../../utils/downloadJson.js";
import {deleteCustomer, fetchAdminCustomersProducts} from "../../../store/actions/authAction.js";
import Tooltip from "../../../components/Tooltip.jsx";
import {api} from "../../../axios/index.js";


const List = () => {
    const {customers} = useSelector(state => state.authState)

    const [isOpenImportModal, setOpenImportModal] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAdminCustomersProducts())
    }, [])

    function handleDeleteItem(id) {
        dispatch(deleteCustomer(id)).unwrap().then(res => {
            Toast.openSuccess("Customer has been deleted!")
        }).catch(ex => {
            Toast.openError(ex?.message)
        })
    }

    async function handleImportBulk(content) {
        try {
            if (!content) throw Error("Please choose json file, that has name property")
            let {data} = await api.post("/auth/customers", JSON.parse(content))

            Toast.openSuccess(data.message)
            dispatch(fetchAdminCustomersProducts())
        } catch (ex) {
            Toast.openError(ex?.message)
        } finally {
            setOpenImportModal(false)
        }
    }

    async function handleDownloadJson() {
        try {
            const fileName = "customers.json"
            await downloadJson(customers, fileName)
        } catch (ex) {
            Toast.openError("File download fail")
        } finally {
        }
    }



    const columns = [
        {

            name: "Avatar",
            field: "avatar",
            thClass: "!text-start w-20",
            tdClass: "!text-start w-20",
            render: (avatar) => (
                <div className="w-10">
                    <img src={getAssetPath(avatar)} alt=""/>
                </div>
            )
        },
        {
            name: "Name", field: "username", render: username => <Tooltip tips={username}>{username}</Tooltip>
        },
        {
            name: "Email", field: "email", render: email => <Tooltip tips={email}>{email}</Tooltip>
        },

        {
            name: "Role", field: "role", render: role => <Tooltip tips={role}>{role}</Tooltip>
        },
        {
            name: "Registered", field: "createdAt", render: (v) => {
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
                        <Link to={`/admin/edit-customer/${_id}`}>Edit</Link>
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
                <h2 className="text-xl font-semibold">Users ({customers?.length})</h2>

                <div className="flex justify-between items-center gap-x-3">
                    <button onClick={handleDownloadJson} className="btn btn-outline">Export</button>
                    <button onClick={() => setOpenImportModal(true)} className="btn btn-outline">Import</button>
                    <Link to={`/admin/add-customer`}>
                        <button
                            className={`btn btn-outline px-5 py-2 `}>
                            Add new
                        </button>
                    </Link>

                </div>

            </div>

            <CommonTable className="table-start-align mt-6" column={columns} data={customers ? customers : []}/>


        </div>
    );
};

export default List;



