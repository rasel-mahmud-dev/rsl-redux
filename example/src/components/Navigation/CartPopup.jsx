import React from 'react';
import {Link} from "react-router-dom";
import Popup from "../Popup.jsx";
import getAssetPath from "../../utils/getAssetPath.js";

const CartPopup = ({isOpen, onClose, carts = []}) => {

    function imagePath(link) {
        if (!link) return "/images/no-product.png"
        return getAssetPath(link)
    }

    function handleImgLoadError(e) {
        e.target.src = "/images/no-product.png"
    }


    return (
        <div>
            <Popup onClose={onClose} isOpen={isOpen}
                   className="top-12 w-[340px] right-0">
                <div className={`select-none cursor-auto `}>

                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-slate-900 font-bold text-sm  uppercase">Your
                            Carts</h4>
                        <button className="btn btn-outline">
                            <Link to="/carts"
                                  className="text-slate-900  list-none flex items-center gap-x-2">
                                Show Detail
                            </Link>
                        </button>
                    </div>

                    <div className=" max-h-[300px] overflow-y-auto">
                        {!carts || Array.isArray(carts) && carts.length === 0 && (
                            <h4 className="text-white text-sm font-medium text-center mt-14">No
                                items in carts</h4>
                        )}

                        <table>
                            <tbody>
                            {carts?.map(cart => (
                                <tr key={cart.id}
                                    className="text-slate-900 py-2 border-b border-b-primaryBorder last:border-none">

                                    <td className="w-10">
                                        <img onError={handleImgLoadError}
                                             className="object-contain max-w-[50px] max-h-[50px] mx-auto"
                                             src={imagePath(cart?.coverImage)}
                                             alt=""/>
                                    </td>

                                    <td className=" ">
                                        <p className="wishlist-content  truncate pl-2">
                                            {cart?.title ?? (
                                                <span className=" text-red-500">Product deleted</span>
                                            )}
                                        </p>
                                    </td>

                                    <td className="w-1/5">
                                                                        <span
                                                                            className="inline-block ml-2">{cart?.price ?? "0.00"}</span>
                                    </td>

                                    <td className="w-4">
                                                                        <span
                                                                            className="  inline-block">{cart.quantity}</span>
                                    </td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>


                </div>


            </Popup>
        </div>
    );
};

export default CartPopup;