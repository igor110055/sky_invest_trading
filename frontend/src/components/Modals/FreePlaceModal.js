import React, { useRef, useState } from "react";

//Components
import Button from "@components/Button";
import Field from "@components/Field";

//Styles
import "./Modal.scss";
import { useForm } from "react-hook-form";
import { emailRegEx } from "../../utils/regex";
import { useValidator } from "../../hooks/useValidator";

const FreePlaceModal = ({ handleChange }) => {
    const [email, setEmail] = useState("");
    const {
        setError,
        errorData: { fields, error },
        ...validator
    } = useValidator();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    const hadnleClick = (toggle) => {
        handleChange(toggle);
    };

    let btnRef = useRef([]);

    const registerHandler = async (e) => {
        e.preventDefault();

        if (!validator.isEmailValid(email)) {
            return;
        }

        console.log(email);
        handleChange(true);
    };

    return (
        <form
            onSubmit={(e) => registerHandler(e)}
            noValidate
            autoComplete="off"
            className="modal"
        >
            <div className="modal__block">
                <div className="modal__block__title">
                    <span>Уведомить о свободном месте</span>
                </div>
                <div className="modal__block__desc">
                    <span>
                        Введите свой Email чтобы мы могли уведомить вас о
                        появлении свободного места в этой группе.
                    </span>
                </div>
                <Field
                    name="email"
                    label="Email"
                    classNames={`${fields.email && "error"}`}
                    onChange={(e) => {
                        validator.isEmailValid(e.target.value);
                        setEmail(e.target.value);
                    }}
                    error={fields.email && error}
                />

                <div className="modal__block__btns">
                    <Button
                        className="modal__block__btns__button"
                        theme="aftersubmit"
                        onClick={() => hadnleClick(false)}
                    >
                        Отмена
                    </Button>
                    <Button
                        disabled={validator.hasInvalidFields()}
                        ref={btnRef}
                        className="modal__block__btns__button"
                        theme="beforesubmit"
                        type="submit"
                    >
                        Уведомить
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default FreePlaceModal;
