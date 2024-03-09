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

const RatingReviews = ({productId}) => {
    const dispatch = useDispatch()
    const {reviews} = useSelector(state => state.productState)

    let customerReviews = reviews?.[productId] || []

    const [openAddReviewForm, setOpenAddReviewForm] = useState(false)

    useEffect(() => {
        productId && dispatch(fetchReviews(productId))
    }, [productId])


    function calculateRate() {
        let subTotalRate = 0;
        let totalAmount = 0;
        rating.map((rate) => {
            subTotalRate += rate.rating * rate.amount;
            totalAmount += rate.amount;
        });
        return (subTotalRate / totalAmount).toFixed(1);
    }

    const rating = [
        {rating: 1, amount: 20},
        {rating: 2, amount: 30},
        {rating: 3, amount: 10},
        {rating: 4, amount: 20},
        {rating: 5, amount: 10},
    ];

    function totalRating() {
        let totalAmount = 0;
        rating.map((rate) => {
            totalAmount += rate.amount;
        });
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
                <AddReview productId={productId} onClose={()=>setOpenAddReviewForm(false)} />
            )
            }

            <div className="flex items-center justify-between">
                <h1 className="sec_label font-semibold text-2xl">Ratings & Reviews</h1>
                <button onClick={() => setOpenAddReviewForm(prev => !prev)} className="btn primary-btn">Rate Now
                </button>
            </div>


            <div>
                <div className="flex mt-5 justify-between">
                    <div className="px-10">
                        <div className=" flex items-center font-bold text-4xl">
                            <span className="block font-bold text-5xl">{calculateRate()}</span>
                            <BiStar/>
                        </div>
                        <h4 className="text-grey fs-14 mt-5"> {totalRating()} Total Ratings</h4>
                        <h4 className="text-grey fs-14 text-center">&</h4>
                        <h4 className="text-grey fs-14"> {reviews.length} Total Ratings</h4>
                    </div>
                    <div className="ml-10 w-full">
                        {rating.map((rat) => (
                            <div className="rate w-full">
                                <div className="flex items-center bg-transparent rating-star ">
                                    <span className="w-3">{rat.rating}</span>
                                    <BiStar/>
                                </div>
                                <span className="user_rate-wrapper">
                                    <div style={{width: (rat.amount * 100) / totalRating() + "%"}}
                                         className="user_rate"/>
                                </span>
                                <span className="rate-amount text-grey fs-14 ml-5">{rat.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-5">
                    <h4 className="text-base font-semibold">Customer Gallery</h4>
                    <div className="flex gap-1 mt-2">
                        {customerGallery?.map(img => (
                            <Image imgClass="object-cover w-10 h-10 !rounded" className=" " key={img}
                                   src={getAssetPath(img)}/>
                        ))}
                    </div>

                </div>
            </div>

            <div className="mt-5">
                <h4 className="text-base font-semibold">Customer Reviews</h4>
                <Reviews reviews={customerReviews} />
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