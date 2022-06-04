import React, { useEffect, useState } from "react";

//Components
import {
    GoogleAuth,
    GoogleAuthEdit,
    TwoAuthFactor,
    GoogleAuthSuccess,
} from "@components/SecurityComponents";

//Styles
import "./Security.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    create2FA,
    delete2FA,
    get2FAInfo,
    update2FA,
    verify2FA,
} from "../../store/security/secu.api";
import SpinnerLoad from "../../components/SpinnerLoad";
import { getParameterByName } from "../../utils/stringHelper";
import RemoveOtpModal from "../../components/Modals/RemoveOtp";
import TwoFACode from "../../components/Modals/TwoFACode";

const Security = () => {
    const [tab, setTab] = useState(1);
    const [load, setLoad] = useState(false);
    const [code, serCode] = useState();
    const [otp_cancel, setOtp_cancel] = useState(false);
    const [remove_otp_2fa, set_remove_otp_2fs] = useState(false);
    const dispatch = useDispatch();
    const { secu, qr, messages, auth, pay } = useSelector(
        (state) => state.secu
    );

    useEffect(() => {
        setLoad(true);
        dispatch(get2FAInfo());
        if (secu) {
            setTab(3);
        }
        setLoad(false);
    }, []);

    useEffect(() => {
        if (tab === 2) {
            dispatch(create2FA());
        } else if (tab === 3) {
            dispatch(get2FAInfo());
        }
    }, [tab]);

    const verifyFetch = ({ code }) => {
        dispatch(verify2FA(code));
        if (secu) {
            setTab(3);
        }
    };

    const editOtp = (auth, pay) => {
        dispatch(
            update2FA({
                otp_for_login: auth,
                otp_for_withdraw: pay,
            })
        );
        setTab(3);
    };

    useEffect(() => {
        if (secu) {
            setTab(3);
        } else {
            setTab(1);
        }
    }, [secu]);

    useEffect(() => {
        const code = getParameterByName("secret", qr);
        serCode(code);
    }, [qr]);

    console.log(messages);

    return !load ? (
        <div className="main">
            <div className="main__header">
                <div className="main__header__title">
                    <div className="main__header__title__back"></div>
                    <svg
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.7422 3.04688L7.49219 0.859375C7.32812 0.804688 7.16406 0.777344 7 0.777344C6.80859 0.777344 6.64453 0.804688 6.48047 0.859375L1.23047 3.04688C0.738281 3.26562 0.4375 3.73047 0.4375 4.25C0.4375 11.3047 5.60547 14.75 6.97266 14.75C8.33984 14.75 13.5625 11.3594 13.5625 4.25C13.5625 3.73047 13.2344 3.26562 12.7422 3.04688ZM12.6602 4.27734C12.6602 10.4297 8.12109 13.875 7 13.875C5.82422 13.875 1.3125 10.4023 1.3125 4.25C1.3125 4.08594 1.39453 3.92188 1.55859 3.86719L6.80859 1.67969C6.86328 1.65234 6.91797 1.625 7 1.625C7.05469 1.625 7.10938 1.65234 7.16406 1.67969L12.4141 3.86719C12.6602 3.97656 12.6602 4.19531 12.6602 4.27734ZM9.1875 5.72656C9.05078 5.72656 8.94141 5.75391 8.85938 5.83594L6.26172 8.46094L5.11328 7.3125C5.03125 7.23047 4.92188 7.17578 4.8125 7.17578C4.53906 7.17578 4.375 7.39453 4.375 7.61328C4.375 7.72266 4.40234 7.83203 4.48438 7.94141L5.96094 9.39062C6.04297 9.47266 6.15234 9.5 6.26172 9.5C6.37109 9.5 6.48047 9.47266 6.5625 9.39062L9.48828 6.46484C9.57031 6.38281 9.625 6.27344 9.625 6.16406C9.625 5.91797 9.43359 5.72656 9.1875 5.72656Z"
                            fill="#09090E"
                        />
                    </svg>

                    <span>Безопастность</span>
                </div>
            </div>
            <div className="main__security_content">
                {tab === 1 ? (
                    <GoogleAuth handleChange={(e) => setTab(e)} />
                ) : tab === 2 ? (
                    <TwoAuthFactor
                        qr={qr}
                        code={code}
                        handleChange={(e) => verifyFetch(e)}
                    />
                ) : tab === 3 ? (
                    <GoogleAuthSuccess
                        removeOtp={() => setOtp_cancel(true)}
                        handleChange={(e) => setTab(e)}
                    />
                ) : tab === 4 ? (
                    <GoogleAuthEdit
                        authbool={auth}
                        cashbool={pay}
                        handleChange={(auth, cash) => editOtp(auth, cash)}
                    />
                ) : null}
            </div>
            <div className="form__error">
                {messages === "delete_2fa"
                    ? "Ошибка с отключением двухфакторной аунтификации"
                    : messages === "info_error"
                    ? "Ошибка с получением данных о двухфакторной аунтификации"
                    : messages === "verify_2fa"
                    ? "Ошибка с подтвержением двухфакторной аунтификации"
                    : messages === "update_2fa"
                    ? "Ошибка с редактированием двухфакторной аунтификации"
                    : null}
            </div>
            {otp_cancel && (
                <RemoveOtpModal
                    handleChange={(e) => {
                        if (e) {
                            set_remove_otp_2fs(true);
                        }

                        setOtp_cancel(false);
                    }}
                />
            )}
            {remove_otp_2fa && (
                <TwoFACode
                    handleChange={(e) => {
                        dispatch(delete2FA(e));
                        set_remove_otp_2fs(false);
                    }}
                />
            )}
        </div>
    ) : (
        <div className="main">
            <SpinnerLoad />
        </div>
    );
};

export default Security;
