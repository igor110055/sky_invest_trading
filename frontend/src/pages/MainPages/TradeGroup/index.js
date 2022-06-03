import React, { useState } from "react";

//Icons
import tradeGroup from "@assets/img/forAboutCauses.svg";

//Components
import CardInfo from "@components/CardInfo";
import Button from "@components/Button";
import ProgressBar from "@components/ProgressBar";
import Footer from "@components/Footer";

//Styles
import "./TradeGroup.scss";
import InsideGroupModal from "../../../components/Modals/InsideGroupModal";
import InvestorGroup from "../../../components/InvestorComponents/InvestorGroup";

const mockData = {
    mygroup: [
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            from: "30",
            to: "50",
            completed: "50",
            started: true,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            from: "100",
            to: "700",
            completed: "80",
            started: false,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            from: "600",
            to: "4000",
            completed: "30",
            started: true,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            from: "30",
            to: "50",
            completed: "50",
            started: true,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            from: "100",
            to: "700",
            completed: "80",
            started: false,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            from: "600",
            to: "4000",
            completed: "30",
            started: true,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            from: "30",
            to: "50",
            completed: "50",
            started: true,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            from: "100",
            to: "700",
            completed: "80",
            started: false,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            from: "600",
            to: "4000",
            completed: "30",
            started: true,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            from: "30",
            to: "50",
            completed: "50",
            started: true,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            from: "100",
            to: "700",
            completed: "80",
            started: false,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            from: "600",
            to: "4000",
            completed: "30",
            started: true,
        },
    ],
};

const TradeGroup = () => {
    const [copyTradeId, setCopyTradeId] = useState();

    return (
        <div className="main trade_group">
            <div className="main__content__premium">
                <div className="main__title">
                    <img src={tradeGroup} alt="instruct" />
                    <div className="main__title__text">
                        <p>Список</p>
                        <span>групп </span>
                    </div>
                </div>
                <div className="main__content__premium__desc">
                    <p>
                        Sky Invest занимается брокерской/дилерской деятельностью
                        на более 150 рынках по всему миру. В качестве брокера
                        Sky Invest предоставляет институционным и
                        профессиональным трейдерам прямой доступ к ("онлайн")
                    </p>
                </div>
            </div>

            <div className="main__trade_group">
                {mockData.mygroup.map((e) => (
                    <InvestorGroup e={e} />
                ))}
            </div>
            {copyTradeId && (
                <InsideGroupModal
                    handleChange={() => setCopyTradeId("")}
                    info={copyTradeId}
                />
            )}

            <Footer />
        </div>
    );
};

export default TradeGroup;
