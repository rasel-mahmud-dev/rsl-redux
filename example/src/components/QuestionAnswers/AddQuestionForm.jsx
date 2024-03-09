import React from 'react';
import Popup from "../Popup.jsx";
import Toast from "../../utils/toast.js";
import {addReviewAction, updateReviewAction} from "../../store/actions/reviewAction.js";
import {useDispatch} from "rsl-redux";
import QuestionAnswerForm from "./QuestionAnswerForm.jsx";
import {addQuestionAnswerAction, updateQuestionAnswerAction} from "../../store/actions/questionsAction.js";

const AddQuestionForm = ({onClose, productId, updateData, isQuestion}) => {

    const dispatch = useDispatch()

    function handleSubmit(questionAnswer) {
        if (!productId) return Toast.openError("Product not exist.")

        if (updateData) {
            dispatch(updateQuestionAnswerAction({
                ...questionAnswer,
                productId,
                _id: updateData._id
            })).unwrap().then(() => {
                Toast.openSuccess("questionAnswer updated.")
                onClose()
            }).catch(ex => {
                Toast.openError(ex?.message)
            })
            return
        }

        dispatch(addQuestionAnswerAction({
            ...questionAnswer,
            productId,
        })).unwrap().then(() => {
            Toast.openSuccess("questionAnswer added.")
            onClose()
        }).catch(ex => {
            Toast.openError(ex?.message)
        })
    }

    return (
        <div>
            <Popup
                backdropClass="bg-gray-300"
                className="max-w-md w-full !fixed top-1/4 left-1/2 !-translate-x-1/2"
                onClose={() => onClose()}
                isOpen={true}>
                <QuestionAnswerForm isQuestion={isQuestion} updateData={updateData} onSubmit={handleSubmit}/>
            </Popup>
        </div>
    );
};

export default AddQuestionForm;