import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

//Components
import { ActivationForm } from "@components/Forms";
import Footer from "@components/Footer";

//Icons
import back from "@assets/img/authbackground.jpg";

import { useDispatch, useSelector } from "react-redux";
import { activation } from "../../../store/user/user.api";
import { useSearchParams } from "react-router-dom";
import ActivationModal from "../../../components/Modals/ActivationModal";
import router from "../../../utils/router";

const Activation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState();
    const [completed, setCompleted] = useState(false);
    const [uid, setUid] = useState();
    const [searchParams, setSearchParams] = useSearchParams();

    const { isAuth, messages } = useSelector((state) => state.user);

    const fetchActivatedData = () => {
        if (token && uid) {
            const obj = {
                uid: uid,
                token: token,
            };
            dispatch(activation(obj));
        }
    };

    if (isAuth) {
        navigate(-1);
    }

    useEffect(() => {
        if (searchParams.get("token") && searchParams.get("id")) {
            setToken(searchParams.get("token"));
            setUid(searchParams.get("id"));
        }
    }, []);

    useEffect(() => {
        if (messages === "activated") {
            setCompleted(true);
        }
    }, [isAuth, messages]);

    const activatedHandle = (toggle) => {
        if (toggle) {
            navigate(router.login);
        }
    };

    return (
        <div className="main_auth">
            <div className="main_auth__content">
                <ActivationForm fetchData={fetchActivatedData} />
                <img src={back} alt="" />
            </div>
            {completed ? (
                <ActivationModal
                    title="Аккаунт активирован!"
                    desc="Нажмите на кнопку продолжить чтобы войти в личный
                кабинет"
                    handleChange={activatedHandle}
                />
            ) : null}

            <Footer />
        </div>
    );
};

export default Activation;
// MjE/b5xjww-9dca1d594b23a0bd49578e1c97b46189
