import React from 'react';
import {useSelector} from 'rsl-redux';
import getAssetPath from "../../utils/getAssetPath.js";
import {TiTimes} from "react-icons/ti";
import Image from "../Image/Image.jsx";

const WishlistDrawer = ({isOpen, onClose}) => {
    return (
        <div>
            <>
                <div className={`login-page top-right ${isOpen ? "open-top-right" : ""}`}>
                    <Wishlist onClose={onClose}/>
                </div>
                {isOpen && <div onClick={onClose} className="popup-backdrop login-page-backdrop"></div>}
            </>
        </div>
    );
};

function Wishlist({onClose}) {
    const {wishlist} = useSelector(state => state.productState)

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="drawer-title !mb-0">Wishlist</h2>
                <TiTimes onClick={() => onClose()}/>
            </div>
            <div className="wishlist-content">
                {wishlist?.map(item => (
                    <div key={item._id} className="flex items-start gap-x-2 ">

                        <Image
                            imgClass="w-[60px] h-[60px] object-contain !rounded"
                            src={getAssetPath(item?.product?.coverImage)}/>

                        <h3>{item?.product?.title}</h3>
                    </div>
                ))}

                {!wishlist || !wishlist?.length && (
                    <h2>No item in wishlist</h2>
                )}

            </div>
        </div>
    )

};


export default WishlistDrawer;