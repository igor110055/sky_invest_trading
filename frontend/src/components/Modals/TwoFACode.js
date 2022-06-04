import React, { useEffect, useState } from "react";

//Components
import Button from "@components/Button";
import Checkbox from "../Checkbox";
import ReactCodeInput from "react-code-input";

//Styles
import "./Modal.scss";

const TwoFACode = ({ handleChange }) => {
    const [code, setCode] = useState("");
    const [err, setErr] = useState(false);

    const hadnleClick = () => {
        if (code) {
            handleChange(code);
        } else {
            setErr(true);
        }
    };

    useEffect(() => {
        if (code.length === 6) {
            handleChange(code);
        } else {
            setErr(true);
        }
    }, [code]);

    return (
        <div className="modal">
            <div className="modal__block">
                <div className="modal__block__title">
                    <span>Введите код Google Authentificator</span>
                </div>
                <div className="modal__block__content">
                    <ReactCodeInput
                        type="number"
                        fields={6}
                        onChange={(e) => {
                            if (code) {
                                setErr(false);
                            }

                            setCode(e);
                        }}
                    />
                </div>
                {err ? (
                    <span className="form__error">Заполните все поля</span>
                ) : null}
                {/* <div className="modal__block__btns">
                    <Button
                        className="modal__block__bts_button"
                        theme="aftersubmit"
                        onClick={hadnleClick}
                    >
                        Продолжить
                    </Button>
                </div> */}
            </div>
        </div>
    );
};

export default TwoFACode;
