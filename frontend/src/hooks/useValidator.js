import { useState } from "react";
import { emailRegEx, nameRegEx, passwordRegEx, phoneRegEx } from "@utils/regex";
import { checkIfFirstLetterInLowerCase } from "@utils/stringHelper";

export const useValidator = () => {
    const [errorData, setErrorData] = useState({
        fields: {
            email: false,
            password: false,
            password_confirm: false,
            phone: false,
            firstName: false,
            secondName: false,
        },
        error: "",
    });

    const setErrorFor = (errorField, valid, errorMsg) => {
        setErrorData((prev) => {
            return {
                fields: { ...prev.fields, [errorField]: !valid },
                error: errorMsg,
            };
        });
    };

    const isValid = (what, regex, errorField, errorMsg) => {
        let valid = false;

        if (regex.test(what)) {
            errorMsg = "";
            valid = true;
        } else {
            valid = false;
        }

        setErrorFor(errorField, valid, errorMsg);

        return valid;
    };

    const isEmailValid = (email) => {
        if (!email) {
            setErrorFor("email", false, "Поле Email обязательна");
            return;
        }

        return isValid(
            email,
            emailRegEx,
            "email",
            "Напишите корректно: example@gmail.com"
        );
    };

    const isPhoneValid = (phone) => {
        return isValid(phone, phoneRegEx, "phone", "Поле Телефон необходимо");
    };

    const isFirstNameValid = (name) => {
        if (checkIfFirstLetterInLowerCase(name)) {
            setErrorFor("firstName", false, "Имя должно быть с большой буквы");
            return;
        }

        return isValid(name, nameRegEx, "firstName", "Поле имя необходимо");
    };

    const isSecondNameValid = (name) => {
        if (checkIfFirstLetterInLowerCase(name)) {
            setErrorFor(
                "secondName",
                false,
                "Фамилия должна быть с большой буквы"
            );
            return;
        }

        return isValid(
            name,
            nameRegEx,
            "secondName",
            "Поле Фамилия обязательна"
        );
    };

    const isPasswordValid = (password, length) => {
        if (password.length < length) {
            setErrorFor("password", false, "Слишком короткий пароль");
            return;
        }

        return isValid(
            password,
            passwordRegEx,
            "password",
            "Поле пароль необходимо"
        );
    };

    const isPasswordConfirmValid = (password, length, confirm_password) => {
        if (confirm_password.length < length && confirm_password !== password) {
            setErrorFor("password_confirm", false, "Пароли не схожи");
            return;
        }

        if (confirm_password !== password) {
            setErrorFor("password_confirm", false, "Пароли не схожи");
            return;
        }

        return isValid(
            password,
            passwordRegEx,
            "password_confirm",
            "Поле пароль необходимо"
        );
    };

    const setError = (error) => {
        setErrorData((prev) => ({ ...prev, error: error }));
    };

    const hasInvalidFields = () => {
        return Object.values(errorData.fields).find((f) => f);
    };

    return {
        isEmailValid,
        errorData,
        setErrorData,
        setError,
        isPhoneValid,
        isFirstNameValid,
        isSecondNameValid,
        isPasswordValid,
        hasInvalidFields,
        isPasswordConfirmValid,
    };
};
