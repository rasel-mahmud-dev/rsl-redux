// type = {
//     question: string,
//     answer?: string,
//     selletId?: string
//     customerId?: string
//     createdAt: Date
//     updatedAt: Date
// }

import React, {useState} from "react";
import AddQuestionForm from "./AddQuestionForm.jsx";
import {getDateTime} from "../../utils/date.js";

const QuestionAnswers = ({questionAnswers = [], className = ""}) => {

    // function handleAddQuestion(e: SyntheticEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //
    //
    //     let a = e.target as any;
    //
    //     let question = (a.question as HTMLInputElement).value
    //     if (!question) {
    //         return toast.error("Please write your question")
    //     }
    //
    //     getApi().post("/api/product/question", {
    //         productId: FAKE_POST_DETAIL, // fake id
    //         // productId: productDetail._id,
    //         question: question,
    //     }).then(({status, data}) => {
    //         if (status === 201) {
    //             toast.success("Review Added successfully")
    //             setOpenAddQuestionModal(false)
    //             setQuestions(data)
    //         }
    //     }).catch(ex => {
    //         return toast.error(errorMessage(ex))
    //     })
    // }
    //
    //
    // function addQuestionModal() {
    //     return (
    //         <form onSubmit={handleAddQuestion}>
    //             <h3 className="my-2 font-medium text-center">Ask Question</h3>
    //             <Input name="question" type="textarea" label="Question"/>
    //             <Button type="submit" className="btn-primary">Submit</Button>
    //
    //         </form>
    //     )
    // }


    return (
        <div className={className}>
            {questionAnswers && questionAnswers?.map(qus => (
                <div className="bg-white p-4 rounded-lg my-2">

                    <div className="flex items-center justify-between gap-x-1">
                        <div>
                            <span>Q:</span>
                            <span className="text-gray-600 text-sm ml-2">
                                <label htmlFor="">{qus.question}</label>
                            </span>
                        </div>

                        <div className="text-xs text-neutral-600 flex items-center gap-x-1">
                            <span>Asked on</span>
                            {getDateTime(qus.createdAt)}
                        </div>

                    </div>


                    <div>
                        <span>A:</span>
                        <span className='text-gray-600 text-sm ml-2'>{qus.answer && qus.answer}</span>
                    </div>
                </div>
            ))}
        </div>

    )
        ;
};

export default QuestionAnswers;