import React from "react";

//Components
import Button from "@components/Button";

//Styles
import "./Modal.scss";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/user/user.api";

const LogoutModal = ({ handleChange }) => {
    const dispatch = useDispatch();

    const hadnleClick = (toggle) => {
        if (toggle) {
            dispatch(logOut());
        }
        handleChange(toggle);
    };

    return (
        <div className="modal">
            <div className="modal__block">
                <div className="modal__block__title">
                    <span>Выйти из учётной записи?</span>
                </div>
                <div className="modal__block__desc">
                    <span>Вы желате выйти из учётной записи?</span>
                </div>
                <div className="modal__block__btns">
                    <Button
                        className="modal__block__bts_button"
                        theme="aftersubmit"
                        onClick={() => hadnleClick(true)}
                    >
                        Выйти
                    </Button>
                    <Button
                        className="modal__block__bts_button"
                        theme="beforesubmit"
                        onClick={() => hadnleClick(false)}
                    >
                        Остаться
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
