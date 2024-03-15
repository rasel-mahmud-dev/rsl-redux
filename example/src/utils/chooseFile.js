function chooseFile(mimeType = []) {
    return new Promise((resolve, reject) => {
        try {
            console.log(mimeType)
            const fileInput = document.createElement("input")
            fileInput.setAttribute("type", "file")
            if (mimeType.length) {
                fileInput.setAttribute("accept", mimeType.join(","));
            }
            fileInput.addEventListener("change", (e) => {
                const file = e.target.files
                if (!file) throw Error("File choose fail");
                resolve(file)
            })
            fileInput.click()
        } catch (ex) {
            reject(ex?.message)
        }
    })
}


export default chooseFile