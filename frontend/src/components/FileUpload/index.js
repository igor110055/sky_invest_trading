import React, { useState } from "react";

//Components
import Button from "@components/Button";

//Styles
import "./FileUpload.scss";

const FileUpload = ({ text, id, name, handleChange, icon }) => {
    const hiddenFileInput = React.useRef(null);
    const [file, setFile] = useState(null);

    const btnClick = () => {
        hiddenFileInput.current.click();
    };

    const doSrcFormat = (e) => {
        return URL.createObjectURL(e);
    };

    const upload = (e) => {
        const fileUploaded = doSrcFormat(e.target.files[0]);
        setFile(fileUploaded);
        handleChange(e.target.files[0]);
    };

    return (
        <div class="container_upload">
            <div className="container_upload__img">
                {file ? <img src={file} alt="img" /> : icon}
            </div>
            <div className="container_upload__desc">
                <label class="label" for={name}>
                    {text}
                </label>

                <div class="input">
                    <input
                        name={name}
                        id={id}
                        ref={hiddenFileInput}
                        type="file"
                        onChange={upload}
                    />
                    <Button theme="aftersubmit" onClick={btnClick}>
                        Выбрать файл
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
