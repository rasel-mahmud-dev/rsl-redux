import React from 'react';

const WishlistDrawer = ({isOpen, onClose}) => {
    return (
        <div>

            <>
                <div className={`login-page top-right ${isOpen ? "open-top-right": ""}`}>
                    <Wishlist />
                </div>
                {isOpen && <div onClick={onClose} className="popup-backdrop login-page-backdrop"></div> }
            </>

        </div>
    );
};

function Wishlist(){


    return (
        <div>
            <h2 className="drawer-title">Wishlist</h2>
        </div>
    )

};



export default WishlistDrawer;