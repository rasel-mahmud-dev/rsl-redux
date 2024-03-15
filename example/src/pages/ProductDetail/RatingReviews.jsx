import React, {useEffect, useMemo, useState} from "react";
import {BiCheck, BiStar} from "react-icons/bi";
import getAssetPath from "../../utils/getAssetPath.js";
import Image from "../../components/Image/Image.jsx";
import ReviewForm from "../../components/Reviews/ReviewForm.jsx";
import Popup from "../../components/Popup.jsx";
import {useDispatch, useSelector} from "rsl-redux";
import {addReviewAction, fetchReviews} from "../../store/actions/reviewAction.js";
import Toast from "../../utils/toast.js";
import Reviews from "../../components/Reviews/Reviews.jsx";
import AddReview from "../../components/Reviews/AddReview.jsx";

let image2 = `c20-rmx3063-realme-original-imagfxfzjrkqtbhe.jpeg`;

const RatingReviews = ({productId, totalRatings, authId, ratingGroupCount, totalReviews, ratingsAvg}) => {
    const dispatch = useDispatch()
    const {reviews} = useSelector(state => state.productState)

    let customerReviews = reviews?.[productId] || []

    const [openAddReviewForm, setOpenAddReviewForm] = useState(false)

    useEffect(() => {
        productId && dispatch(fetchReviews(productId))
    }, [productId])

    const [rating, setRating] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    });

    useEffect(() => {
        if (ratingGroupCount) {
            let updateRating = {...rating}
            for (let ratingGroupCountElement of ratingGroupCount) {
                const {_id, count} = ratingGroupCountElement
                updateRating[_id] = count
            }
            setRating(updateRating)
        }
    }, [ratingGroupCount]);


    function totalRating() {
        let totalAmount = 0;
        for (const rate in rating) {
            totalAmount += rating[rate];
        }
        return totalAmount;
    }

    const customerGallery = useMemo(() => {
        let items = []
        if (!Array.isArray(customerReviews)) return []
        for (const review of customerReviews) {
            if (items.length < 30) {
                if (review?.images?.length) {
                    items.push(...review.images)
                }
            } else {
                break;
            }
        }
        return items
    }, [customerReviews?.length]);


    return (
        <div className="mt-6">

            {openAddReviewForm && (
                <AddReview authId={authId} productId={productId} onClose={() => setOpenAddReviewForm(false)}/>
            )
            }

            <div className="flex items-center justify-between">
                <h1 className="sec_label font-semibold text-2xl">Ratings & Reviews</h1>
                <button onClick={() => setOpenAddReviewForm(prev => !prev)} className="btn primary-btn">Rate Now
                </button>
            </div>


            <div>
                <div className="flex mt-5 justify-between">
                    <div className="px-1 md:px-1">
                        <div className=" flex items-center font-bold text-4xl">
                            <span className="block font-bold text-5xl">{Number(ratingsAvg).toFixed(1)}</span>
                            <BiStar/>
                        </div>
                        <div className="flex flex-col justify-center items-center text-center">
                            <h4 className="text-grey fs-14 mt-5 flex"> {totalRatings} Ratings</h4>
                            <h4 className="text-grey fs-14 text-center">&</h4>
                            <h4 className="text-grey fs-14 flex">Reviews</h4>
                        </div>
                    </div>
                    <div className="ml-1 md:ml-10 w-full">

                        {Object.keys(rating).map(rate => (
                            <div className="rate w-full" key={rate}>
                                <div className="flex items-center bg-transparent rating-star ">
                                    <span className="w-3">{rate}</span>
                                    <BiStar title=""/>
                                </div>
                                <span className="user_rate-wrapper">
                                    <div style={{width: (rating[rate] * 100) / totalRating() + "%"}}
                                         className="user_rate"/>
                                </span>
                                <span className="rate-amount text-grey fs-14 ml-5">{rating[rate]}</span>
                            </div>
                        ))}

                    </div>
                </div>

                <div className="mt-5">
                    <h4 className="text-base font-semibold">Customer Gallery</h4>
                    <div className="flex flex-wrap gap-1 mt-2">
                        {customerGallery?.map(img => (
                            <Image imgClass="object-cover w-10 h-10 !rounded" className=" " key={img}
                                   src={getAssetPath(img)}/>
                        ))}
                    </div>

                </div>
            </div>

            <div className="mt-5">
                <h4 className="text-base font-semibold">Customer Reviews</h4>
                <Reviews reviews={customerReviews}/>
            </div>

            {customerReviews?.length ? <button className="btn primary-btn" type="text">
                All Review
            </button> : (
                <h3 className="font-semibold">No reviews</h3>
            )}
        </div>
    );
};

export default RatingReviews;