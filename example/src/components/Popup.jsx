import React from 'react';
import PropTypes from "prop-types";

const Popup = ({onClose, className= "", backdropClass = "", isOpen, children}) => {

    function handleBlur() {
        // onClose()
    }

    return (
        <>
            <div className={`popup-root ${className ?? ""} ${isOpen ? "open" : "close" }`} tabIndex={-1} onBlur={handleBlur}>
                {children}
            </div>

            {isOpen && <div onClick={()=>onClose()} className={`backdrop ${backdropClass}`}></div>}

        </>
    );
};
Popup.propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    className: PropTypes.string,
    backdropClass: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Popup;