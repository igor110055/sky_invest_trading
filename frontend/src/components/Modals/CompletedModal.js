import React from "react";

//Components
import Button from "@components/Button";
import Checkbox from "../Checkbox";

//Styles
import "./Modal.scss";

const CompletedModal = ({ handleChange }) => {
    const hadnleClick = () => {
        handleChange();
    };

    return (
        <div className="modal">
            <div className="modal__block">
                <div className="modal__block__title">
                    <span>Регистрация успешна!</span>
                </div>
                <div className="modal__block__desc">
                    <span>Ссылка для активации отправлена на почту</span>
                </div>
                <div className="modal__block__btns">
                    <Button
                        className="modal__block__bts_button"
                        theme="aftersubmit"
                        onClick={hadnleClick}
                    >
                        Продолжить
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompletedModal;
