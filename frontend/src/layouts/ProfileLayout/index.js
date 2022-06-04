import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";

//Components
import {
    ProfileEdit,
    ProfilePassword,
    SideBar,
} from "@components/ProfileComponents";
import NotFound from "@components/NotFound";

//Hooks
import { usePageTitle } from "@hooks/useTitle";

//Style
import "./ProfileLayout.scss";

const allRoutes = [
    {
        component: ProfileEdit,
        type: "user-info",
        title: "Изменение информации",
    },
    {
        component: ProfilePassword,
        type: "password",
        title: "Изменение пароля",
    },
];

const ProfileLayout = (props) => {
    const location = useLocation();
    const { rename } = usePageTitle();
    const [searchParams, setSearchParams] = useSearchParams();
    const [render, setRenderBlock] = useState();
    const [sidebar, setSidebar] = useState();
    const [blockrender, setBlockrender] = useState();

    useEffect(() => {
        rightRender();
    }, [location.search]);

    useEffect(() => {
        window.addEventListener("resize", (e) => {
            rightRender();
        });
    }, []);

    const rightRender = () => {
        renderBlock(searchParams.get("type"));
        if (document.body.offsetWidth >= 700) {
            setSidebar(true);
            setBlockrender(true);
            if (!location.search) {
                setSearchParams({ type: "user-info" });
                renderBlock("user-info");
            }
        } else {
            if (!location.search) {
                setSidebar(true);
                setBlockrender(false);
            } else {
                setSidebar(false);
                setBlockrender(true);
            }
        }
    };

    const renderBlock = (type) => {
        const res = allRoutes.filter((e) => e.type === type)[0];
        if (res) {
            rename(`Профиль | ${res.title}`);
            setRenderBlock(<res.component />);
        } else {
            setRenderBlock(<NotFound codeError="404" />);
        }
    };

    return (
        <div className="profilelayout">
            {sidebar ? <SideBar /> : null}

            {blockrender ? (
                <div className="profilelayout__content">{render}</div>
            ) : null}
        </div>
    );
};

export default ProfileLayout;
