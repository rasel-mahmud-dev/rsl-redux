import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "rsl-redux";

import AddReview from "../../components/Reviews/AddReview.jsx";
import QuestionAnswers from "../../components/QuestionAnswers/QuestionAnswers.jsx";
import {fetchQuestionAnswers} from "../../store/actions/questionsAction.js";
import AddQuestionForm from "../../components/QuestionAnswers/AddQuestionForm.jsx";


const Index = ({productId}) => {
    const dispatch = useDispatch()
    const {questionAnswers} = useSelector(state => state.productState)


    let productQuestionAnswers = questionAnswers?.[productId] || []

    const [isOpenAddQuestionForm, setOpenAddQuestionForm] = useState(false)


    useEffect(() => {
        productId && dispatch(fetchQuestionAnswers(productId))
    }, [productId])


    return (
        <div className="mt-6 pb-10">

            {isOpenAddQuestionForm && (
                <AddQuestionForm
                    isQuestion={true}
                    productId={productId}
                    onClose={() => setOpenAddQuestionForm(false)}
                />
            )
            }

            <div className="flex items-center justify-between">
                <h1 className="sec_label font-semibold text-2xl">Questions and Answers</h1>
                <button onClick={() => setOpenAddQuestionForm(prev => !prev)} className="btn primary-btn">Ask Now
                </button>
            </div>


            <div className="mt-5">
                <h4 className="text-base font-semibold">Questions and Answers</h4>
                <QuestionAnswers questionAnswers={productQuestionAnswers}/>
                <button className="btn primary-btn">All questions</button>
            </div>


        </div>
    );
};

export default Index;