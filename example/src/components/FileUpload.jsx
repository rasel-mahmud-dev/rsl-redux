import React from 'react'
import getAssetPath from "../utils/getAssetPath.js";
import blobToBase64 from "../utils/blobToBase64.js";
import resizeImage from "../utils/resizeImage.js";
import chooseFile from "../utils/chooseFile.js";

function FileUpload({
                        name,
                        label,
                        mimeType = [],
                        preview = true,
                        value,
                        errorMessage,
                        imagePreviewClass = "",
                        placeholder,
                        onChange,
                        inputClass,
                        className,
                        resize
                    }) {

    const [file, setFile] = React.useState({
        name: "",
        size: 0,
        base64: ""
    })


    async function handleChooseImage() {
        try {
            const files = await chooseFile(mimeType)
            let file = files[0];
            let base64Org = await blobToBase64(file)
            if (resize && resize.maxWidth && resize.maxHeight) {
                const {blob, base64} = await resizeImage({
                    src: base64Org,
                    ...resize
                })
                setFile({base64, name: file.name, size: blob.size});
                onChange({target: {name, value: blob, base64: base64}});
            } else {
                setFile({base64: base64Org, name: file.name, size: file.size});
                onChange({target: {name, value: file, base64: base64Org}});
            }
        } catch (ex) {
            // handler eror
            console.log(ex)
        }
    }

    return (

        <div className={`rsl-input-group ${className}`}>
            <label htmlFor={name}>{label}</label>

            <div className="w-full">
                <div onClick={handleChooseImage} className={`rs-input cursor-pointer ${inputClass}`}>{file.name ? <span>
                    {file.name} {Number(file.size / 1024).toFixed(2)}KB
                </span> : placeholder}</div>

                <div className="mt-1">
                    {errorMessage && <span className="rounded-md text-error">{errorMessage}</span>}
                </div>

                {preview && file.base64 && (
                    <img  src={file.base64} className={imagePreviewClass} alt=""/>
                )}
                {value && typeof value === "string" && !file.base64 && (
                    <img src={getAssetPath(value)} className={imagePreviewClass}/>
                )}

            </div>
        </div>
    )
}

export default FileUpload