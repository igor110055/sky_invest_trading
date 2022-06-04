import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

//Components
import Header from "@components/Header";
import Sidebar from "@components/InvestorComponents/SideBar";
import SidebarTraider from "@components/TraiderComponents/SideBar";

//Hooks
import { usePageTitle } from "@hooks/useTitle";

//Style
import "./InvestorLayout.scss";
import { useSelector } from "react-redux";
import router from "../../utils/router";

const InvestorLayout = ({ children, ...props }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isTraider } = useSelector((state) => state.user);

    const { rename } = usePageTitle();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!user && !token) {
            navigate(router.login);
        }
    }, [user]);

    useEffect(() => {
        rename(props.title);
    }, [document.title]);

    const clickOnBack = () => {
        if (document.body.offsetWidth <= 1115) {
            document.addEventListener("click", (e) => {
                if (e.target.classList[0] === "main__header__title__back") {
                    if (user) {
                        if (isTraider) {
                            navigate(router.traider_page);
                        } else {
                            navigate(router.investor_page);
                        }
                    }
                }
            });
        } else if (location.pathname) {
            if (location.pathname === router.investor_page) {
                navigate(router.dashboard);
            } else if (location.pathname === router.traider_page) {
                navigate(router.dashboard);
            }
        }
    };

    useEffect(() => {
        clickOnBack();
    }, [location.search]);

    useEffect(() => {
        clickOnBack();
    }, []);

    return (
        <div className="investorlayout">
            <Header />

            <div className="investorlayout__group">
                {isTraider ? <SidebarTraider /> : <Sidebar />}

                <div className="investorlayout__group__content">{children}</div>
            </div>
        </div>
    );
};

export default InvestorLayout;
