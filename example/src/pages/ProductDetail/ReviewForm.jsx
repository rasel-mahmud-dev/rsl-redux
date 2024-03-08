import React, {useState} from 'react';
import Input from "../../components/Form/Input.jsx";
import RatingChooser from "../../components/RatingChooser/RatingChooser.jsx";

const ReviewForm = ({onSubmit}) => {

    const [review, setReview] = useState({
        title: "",
        rate: 0,
        productId: 0,
        summary: "",
        images: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(review);
    };


    const handleChange = (e) => {
        const {name, value} = e.target;
        setReview(prevReview => ({
            ...prevReview,
            [name]: value
        }));
    };


    return (
        <div >
            <h2 className="text-2xl font-semibold">Submit Review</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-4">
                <div className="">
                    <div className="mt-2"></div>
                    <RatingChooser  label="Rate" name="rate" onChange={handleChange} total={5}  />
                    <Input label="Title" name="title" value={review.title} onChange={handleChange}/>
                    <Input type="textarea" label="Summary" name="summary" value={review.summary} onChange={handleChange}/>

                    <button className="btn primary-btn" type="submit">Submit Review</button>

                </div>
                    <div>
                        afasdf
                    </div>
                </form>
        </div>
    );
};

export default ReviewForm;