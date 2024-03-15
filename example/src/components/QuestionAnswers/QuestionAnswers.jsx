// type = {
//     question: string,
//     author?: {username: string},
//     customer?: {username: string},
//     answer?: string,
//     selletId?: string
//     customerId?: string
//     createdAt: Date
//     updatedAt: Date
// }

import React from "react";
import {getDateTime} from "../../utils/date.js";
import {BiTrash} from "react-icons/bi";


const QuestionAnswers = ({
                             questionAnswers = [],
                             className = "",
                             isProductOwner = false,
                             onClickDelete,
                             onEditQuestion,
                             onClickReply
                         }) => {

    return (
        <div className={className}>
            {questionAnswers && questionAnswers?.map(qus => (
                <div className="bg-white p-4 rounded-lg my-2 relative">


                    <div className="flex justify-between items-start">
                        <div className="flex items-start  gap-x-4">
                                <div>Q:</div>

                            <div className="flex gap-x-4">
                                <div>
                                    <p className="text-gray-600 text-sm ">
                                        <label htmlFor="">{qus.question}</label>
                                    </p>
                                    <div className="flex items-center gap-x-2 text-xs text-neutral-600 ">
                                        <p className="font-semibold">{qus?.customer?.username || "Unknown"}</p>
                                        {getDateTime(qus.createdAt)}
                                    </div>
                                </div>
                                {onEditQuestion && <button onClick={() => onEditQuestion(qus)}
                                                           className="text-xs h-5 btn btn-outline outline-sm">Update Question</button>}
                            </div>
                        </div>

                        {onClickDelete &&
                            <div onClick={() => onClickDelete(qus)} className="circle-pill p-1 rounded-full text-sm">
                                <BiTrash/>
                            </div>}
                    </div>


                    <div className="flex items-start  gap-x-4 mt-4">
                        <span>A:</span>
                        <div className="flex gap-x-4">
                            {qus.answer && <div>
                                <p className="text-gray-600 text-sm ">
                                    <label htmlFor="">{qus.answer}</label>
                                </p>
                                <div className="flex items-center gap-x-2 text-xs text-neutral-600 ">
                                    <p className="font-semibold">{qus?.author?.username || "Unknown"}</p>
                                    {getDateTime(qus.answeredAt)}
                                </div>
                            </div>}


                            {isProductOwner && <button onClick={() => onClickReply(qus)}
                                                       className="text-xs h-5 btn btn-outline outline-sm"> {qus.answer ? "Update " : "Add "}
                                Answer</button>}
                        </div>


                    </div>
                </div>
            ))}
        </div>

    )
        ;
};

export default QuestionAnswers;