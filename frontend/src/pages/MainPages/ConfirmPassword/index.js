import React, { useEffect, useState } from "react";

//Components
import { NewPassword } from "@components/Forms";
import Footer from "@components/Footer";

//Icons
import back from "@assets/img/authbackground.jpg";

//Styles
import "./ConfirmPassword.scss";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { confirmPassword, resetPassword } from "../../../store/user/user.api";
import router from "../../../utils/router";
import ActivationModal from "../../../components/Modals/ActivationModal";

const ConfirmPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState();
    const [completed, setCompleted] = useState(false);
    const [uid, setUid] = useState();
    const [searchParams, setSearchParams] = useSearchParams();

    const { messages } = useSelector((state) => state.user);

    useEffect(() => {
        if (searchParams.get("token") && searchParams.get("id")) {
            setToken(searchParams.get("token"));
            setUid(searchParams.get("id"));
        }
    }, []);

    useEffect(() => {
        if (messages === "confirm_password_success") {
            setCompleted(true);
        }
    }, [messages]);

    const activatedHandle = (toggle) => {
        if (toggle) {
            navigate(router.login);
        }
    };

    const fetchConfirm = (data) => {
        if (token && uid) {
            const obj = {
                uid: uid,
                token: token,
                new_password: data.pass1,
            };
            dispatch(confirmPassword(obj));
        }
    };

    return (
        <div className="main_auth">
            <div className="main_auth__content">
                <NewPassword fetchData={fetchConfirm} />
                <img src={back} alt="" />
            </div>
            {completed ? (
                <ActivationModal
                    title="Пароль успешно изменен!"
                    desc="Нажмите на кнопку продолжить чтобы войти в личный
                кабинет"
                    handleChange={activatedHandle}
                />
            ) : null}

            <Footer />
        </div>
    );
};

export default ConfirmPassword;
