import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "rsl-redux";
import {deleteQuestionAnswer, fetchCustomerQuestionAnswers} from "../../../store/actions/questionsAction.js";
import QuestionAnswers from "../../../components/QuestionAnswers/QuestionAnswers.jsx";
import Toast from "../../../utils/toast.js";
import AddQuestionForm from "../../../components/QuestionAnswers/AddQuestionForm.jsx";


const MyQuestions = () => {
    const dispatch = useDispatch()
    const {customerQuestions} = useSelector(state => state.authState)


    let init = {questionAnswer: null, isQuestion: true, isOpen: false}
    const [state, setState] = useState(init)

    useEffect(() => {
        dispatch(fetchCustomerQuestionAnswers())
    }, [])

    function handleDelete(item) {
        dispatch(deleteQuestionAnswer(item._id)).unwrap().then(() => {
            Toast.openSuccess("Question deleted.")
        }).catch(ex => {
            Toast.openError(ex?.message)
        })
    }

    function handleClickEdit(questionAnswer) {
        setState(prev => ({
            ...prev,
            isOpen: true,
            questionAnswer
        }))
    }


    return (
        <div className="mt-6 pb-10">

            {(state.isOpen && state?.questionAnswer?.productId) && (
                <AddQuestionForm
                    isQuestion={state.isQuestion}
                    productId={state.questionAnswer.productId}
                    updateData={state.questionAnswer}
                    onClose={() => setState(init)}
                />
            )
            }

            <div className="flex items-center justify-between">
                <h1 className="sec_label font-semibold text-2xl">Questions and Answers</h1>
                <button onClick={() => setState(prev => ({
                    ...prev,
                    questionAnswer: null,
                    isQuestion: true,
                    isOpen: true
                }))}
                        className="btn primary-btn">Ask Now
                </button>
            </div>


            <div className="mt-5">
                <h4 className="text-base font-semibold">Questions and Answers</h4>
                <QuestionAnswers
                    isDeleteAble={true}
                    onClickDelete={handleDelete}
                    onEditQuestion={handleClickEdit}
                    onClickReply={(data) => setState(prev => ({
                        ...prev,
                        questionAnswer: data,
                        isOpen: true,
                        isQuestion: false
                    }))}
                    isProductOwner={false}
                    questionAnswers={customerQuestions}
                />
                <button className="btn primary-btn">All questions</button>
            </div>


        </div>
    );
};

export default MyQuestions;