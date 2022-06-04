import React, { useState } from "react";
import { useNavigate } from "react-router";

//Form
import { useForm } from "react-hook-form";

//Field
import Field from "@components/Field";

//Icons
import logo from "@assets/img/logo.svg";
import key from "@assets/img/keyactive.svg";

//Components
import Button from "@components/Button";
import SpinnerLoad from "@components/SpinnerLoad";
import Checkbox from "../../Checkbox";

//Styles
import "../Forms.scss";

//Router
import { router } from "@utils/router";

const NewPassword = ({ fetchData }) => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const onChangeHandler = (ev) => {
        setValue(ev.currentTarget.name, ev.currentTarget.value);
    };

    const onSubmitHandler = async (data) => {
        setLoaded(false);

        if (data.pass1 === data.pass2) {
            fetchData(data);
        }

        setLoaded(true);
    };

    const showPassword1Error = () => {
        switch (errors.pass1 && errors.pass1.type) {
            case "minLength":
                return "Введите больше 1 символа";
            case "maxLength":
                return "Введите меньше 50 символов";
            case "required":
                return "Поле обязательно";
            default:
                return null;
        }
    };

    const showPassword2Error = () => {
        switch (errors.pass2 && errors.pass2.type) {
            case "minLength":
                return "Введите больше 1 символа";
            case "maxLength":
                return "Введите меньше 50 символов";
            case "required":
                return "Поле обязательно";
            default:
                return null;
        }
    };

    return (
        <div className="form">
            <div className="form__title">
                <span>НОВЫЙ ПАРОЛЬ</span>
                <img src={logo} alt="logo" />
            </div>
            <div className="form__desc">
                <p>
                    Для того чтобы войти в следующий раз под новым паролем, вам
                    нужно ввести новый пароль и подтвердить его повторным
                    вводом.
                </p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                noValidate
                autoComplete="off"
            >
                <Field
                    label="Пароль"
                    {...register("pass1", {
                        required: true,
                        minLength: 8,
                        maxLength: 50,
                    })}
                    onChange={onChangeHandler}
                />
                {errors.email && (
                    <span className="form__error">{showPassword1Error()}</span>
                )}
                <Field
                    label="Повторите пароль"
                    {...register("pass2", {
                        required: true,
                        minLength: 8,
                        maxLength: 50,
                    })}
                    onChange={onChangeHandler}
                />
                {errors.email && (
                    <span className="form__error">{showPassword2Error()}</span>
                )}
                <Button
                    className="form__button"
                    theme={"beforesubmit"}
                    type="submit"
                >
                    <img src={key} alt="key" />
                    {!loaded ? <SpinnerLoad /> : "ВОССТАНОВИТЬ ПАРОЛЬ"}
                </Button>
            </form>
        </div>
    );
};

export default NewPassword;
