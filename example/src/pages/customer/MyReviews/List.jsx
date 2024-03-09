import React, {useEffect, useState} from 'react';
import Reviews from "../../../components/Reviews/Reviews.jsx";
import {useDispatch, useSelector} from "rsl-redux";
import {fetchCustomerReviews} from "../../../store/actions/reviewAction.js";
import AddReview from "../../../components/Reviews/AddReview.jsx";

const List = () => {

    const {customerReviews} = useSelector(state => state.authState)
    const dispatch = useDispatch()

    const init = {
        isOpen: false,
        review: null
    }

    const [state, setState] = useState(init)

    function onClose() {
        setState(init)
    }

    useEffect(() => {
        dispatch(fetchCustomerReviews())
    }, []);

    function handleClickEdit(review) {
        setState(prev => ({
            ...prev,
            isOpen: true,
            review
        }))
    }


    return (
        <div className="py-6 px-2 md:px-4">

            {state.isOpen && state.review?.productId && (
                <AddReview updateData={state.review} productId={state.review?.productId} onClose={onClose}/>
            )
            }

            <Reviews
                onClickEdit={handleClickEdit}
                isModAble={true}
                reviews={customerReviews}

            />
        </div>
    );
};

export default List;