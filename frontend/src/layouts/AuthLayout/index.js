import React, { useEffect } from "react";

//Components
import Header from "@components/Header";

//Hooks
import { usePageTitle } from "@hooks/useTitle";

//Style
import "./AuthLayout.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import router from "../../utils/router";

const AuthLayout = ({ children, ...props }) => {
    const { rename } = usePageTitle();
    const navigate = useNavigate();
    const { user, isAuth } = useSelector((state) => state.user);

    useEffect(() => {
        rename(props.title);
    }, []);

    useEffect(() => {
        if (isAuth || user) {
            navigate(router.dashboard);
        }
    }, [isAuth, user]);

    return (
        <div className="authlayout">
            <Header />

            <div className="authlayout__content">
                <div className="authlayout__content__block">{children}</div>
                <div className="authlayout__content__beautyblock"></div>
            </div>
        </div>
    );
};

export default AuthLayout;
