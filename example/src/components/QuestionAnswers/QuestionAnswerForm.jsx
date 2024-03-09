import {useEffect, useState} from "react";
import Input from "../Form/Input.jsx";


const QuestionAnswerForm = ({onSubmit, updateData, isQuestion = true}) => {

    const [questionAnswer, setQuestionAnswer] = useState({
        question: "",
        answer: ""
    });

    useEffect(() => {
        if (updateData) {
            let updateState = {...questionAnswer}
            for (let key in updateState) {
                if (updateData[key]) {
                    updateState[key] = updateData[key]
                }
            }
            setQuestionAnswer(updateState)
        }
    }, [updateData]);


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(questionAnswer);
    };

    const handleChange = async (e) => {
        const {name, value} = e.target;
        setQuestionAnswer(old => ({
            ...old,
            [name]: value
        }));
    };


    return (
        <div>
            <h2 className="text-2xl font-semibold">{updateData ? "Update" : "Submit"} {isQuestion ? "Question" : "Answer"}</h2>

            <form onSubmit={handleSubmit} className="">
                <div className="">
                    <div className="mt-2"></div>

                    {isQuestion && <Input readOnly={!isQuestion} type="textarea" label="Question" name="question" value={questionAnswer.question}
                           onChange={handleChange}/> }

                    {!isQuestion && <Input  type="textarea" label="Answer" name="answer" value={questionAnswer.answer}
                           onChange={handleChange}/> }

                    <button className="btn primary-btn" type="submit">{updateData ? "Update" : "Submit"}</button>

                </div>

            </form>
        </div>
    );
};

export default QuestionAnswerForm;