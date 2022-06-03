import React from "react";

//Components
import Button from "@components/Button";
import Field from "@components/Field";

//Styles
import "./Modal.scss";

const RemoveGroup = ({ handleChange }) => {
    const hadnleClick = (toggle) => {
        handleChange(toggle);
    };

    return (
        <div className="modal">
            <div className="modal__block">
                <div className="modal__block__title">
                    <span>Удалить группу?</span>
                </div>
                <div className="modal__block__desc">
                    <span>
                        При удалении группы средства вернутся обратно инвесторам
                    </span>
                </div>
                <div className="modal__block__btns">
                    <Button
                        className="modal__block__btns__button"
                        theme="danger"
                        onClick={() => hadnleClick("remove")}
                    >
                        Удалить
                    </Button>
                    <Button
                        className="modal__block__btns__button"
                        theme="beforesubmit"
                        onClick={() => hadnleClick("cancel")}
                    >
                        Не удалять
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RemoveGroup;
