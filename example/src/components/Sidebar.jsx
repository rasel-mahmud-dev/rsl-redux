import React from 'react';

const Sidebar = ({className, isOpen, children, onClose}) => {
    return (
        <>
            <div className={`sidebar-backdrop ${isOpen ? "mobile-open" : "" }`} onClick={onClose}></div>
            <div className={`${className}`}>
                {children}
            </div>
        </>
    );
};

export default Sidebar;