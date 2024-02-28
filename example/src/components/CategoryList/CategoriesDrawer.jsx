import React from 'react';
import Settings from "./Settings.jsx";
import CategoryList from "./CategoryList.jsx";

const SettingDrawer = ({isOpen, onClose}) => {
    const {categories} = useSelector(state => state.productState)

    return (
        <>
            <div className={`login-page bottom-to-top ${isOpen ? "open-bottom-to-top": ""}`}>
                <CategoryList categories={categories}/>
            </div>
            {isOpen && <div onClick={onClose} className="popup-backdrop login-page-backdrop"></div> }
        </>
    )
};

export default SettingDrawer;
