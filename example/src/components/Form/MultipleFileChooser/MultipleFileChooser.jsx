import React, {useEffect, useState} from "react";
import getAssetPath from "../../../utils/getAssetPath.js";
import "./multipleFileChooser.scss"
import blobToBase64 from "../../../utils/blobToBase64.js";
import chooseFile from "../../../utils/chooseFile.js";

// interface Props extends InputHTMLAttributes<HTMLInputElement> {
//     name: string;
//     label?: string;
//     labelAddition?: () => ReactNode;
//     inputClass?: string;
//     labelClass?: string;
//     onChange: (e: any) => void;
//     className?: string;
//     required?: boolean;
//     defaultValue?: string[]
// }


const MultipleFileChooser = (props) => {
    const {
        name,
        label,
        labelAddition,
        labelClass,
        defaultValue,
        uploadedImages,
        required,
        multiple = false,
        mimeType = [],
        fileHandler,
        className = "",
        onChange
    } = props


    const [state, setState] = useState([
        // {blob: "", base64: "", fileName: "", url: ""}
    ])

    useEffect(() => {
        if (defaultValue && defaultValue.length > 0) {
            let v = defaultValue.map(val => ({
                blob: "", base64: "", fileName: "", url: val
            }))
            setState(v)
        }
    }, [defaultValue])


    async function handleChooseFile() {
        try {
            const files = await chooseFile(mimeType)
            if (files && files.length) {
                for (let file of files) {

                    try {
                        let base64 = await blobToBase64(file)
                        let fileName = file.name
                        if (fileHandler && typeof fileHandler === "function") {
                            let result2 = await fileHandler(base64);
                            base64 = result2.base64
                            file = result2.blob
                        }

                        setState(prevState => {
                            let updatedState = [
                                ...prevState,
                                {blob: file, base64: base64, fileName: fileName, url: ""}
                            ]
                            onChange && onChange({target: {name, fileName: fileName, value: updatedState}})
                            return updatedState
                        })
                    } catch (ex) {
                        console.log("file handleer error: ", ex?.message)
                    }

                }
            }
        } catch (ex) {
            console.log(ex)
        }
    }


    return (
        <div className={`rs-image-picker ${className}`}>
            <div className={`flex items-center gap-x-2 mb-2 md:mb-0 ${labelClass}`}>
                {label && (
                    <label htmlFor={name} className={`font-medium text-gray-900  flex items-center`}>
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                {labelAddition && labelAddition()}
            </div>


            <div className="rs-image-picker__list">
                {state && state.length > 0 && state.map((item, idx) => (
                    <div className="item-image" key={idx}>
                        <img className="" src={item.base64 ? item.base64 : item.url} alt=""/>
                    </div>
                ))}

                {uploadedImages && Object.values(uploadedImages).map(({url}) => (
                    <div className="item-image" key={url}>
                        <img className="" src={getAssetPath(url)} alt=""/>
                    </div>
                ))}

                <div className="item-image" onClick={handleChooseFile}>
                    <img src={getAssetPath("/photo-thumb.jpg")} className="border-2 border-dashed p-1 w-full" alt=""/>
                </div>
            </div>
        </div>
    );
};

export default MultipleFileChooser;
