import React, {useEffect, useState} from 'react';
import Input from "../../components/Form/Input.jsx";
import RatingChooser from "../../components/RatingChooser/RatingChooser.jsx";
import MultipleFileChooser from "../../components/Form/MultipleFileChooser/MultipleFileChooser.jsx";
import resizeImage from "../../utils/resizeImage.js";
import {api} from "../../axios/index.js";

const ReviewForm = ({onSubmit}) => {

    const [review, setReview] = useState({
        title: "",
        rate: 0,
        summary: "",
        images: []
    });

    const [uploadedImages, setUploadedImages] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        let images = []
        for (let uploadedImagesKey in uploadedImages) {
            images.push(uploadedImages[uploadedImagesKey].url)
        }
        onSubmit({...review, images: images});
    };

    function getFromLocalStorage() {
        let tempImages = localStorage.getItem("review-temp")
        tempImages = JSON.parse(tempImages)
        if (tempImages && typeof tempImages === "object") {
            return tempImages
        }
        return {}
    }

    useEffect(() => {
        setUploadedImages(getFromLocalStorage())
    }, []);

    useEffect(() => {
        if (!review.images) return;

        (async function () {
            let updatedState = {...uploadedImages, ...getFromLocalStorage()}

            for (let image of review.images) {

                if (!uploadedImages[image.fileName]) {
                    try {
                        updatedState[image.fileName] = {isUploading: true, url: ""}
                        const result = await handleUploadImage("image", image.blob, "")
                        updatedState[image.fileName] = {
                            ...updatedState[image.fileName],
                            url: result || ""
                        }
                    } catch (ex) {
                        updatedState[image.fileName] = {
                            ...updatedState[image.fileName],
                            isError: true
                        }
                    } finally {
                        updatedState[image.fileName] = {
                            ...updatedState[image.fileName],
                            isUploading: false
                        }
                    }
                }
            }
            localStorage.setItem("review-temp", JSON.stringify(updatedState))
            setUploadedImages(updatedState)
        }())

    }, [review?.images]);


    const handleChange = async (e) => {
        const {name, value} = e.target;
        setReview(prevReview => ({
            ...prevReview,
            [name]: value
        }));
    };

    function handleUploadImage(name, value, dir) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            try {
                if (value.instanceOf === File) {
                    throw Error("Invalid file")
                }

                if (value.size > 500000) {
                    throw Error("file should be less than 500kb")
                }

                const formData = new FormData()
                formData.append(value.name, value)
                formData.append("fileName", value.name)
                formData.append("dir", dir)

                const {data} = await api.post("/files/upload", formData)
                resolve(data?.url)

            } catch (e) {
                reject(e)
            }
        })
    }

    function fileCompress(base64) {
        return resizeImage({
            maxWidth: 1280,
            maxHeight: 760,
            src: base64,
            quality: 0.5,
        })
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold">Submit Review</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-4">
                <div className="">
                    <div className="mt-2"></div>
                    <RatingChooser label="Rate" name="rate" onChange={handleChange} total={5}/>
                    <Input label="Title" name="title" value={review.title} onChange={handleChange}/>
                    <Input type="textarea" label="Summary" name="summary" value={review.summary}
                           onChange={handleChange}/>

                    <button className="btn primary-btn" type="submit">Submit Review</button>

                </div>
                <div>
                    <MultipleFileChooser
                        required={true}
                        name="images"
                        fileHandler={fileCompress}
                        multiple={true}
                        label="Images"
                        inputClass="bg-input-group"
                        onChange={handleChange}
                        labelClass="dark:text-white !mb-2"
                        className={"mt-4"}
                    />
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;