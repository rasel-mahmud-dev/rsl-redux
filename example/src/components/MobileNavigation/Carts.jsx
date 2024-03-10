import React from 'react';
import {useSelector} from "rsl-redux";
import getAssetPath from "../../utils/getAssetPath.js";
import Image from "../Image/Image.jsx";
import Tooltip from "../Tooltip.jsx";
import {Link} from "react-router-dom";


const Carts = ({isOpen, onClose}) => {

    const {carts} = useSelector(state=>state.cartState)

    return (
        <>
            <div className={`login-page bottom-to-top ${isOpen ? "open-bottom-to-top": ""}`}>
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="!mb-0 drawer-title">Carts</h2>
                        <Link onClick={()=>onClose()} to="/carts">
                            <button className="btn btn-outline outline-sm text-xs">View Detail</button>
                        </Link>
                    </div>
                    <div>
                        <ul className="uppercase text-sm font-medium">

                            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 justify-between">
                                {carts?.map(item=>(
                                    <div className="border   rounded p-1">
                                        <div className="w-">
                                            <Image imgClass="  object-contain" src={getAssetPath(item.coverImage)} alt={item.title} />
                                        </div>
                                        <div className="">
                                            <Tooltip contentClass="truncate" tips={item.title}>
                                                {item.title}
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </ul>

                    </div>
                </div>

            </div>
            {isOpen && <div onClick={onClose} className="popup-backdrop login-page-backdrop"></div> }
        </>
    )
};

export default Carts;
