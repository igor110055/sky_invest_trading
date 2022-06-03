import React, { useEffect } from "react";

//Components
import Header from "@components/Header";
//Hooks
import { usePageTitle } from "@hooks/useTitle";

//Style
import "./MainLayout.scss";

const MainLayout = ({ children, ...props }) => {
    const { rename } = usePageTitle();

    useEffect(() => {
        rename(props.title);
    }, [document.title]);

    return (
        <div className="mainlayout">
            <Header />

            <div className="mainlayout__content">{children}</div>

            <div className="mainlayout__modal"></div>
        </div>
    );
};

export default MainLayout;
