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
import Checkbox from "@components/Checkbox";

//Styles
import "../Forms.scss";

//Router
import router from "@utils/router";
import { Link } from "react-router-dom";

const LoginForm = ({ fetchData, error }) => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(true);
    const [confirm, setConfirm] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const onChangeHandler = (ev) => {
        setValue(ev.currentTarget.name, ev.currentTarget.value);
    };

    const handleCheckbox = () => {
        setConfirm(!confirm);
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
                <span>ВХОД</span>
                <img src={logo} alt="logo" />
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
                <Field
                    label="Пароль"
                    {...register("password", {
                        required: true,
                        maxLength: 50,
                    })}
                    type="password"
                    onChange={onChangeHandler}
                />
                {errors.password && (
                    <span className="form__error">{showPasswordError()}</span>
                )}
                {error ? <span className="form__error">{error}</span> : null}
                <div className="form__confirm">
                    <Checkbox
                        onClick={handleCheckbox}
                        id="register_confirm"
                        group="register_confirm"
                        label={`Я принимаю условия`}
                        {...register("confirm")}
                    />
                    <Link to={router.reset_password}>Забыл пароль</Link>
                </div>

                <Button
                    className="form__button"
                    theme={"beforesubmit"}
                    type="submit"
                >
                    <img src={key} alt="key" />
                    {!loaded ? <SpinnerLoad /> : "АВТОРИЗОВАТЬСЯ"}
                </Button>
                <Button
                    className="form__button"
                    theme={"aftersubmit"}
                    onClick={() => navigate(router.signin)}
                >
                    Зарегистрироваться
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;
