import React, { useState } from "react";

//Icon
import googleAuth from "@assets/img/googleAuth.svg";

//Components
import Button from "@components/Button";
import Switch from "@components/Switch";

//Styles
import "./GoogleAuthEdit.scss";

const GoogleAuthEdit = ({ handleChange, authbool, cashbool }) => {
    const [auth, setAuth] = useState(authbool);
    const [cash, setCash] = useState(cashbool);

    const onSubmit = () => {
        handleChange(auth, cash);
    };

    return (
        <div className="googleauth_edit">
            <div className="googleauth_edit__title">
                <img src={googleAuth} alt="googleauth" />
                <span>Google Authenticator</span>
            </div>
            <div className="googleauth_edit__desc">
                <p>
                    Используется для ввода кода подтверждения Google при снятии
                    и изменении настроек безопасности
                </p>
            </div>
            <div className="googleauth_edit__content">
                <div className="googleauth_edit__content__block">
                    <span>Авторизация</span>
                    <Switch
                        isOn={auth}
                        id="auth"
                        handleToggle={() => setAuth(!auth)}
                    />
                </div>
                <div className="googleauth_edit__content__block">
                    <span>Вывод стредств</span>
                    <Switch
                        isOn={cash}
                        id="cash"
                        handleToggle={() => setCash(!cash)}
                    />
                </div>
            </div>
            <Button
                onClick={onSubmit}
                className="googleauth_edit__button"
                theme="beforesubmit"
            >
                <svg
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12.7148 2.80469L10.418 0.507812C10.2266 0.316406 9.81641 0.125 9.51562 0.125H2.625C1.64062 0.125 0.875 0.917969 0.875 1.875V10.625C0.875 11.6094 1.64062 12.375 2.625 12.375H11.375C12.332 12.375 13.125 11.6094 13.125 10.625V3.73438C13.125 3.43359 12.9336 3.02344 12.7148 2.80469ZM7 10.625C6.01562 10.625 5.25 9.85938 5.25 8.875C5.25 7.91797 6.01562 7.125 7 7.125C7.95703 7.125 8.75 7.91797 8.75 8.875C8.75 9.85938 7.95703 10.625 7 10.625ZM9.625 4.9375C9.625 5.18359 9.40625 5.375 9.1875 5.375H3.0625C2.81641 5.375 2.625 5.18359 2.625 4.9375V2.3125C2.625 2.09375 2.81641 1.875 3.0625 1.875H9.1875C9.40625 1.875 9.625 2.09375 9.625 2.3125V4.9375Z"
                        fill="#FDFDFE"
                    />
                </svg>

                <span>Сохранить</span>
            </Button>
        </div>
    );
};

export default GoogleAuthEdit;
