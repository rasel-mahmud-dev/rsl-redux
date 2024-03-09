import React, {useEffect, useMemo, useState} from "react";
import {BiCheck, BiStar} from "react-icons/bi";
import getAssetPath from "../../utils/getAssetPath.js";
import Image from "../../components/Image/Image.jsx";
import ReviewForm from "./ReviewForm.jsx";
import Popup from "../../components/Popup.jsx";
import {useDispatch, useSelector} from "rsl-redux";
import {addReviewAction, fetchReviews} from "../../store/actions/reviewAction.js";
import Toast from "../../utils/toast.js";

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

    function handleSubmitReview(review) {
        if (!productId) return Toast.openError("Product not exist.")

        dispatch(addReviewAction({
            ...review,
            productId,
        })).unwrap().then(() => {
            Toast.openSuccess("Review added.")

        }).catch(ex => {
            Toast.openError(ex?.message)
        }).finally(() => {
            // localStorage.removeItem("review-temp")

        })
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
                <Popup
                    backdropClass="bg-gray-300"
                    className="max-w-2xl w-full !fixed top-1/4 left-1/2 !-translate-x-1/2"
                    onClose={() => setOpenAddReviewForm(false)}
                    isOpen={true}>
                    <ReviewForm onSubmit={handleSubmitReview}/>
                </Popup>
            )
            }

            <div className="flex items-center justify-between">
                <h4 className="product_detail_title">Ratings & Reviews</h4>
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
                <div className="mt-2">
                    {customerReviews.map((review) => (
                        <div className="rating bg-white p-4 rounded-lg my-2">
                            <div className="flex items-center">
                                <div className="rating_badge">
                                    <span>{review.rate}</span>
                                    <BiStar/>
                                </div>
                                <h4 className="ml-2">{review.title}</h4>
                            </div>
                            <p className="text-sm text-neutral-600 mt-2">{review.summary}</p>

                            <div className="flex gap-1">
                                {review?.images?.map(img => (
                                    <Image imgClass="object-cover w-20 h-20 !rounded" className=" " key={img}
                                           src={getAssetPath(img)}/>
                                ))}
                            </div>


                            <div className="mt-3">
                                <div className="flex justify-between items-center text-sm">

                                    <div className="flex  items-center text-sm gap-x-4">
                                        <div className="flex items-center text-sm font-semibold text-neutral-700  ">
                                            <Image src={getAssetPath(review.customer?.avatar)}/>
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
            </div>

            <button className="btn text-primary" type="text">
                All Review
            </button>
        </div>
    );
};

export default RatingReviews;