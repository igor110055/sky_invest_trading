import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";

//Components
import {
    HistoryCash,
    HistoryGroup,
    HistoryGroupCash,
    HistoryPayment,
    HistoryTradeCash,
    HistoryTradeCopy,
    SideBar,
} from "@components/HistoryComponents";
import NotFound from "@components/NotFound";

//Hooks
import { usePageTitle } from "@hooks/useTitle";

//Style
import "./HistoryLayout.scss";
import { useSelector } from "react-redux";
import TraiderSideBar from "../../components/HistoryComponents/TraiderHistory";

const allRoutes = [
    {
        component: HistoryCash,
        type: "cash",
        title: "Вывод",
    },
    {
        component: HistoryGroup,
        type: "group",
        title: "Групп",
    },
    {
        component: HistoryGroupCash,
        type: "group-cash",
        title: "Доходы с групп",
    },
    {
        component: HistoryTradeCopy,
        type: "trade-copy",
        title: "Копирование",
    },
    {
        component: HistoryTradeCash,
        type: "trade-cash",
        title: "Доходы копирования",
    },
    {
        component: HistoryPayment,
        type: "payment",
        title: "Пополнение",
    },
];

const HistoryLayout = ({ children, setGetTitle, ...props }) => {
    const location = useLocation();
    const { rename } = usePageTitle();
    const [searchParams, setSearchParams] = useSearchParams();
    const [render, setRenderBlock] = useState();
    const [blockrender, setBlockrender] = useState();
    const [sidebar, setSidebar] = useState();
    const { isTraider } = useSelector((state) => state.user);

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
                setSearchParams({ type: "payment" });
                renderBlock("payment");
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
            rename(`История операции | ${res.title}`);
            setGetTitle(res.title);
            setRenderBlock(<res.component />);
        } else {
            setRenderBlock(<NotFound codeError="404" />);
        }
    };

    return (
        <div className="historylayout">
            {sidebar ? isTraider ? <TraiderSideBar /> : <SideBar /> : null}

            {blockrender ? (
                <div className="historylayout__content">{render}</div>
            ) : null}
        </div>
    );
};

export default HistoryLayout;
