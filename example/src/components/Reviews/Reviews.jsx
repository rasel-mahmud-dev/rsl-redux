import React from 'react';
import {BiCheck, BiStar} from "react-icons/bi";
import Image from "../Image/Image.jsx";
import getAssetPath from "../../utils/getAssetPath.js";

const Reviews = ({reviews, className, isModAble = false, onClickEdit, onClickDelete}) => {
    return (
        <div className={className}>

            {reviews.map((review) => (
                <div className="rating bg-white p-4 rounded-lg my-2">

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="rating_badge">
                                <span>{review.rate}</span>
                                <BiStar/>
                            </div>
                            <h4 className="ml-2">{review.title}</h4>
                        </div>
                        {isModAble && <div className="flex items-center gap-x-2">
                            <button onClick={()=>onClickEdit(review)} className="btn btn-outline">Edit</button>
                            <button onClick={()=>onClickDelete(review)} className="btn btn-outline">Delete</button>
                        </div> }
                    </div>

                    <p className="text-sm text-neutral-600 mt-2">{review.summary}</p>

                    <div className="flex gap-1 mt-4">
                        {review?.images?.map(img => (
                            <Image imgClass="object-cover w-20 h-20 !rounded" className=" " key={img}
                                   src={getAssetPath(img)}/>
                        ))}
                    </div>


                    <div className="mt-3">
                        <div className="flex justify-between items-center text-sm">

                            <div className="flex  items-center text-sm gap-x-4">
                                <div className="flex items-center text-sm font-semibold text-neutral-700  ">
                                    <Image fallbackLetter={true} src={getAssetPath(review.customer?.avatar)}/>
                                    <h4>{review.customer?.username}</h4>
                                </div>
                                <div className="text-neutral-500 flex items-center text-sm"><BiCheck/> Certified
                                    Buyer
                                </div>
                            </div>

                            <div
                                className="text-neutral-500 text-xs ml-2 date">{new Date(review.createdAt).toDateString()}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Reviews;