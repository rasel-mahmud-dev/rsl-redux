import React from 'react';
import Popup from "../Popup.jsx";
import {logOut} from "../../store/slices/authSlice.js";
import {useDispatch} from "rsl-redux";
import Image from "../Image/Image.jsx";
import getAssetPath from "../../utils/getAssetPath.js";

const AuthMenuPopup = ({auth, isOpen, onClose}) => {

    const dispatch = useDispatch()

    function handleLogout() {
        dispatch(logOut())
    }

    return (
        <div>
            <Popup onClose={onClose} isOpen={isOpen}
                   className="top-12 w-[200px] right-0">
                <div className={`select-none cursor-auto text-slate-900 `}>
                    <div className="">
                        <li className=" flex items-center gap-x-2 mb-4">
                            <Image className="!w-7 !h-7" src={getAssetPath(auth.avatar)}
                                   imgClass="aspect-square object-cover rounded-full"
                                   fallbackLetter={true} username={auth?.username} />
                            <span className="text-base font-medium">
                                {auth.username}
                            </span>
                        </li>

                        <a href="/dashboard">
                            <li className="list-item">Customer Dashboard</li>
                        </a>

                        {auth.role === "admin" && (
                            <a href="/admin">
                                <li className="list-item">Admin Dashboard</li>
                            </a>
                        )}
                        <li className="list-item " onClick={handleLogout}>logout</li>
                    </div>
                </div>
            </Popup>
        </div>
    );
};

export default AuthMenuPopup;