async function downloadJson(data, fileName) {
    try {
        const jsonContent = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonContent], {type: 'application/json'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (ex) {
        throw ex
    }
}

export default downloadJson