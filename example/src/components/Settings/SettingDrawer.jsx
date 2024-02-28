import React from 'react';
import Settings from "./Settings.jsx";

const SettingDrawer = ({isOpen, onClose}) => {
    return (
        <>
            <div className={`login-page bottom-to-top ${isOpen ? "open-bottom-to-top": ""}`}>
                <Settings />
            </div>
            {isOpen && <div onClick={onClose} className="popup-backdrop login-page-backdrop"></div> }
        </>
    )
};

export default SettingDrawer;
