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

const ResetPasswordForm = ({ fetchData }) => {
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

        fetchData(data);

        setLoaded(true);
    };

    const showEmailError = () => {
        switch (errors.email && errors.email.type) {
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

    const showPasswordError = () => {
        switch (errors.password && errors.password.type) {
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
                    Если вы забыли свой пароль - то его можно восстановить,
                    указав свой Email, на который мы вышлем ссылку с
                    восстановлением пароля.
                </p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                noValidate
                autoComplete="off"
            >
                <Field
                    label="Email"
                    {...register("email", { required: true, maxLength: 50 })}
                    onChange={onChangeHandler}
                />
                {errors.email && (
                    <span className="form__error">{showEmailError()}</span>
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

export default ResetPasswordForm;
