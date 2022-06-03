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
import "./TraiderDashboard.scss";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import SpinnerLoad from "../../../components/SpinnerLoad";
import TraiderGroup from "../../../components/TraiderComponents/TraiderGroup";

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
    ],
};

const TraiderDashBoard = React.memo(() => {
    const { user } = useSelector((state) => state.user);

    return user ? (
        <div className="main">
            <div className="main__header">
                <div className="main__header__title">
                    <div className="main__header__title__back"></div>
                    <svg
                        width="14"
                        height="13"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0.875 10.6875C0.875 11.4258 1.44922 12 2.1875 12H13.5625C13.7812 12 14 12.2188 14 12.4375C14 12.6836 13.7812 12.875 13.5625 12.875H2.1875C0.957031 12.875 0 11.918 0 10.6875V1.0625C0 0.84375 0.191406 0.625 0.4375 0.625C0.65625 0.625 0.875 0.84375 0.875 1.0625V10.6875ZM8.75 5L9.81641 3.93359C10.1719 3.57812 10.7734 3.60547 11.1016 3.98828L12.7969 5.95703C12.9883 6.20312 13.125 6.50391 13.125 6.80469V9.375C13.125 9.86719 12.7148 10.25 12.25 10.25H3.5C3.00781 10.25 2.625 9.86719 2.625 9.375V6.42188C2.625 6.09375 2.76172 5.73828 3.00781 5.49219L5.49609 3.00391C5.82422 2.67578 6.39844 2.67578 6.72656 3.00391L8.75 5ZM6.125 3.63281L3.60938 6.12109C3.52734 6.20312 3.5 6.3125 3.5 6.42188V9.375H12.25V6.80469C12.25 6.69531 12.1953 6.61328 12.1406 6.53125L10.4453 4.5625L9.35156 5.62891C9.1875 5.79297 8.96875 5.875 8.75 5.875C8.50391 5.875 8.28516 5.79297 8.12109 5.62891L6.125 3.63281Z"
                            fill="#09090E"
                        />
                    </svg>

                    <span>Dasboard</span>
                </div>
                <div className="main__header__info_group">
                    <span className="f12">Показать время</span>
                    <Select defaultOption="За 24 часа">
                        <li>За 24 часа</li>
                        <li>За 7 дней</li>
                        <li>За Месяц</li>
                    </Select>
                </div>
            </div>
            <div className="main__dashboard_content">
                <div className="main__dashboard_content__actives">
                    <UserInfoBlock
                        email={user.email}
                        name={`${user.first_name} ${user.last_name}`}
                        logo="https://cdn.dribbble.com/users/24078/screenshots/15522433/media/e92e58ec9d338a234945ae3d3ffd5be3.jpg?compress=1&resize=400x300"
                    />
                    <div className="main__dashboard_content__actives__time">
                        <span className="f12">Показать время</span>
                        <Select defaultOption="За 24 часа">
                            <li>За 24 часа</li>
                            <li>За 7 дней</li>
                            <li>За Месяц</li>
                        </Select>
                    </div>
                    <div className="main__dashboard_content__actives__profit">
                        <InfoBlock
                            label="Поступления в группы"
                            value={`${user.roi_level} %`}
                            vWeigth="700"
                            color="green"
                            opactityLabel
                        />
                        <InfoBlock
                            label="Доход групп"
                            value={`${user.profit} %`}
                            vWeigth="700"
                            color="green"
                            opactityLabel
                        />
                    </div>
                </div>
                <div className="main__dashboard_content__payments">
                    <InfoBlock
                        label="Поступления в группы"
                        value={`${user.roi_level} %`}
                        vWeigth="700"
                        color="green"
                        opactityLabel
                    />
                    <InfoBlock
                        label="Доход групп"
                        value={`${user.profit} %`}
                        vWeigth="700"
                        color="green"
                        opactityLabel
                    />
                    <InfoBlock
                        label="Людей в группах"
                        value={`${user.profit} %`}
                        vWeigth="700"
                        color="green"
                        opactityLabel
                    />
                    <InfoBlock
                        label="Людей копирование"
                        value={`${user.profit} %`}
                        vWeigth="700"
                        color="green"
                        opactityLabel
                    />
                </div>
                <div className="main__dashboard_content__userinfo">
                    <InfoBlock
                        label={"Телефон"}
                        value={user.phone_number}
                        lWeigth="700"
                        opactityValue
                    />
                    <InfoBlock
                        label={"Email"}
                        value={user.email}
                        lWeigth="700"
                        opactityValue
                    />
                    <InfoBlock
                        label={"Последний вход"}
                        value={user.last_login}
                        lWeigth="700"
                        date={true}
                        opactityValue
                    />
                    <InfoBlock
                        label={"Дата регистрации"}
                        value={user.date_joined}
                        date={true}
                        lWeigth="700"
                        opactityValue
                    />
                </div>
                <div className="main__dashboard_content__mycopy">
                    <div className="main__dashboard_content__mycopy__title">
                        <span>Последние группы</span>
                    </div>
                    <div className="main__dashboard_content__mycopy__content">
                        {mockData.mycopy.map((e) => (
                            <TraiderGroup e={e} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="main">
            <SpinnerLoad />
        </div>
    );
});

export default TraiderDashBoard;
