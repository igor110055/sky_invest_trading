import React, { useEffect, useState } from "react";

//Form
import { SigninForm } from "@components/Forms";
import Footer from "@components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

//Icons
import back from "@assets/img/authbackground.jpg";

//Functions
import { regiter } from "../../../store/user/user.api";
import CompletedModal from "../../../components/Modals/CompletedModal";

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [completed, setCompleted] = useState(false);

    const { isAuth, messages } = useSelector((state) => state.user);

    useEffect(() => {
        if (messages === "register_success") {
            setCompleted(true);
        }
        if (isAuth) {
            navigate("/");
        }
    }, [isAuth, messages, navigate, dispatch]);

    const signinhandler = (data) => {
        dispatch(regiter(data));
    };

    return (
        <div className="main_auth">
            <div className="main_auth__content">
                <SigninForm fetchData={signinhandler} />
                <img src={back} alt="" />
            </div>
            {completed ? (
                <CompletedModal handleChange={() => setCompleted(false)} />
            ) : null}

            <Footer />
        </div>
    );
};

export default Signin;
