import React from 'react';
import Popup from "../Popup.jsx";
import Toast from "../../utils/toast.js";
import {useDispatch} from "rsl-redux";
import QuestionAnswerForm from "./QuestionAnswerForm.jsx";
import {
    addQuestionAnswerAction,
    updateAnswerAction,
    updateQuestionAnswerAction
} from "../../store/actions/questionsAction.js";

const AddQuestionForm = ({onClose, productId, updateData, authId, isQuestion}) => {

        const dispatch = useDispatch()

        function handleSubmit(questionAnswer) {
            if (!authId) return Toast.openError("Need to login.")
            if (!productId) return Toast.openError("Product not exist.")

            if (!isQuestion) {
                dispatch(updateAnswerAction({
                    ...questionAnswer,
                    productId,
                    _id: updateData._id
                })).unwrap().then(() => {

                    Toast.openSuccess("Answer updated.")
                    onClose()
                }).catch(ex => {
                    Toast.openError(ex)
                })
                return;
            }

            if (updateData) {
                dispatch(updateQuestionAnswerAction({
                    ...questionAnswer,
                    productId,
                    _id: updateData._id
                })).unwrap().then(() => {
                    Toast.openSuccess("questionAnswer updated.")
                    onClose()
                }).catch(ex => {
                    Toast.openError(ex)
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
                Toast.openError(ex)
            })

        }

        return (
            <div>
                <Popup
                    backdropClass="bg-gray-300"
                    className="max-w-md  w-[95%] !fixed top-1/4 left-1/2 !-translate-x-1/2"
                    onClose={() => onClose()}
                    isOpen={true}>
                    <QuestionAnswerForm isQuestion={isQuestion} updateData={updateData} onSubmit={handleSubmit}/>
                </Popup>
            </div>
        );
    }
;

export default AddQuestionForm;