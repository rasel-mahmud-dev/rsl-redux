import React from 'react';

import Popup from "../Popup.jsx";

const LoginCredential = ({onClose, loginAction}) => {

    const users = [
        {  password: "123", email: "rasel.mahmud.dev@gmail.com", role: "customer"},
        {  password: "123", email: "rasel.mahmud.dev@gmail.com", role: "customer"},
        {  password: "123", email: "rasel.mahmud.dev@gmail.com", role: "customer"},
        {  password: "123", email: "rasel.mahmud.dev@gmail.com", role: "customer"},
        {  password: "123", email: "rasel.mahmud.dev@gmail.com", role: "customer"},
        {  password: "123", email: "rasel.mahmud.dev@gmail.com", role: "customer"},
        {  password: "123", email: "rasel.mahmud.dev@gmail.com", role: "customer"},
        {  password: "123", email: "rasel.mahmud.dev@gmail.com", role: "customer"},
        {  password: "123", email: "rasel.mahmud.dev@gmail.com", role: "customer"},
    ]



    return (
        <Popup className="absolute !rounded-xl right-0 top-10 max-h-[300px] overflow-y-auto w-full  max-w-sm" onClose={()=>onClose()} isOpen={true}>
            <div>
                {users.map(user => (
                    <div onClick={()=>loginAction(user)} className="hover-list-primary rounded-lg py-2">
                        <div className="text-xs px-2  flex flex-col">
                            <span>{user.email}</span>
                            <span className="font-semibold">{user.role}</span>
                        </div>
                    </div>
                ))}

            </div>
        </Popup>
    );
};

export default LoginCredential;