import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "rsl-redux";

import QuestionAnswers from "../../components/QuestionAnswers/QuestionAnswers.jsx";
import {fetchQuestionAnswers} from "../../store/actions/questionsAction.js";
import AddQuestionForm from "../../components/QuestionAnswers/AddQuestionForm.jsx";


const Index = ({productId, isProductOwner}) => {
    const dispatch = useDispatch()
    const {questionAnswers} = useSelector(state => state.productState)

    let productQuestionAnswers = questionAnswers?.[productId] || []

    let init = {questionAnswer: null, isQuestion: true, isOpen: false}
    const [state, setState] = useState(init)


    useEffect(() => {
        productId && dispatch(fetchQuestionAnswers(productId))
    }, [productId])


    return (
        <div className="mt-6 pb-10">

            {state.isOpen && (
                <AddQuestionForm
                    isQuestion={state.isQuestion}
                    productId={productId}
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
                    onClickReply={(data) => setState(prev => ({
                        ...prev,
                        questionAnswer: data,
                        isOpen: true,
                        isQuestion: false
                    }))}
                    isProductOwner={isProductOwner}
                    questionAnswers={productQuestionAnswers}
                />
                {productQuestionAnswers?.length ? <button className="btn primary-btn">All questions</button>
                    : <h3 className="font-semibold">No Questions</h3>}
            </div>


        </div>
    );
};

export default Index;