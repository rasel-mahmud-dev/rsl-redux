import React, {useState} from 'react';
import Input from "../../components/Form/Input.jsx";
import RatingChooser from "../../components/RatingChooser/RatingChooser.jsx";
import MultipleFileChooser from "../../components/Form/MultipleFileChooser/MultipleFileChooser.jsx";

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


    const handleChange = async (e) => {
        const {name, value} = e.target;
        if (name === "images") {
            for (let valueElement of value) {
                // const blob = await resizeImage(valueElement.base64)
                // valueElement.url = blob
            }

        } else {
            setReview(prevReview => ({
                ...prevReview,
                [name]: value
            }));
        }

    };

    let maxWidth = 1000
    let maxHeight = 300

    const resizeImage = (src) => {
        return new Promise((resolve)=>{
            const img = new Image();
            img.src = src;
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                let width = img.width;
                let height = img.height;

                // Check if the current width is larger than the max
                if (width > maxWidth) {
                    const ratio = maxWidth / width;
                    width = maxWidth;
                    height = height * ratio;
                }

                // Check if the current height is larger than max
                if (height > maxHeight) {
                    const ratio = maxHeight / height;
                    height = maxHeight;
                    width = width * ratio;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                // const resizedSrc = canvas.toDataURL('image/jpeg'); // Change format as needed
                canvas.toBlob((r)=>{
                    resolve(r)
                }, 'image/jpeg', 0.3); // Change format as needed


            };
        })


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
                        <MultipleFileChooser
                            required={true}
                            name="images"
                            multiple={true}
                            label="Images"
                            labelAddition={() => <span className="text-xs font-medium">Ratio (1:1)</span>}
                            inputClass="bg-input-group"
                            onChange={handleChange}
                            labelClass="dark:text-white !mb-2"
                            className={"mt-4 col-span-3"}
                        />
                    </div>
                </form>
        </div>
    );
};

export default ReviewForm;