import React from "react";
import CategoryList from "../CategoryList/CategoryList.jsx";

const CategoryDrawer = ({isOpen, onClose}) => {
    return (
        <div>
            <>
                <div className={`login-page max-h-[90vh] overflow-y-hidden left-to-right ${isOpen ? "open-left-to-right" : ""}`}>
                    <div className="max-h-[80vh] overflow-y-auto">
                        <CategoryList onClose={onClose}  />
                    </div>
                </div>
                {isOpen && <div onClick={onClose} className="popup-backdrop login-page-backdrop"></div>}
            </>
        </div>
    );
};

export default CategoryDrawer