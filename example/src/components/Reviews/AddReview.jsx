import React from 'react';
import ReviewForm from "./ReviewForm.jsx";
import Popup from "../Popup.jsx";
import Toast from "../../utils/toast.js";
import {addReviewAction, updateReviewAction} from "../../store/actions/reviewAction.js";
import {useDispatch} from "rsl-redux";

const AddReview = ({onClose, productId, updateData, authId}) => {

    const dispatch = useDispatch()

    function handleSubmitReview(review) {
        if (!authId) return Toast.openError("Need to login.")

        if (!productId) return Toast.openError("Product not exist.")

        if(!review.title || !review.rate){
            return Toast.openError("Rate & title required.")
        }

        if (updateData) {
            dispatch(updateReviewAction({
                ...review,
                productId,
                _id: updateData._id
            })).unwrap().then(() => {
                Toast.openSuccess("Review updated.")
                localStorage.removeItem("review-temp")
                onClose()
            }).catch(ex => {
                Toast.openError(ex)
            })
            return
        }

        dispatch(addReviewAction({
            ...review,
            productId,
        })).unwrap().then(() => {
            Toast.openSuccess("Review added.")
            localStorage.removeItem("review-temp")
            onClose()
        }).catch(ex => {
            Toast.openError(ex)
        })
    }

    return (
        <div>
            <Popup
                backdropClass="bg-gray-300"
                className="max-w-2xl w-[95%]   max-h-[90vh] md:max-h-[60vh] overflow-y-auto !fixed top-1/4 left-1/2 !-translate-x-1/2"
                onClose={() => onClose()}
                isOpen={true}>
                <ReviewForm updateData={updateData} onSubmit={handleSubmitReview}/>
            </Popup>
        </div>
    );
};

export default AddReview;