function blobToBase64(blob) {
    return new Promise((resolve) => {
        if (!blob) return resolve(null)
        const reader = new FileReader()

        reader.onload = function (e) {
            resolve(e.target.result)
        }
        reader.onerror = function () {
            resolve(null)
        }
        reader.readAsDataURL(blob)
    })
}

export default blobToBase64;
