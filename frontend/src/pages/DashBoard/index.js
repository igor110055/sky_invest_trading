import React from "react";

//Component
import CardInfo from "@components/CardInfo";
import Select from "@components/Select";
import UserInfoBlock from "@components/UI/UserInfoBlock";
import InfoBlock from "@components/UI/InfoBlock";
import Button from "@components/Button";
import LineChart from "@components/LineChart";
import CryptoPick from "@components/CryptoPick";

//Icon
import arrowTop from "@assets/img/arrowTop.svg";
import btcIcon from "@assets/img/btc.svg";
import usdtIcon from "@assets/img/usdt.svg";

//Styles
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import SpinnerLoad from "../../components/SpinnerLoad";
import TraiderDashBoard from "./TraiderDashboard";
import InvestorDashBoard from "./InvestorDashboard";

const mockData = {
    userinfo: [
        { label: "", value: "+996 777 438 992" },
        { label: "Email", value: "temakonkin@gmail.com" },
        { label: "Последний вход", value: "15.08.2022" },
        { label: "Дата регистрации", value: "15.08.2022" },
    ],
    mycopy: [
        { name: "User Name", email: "username@mail.com", rating: "50/50" },
        { name: "User Name", email: "username@mail.com", rating: "50/50" },
        { name: "User Name", email: "username@mail.com", rating: "50/50" },
        { name: "User Name", email: "username@mail.com", rating: "50/50" },
    ],
};

const DashBoard = React.memo(() => {
    const { user, isTraider } = useSelector((state) => state.user);

    return user ? (
        isTraider ? (
            <TraiderDashBoard />
        ) : (
            <InvestorDashBoard />
        )
    ) : (
        <div className="main">
            <SpinnerLoad />
        </div>
    );
});

export default DashBoard;
