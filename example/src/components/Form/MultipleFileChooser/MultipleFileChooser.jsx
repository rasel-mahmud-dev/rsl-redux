import React, {useEffect, useRef, useState} from "react";
import getAssetPath from "../../../utils/getAssetPath.js";
import "./multipleFileChooser.scss"

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


function blobToBase64(blob, cb) {
    let reader = new FileReader()
    reader.onload = function (e) {
        cb(e.target.result)
    }
    if (blob) {
        reader.readAsDataURL(blob)
    }
}


const MultipleFileChooser = (props) => {

    const {name, label, labelAddition, labelClass, defaultValue, required, multiple=false, className = "", onChange} = props

    const input = useRef(null)

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
    }, [])


    function handleChooseFile() {
        input.current.click()
    }

    function handleChange(e) {
        const files = e.target.files
        if (files && files.length) {
            for (let file of files) {
                blobToBase64(file, (data) => {
                    setState(prevState => {
                        let updatedState = [
                            ...prevState,
                            {blob: file, base64: data, fileName: file.fileName, url: ""}
                        ]
                        onChange && onChange({target: {name, value: updatedState}})
                        return updatedState
                    })
                })
            }
        }
    }


    return (
        <div className={`rs-image-picker mt-4`}>
            <div className={`flex items-center gap-x-2 mb-2 md:mb-0 ${labelClass}`}>
                {label && (
                    <label htmlFor={name} className={`font-medium text-gray-900  flex items-center`}>
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                {labelAddition && labelAddition()}
            </div>

            <input onChange={handleChange} hidden={true} type="file" multiple={multiple} accept="image/jpeg" ref={input}/>

            <div className="rs-image-picker__list">
                {state && state.length > 0 && state.map((item, idx) => (
                    <div className="item-image" key={idx}>
                        <img className="" src={item.base64 ? item.base64 : item.url} alt=""/>
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
