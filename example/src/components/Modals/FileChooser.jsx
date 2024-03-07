import React, {useState} from 'react';
import Popup from "../Popup.jsx";

const FileChooser = ({onSubmit, onClose, accept = []}) => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = () => {
        if (!selectedFile) {
            alert("Please select a file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const fileContent = reader.result;
            onSubmit(fileContent);
        };
        reader.readAsText(selectedFile);
    };

    return (
        <div>
            <Popup className="fixed !rounded-xl !left-1/2 !-translate-x-1/2 overflow-y-auto w-full  max-w-sm"
                   onClose={() => onClose()} isOpen={true}>
                <div>
                    <input
                        type="file"
                        id="fileInput"
                        accept={accept.join(",")}
                        onChange={handleFileChange}
                        style={{display: 'none'}}
                    />

                    <label htmlFor="fileInput" className="choose-file-btn">
                        Choose File
                    </label>

                    <div>
                        {selectedFile ? (
                            <div>
                                <h4>{selectedFile.name}</h4>
                            </div>
                        ) : (
                            <div>
                                No file selected
                            </div>
                        )}
                    </div>

                        <button className="btn primary-btn " onClick={handleSubmit}>Submit</button>
                    </div>
            </Popup>
        </div>
    );
};

export default FileChooser;