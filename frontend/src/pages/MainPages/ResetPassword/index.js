import React, { useEffect, useState } from "react";

//Components
import { ResetPasswordForm } from "@components/Forms";
import Footer from "@components/Footer";

//Icons
import back from "@assets/img/authbackground.jpg";

//Styles
import "./ResetPassword.scss";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../store/user/user.api";
import ActivationModal from "../../../components/Modals/ActivationModal";

const ResetPassword = () => {
    const [completed, setCompleted] = useState(false);
    const dispatch = useDispatch();
    const { messages } = useSelector((state) => state.user);
    const fetchReset = (data) => {
        dispatch(resetPassword(data));
    };

    useEffect(() => {
        if (messages === "reset_success") {
            setCompleted(true);
        }
    }, [messages]);

    const activatedHandle = (toggle) => {
        if (toggle) {
            setCompleted(false);
        }
    };

    return (
        <div className="main_auth">
            <div className="main_auth__content">
                <ResetPasswordForm fetchData={fetchReset} />
                <img src={back} alt="" />
            </div>
            {completed ? (
                <ActivationModal
                    title="Сслыка для изменения пароля отправлена вам на почту!"
                    desc="Нажмите на кнопку продолжить чтобы войти в личный
                кабинет"
                    handleChange={activatedHandle}
                />
            ) : null}

            <Footer />
        </div>
    );
};

export default ResetPassword;
