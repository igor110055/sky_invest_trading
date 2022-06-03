import React from "react";

//Components
import Button from "@components/Button";
import Field from "@components/Field";

//Styles
import "./Modal.scss";

const RaspustitModal = ({ handleChange }) => {
    const hadnleClick = (toggle) => {
        handleChange(toggle);
    };

    return (
        <div className="modal">
            <div className="modal__block">
                <div className="modal__block__title">
                    <span>Вы точно хотите распустить группу?</span>
                </div>
                {/* <div className="modal__block__desc">
                    <span>
                        
                    </span>
                </div> */}
                <div className="modal__block__btns">
                    <Button
                        className="modal__block__btns__button"
                        theme="danger"
                        onClick={() => hadnleClick("raspus")}
                    >
                        Распустить
                    </Button>
                    <Button
                        className="modal__block__btns__button"
                        theme="beforesubmit"
                        onClick={() => hadnleClick("cancel")}
                    >
                        Отменить
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RaspustitModal;
