import React from 'react';
import {useSelector, useDispatch} from 'rsl-redux';
import getAssetPath from "../../utils/getAssetPath.js";

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
    const {auth} = useSelector(state=>state.authState)
    const {wishlist} = useSelector(state=>state.productState)
    const dispatch = useDispatch()


    function imagePath(link) {
        if (!link) return "/images/no-product.png"
        return getAssetPath(link)
    }

    function handleImgLoadError(e) {
        e.target.src = "/images/no-product.png"
    }


    return (
        <div>
            <h2 className="drawer-title">Wishlist</h2>
            <div>
                {wishlist?.map(item=>(
                    <div key={item._id} className="flex items-start gap-x-2 ">
                        <div className="w-[60px] h-[60px] ">
                        <img onError={handleImgLoadError} className="w-[60px] h-[60px] object-contain  "
                             src={imagePath(item?.product?.cover_image)} alt={item?.product?.title}/>
                        </div>

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