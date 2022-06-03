import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";

//Image
import logo from "@assets/img/logo.svg";
import plus from "@assets/img/plus.svg";
import arrow from "@assets/img/selectArrow.svg";

//Router
import router from "@utils/router";

//Style
import "./Header.scss";

//Components
import UserInfoBlock from "@components/UI/UserInfoBlock";
import DropMenu from "@components/DropMenu";
import { me } from "../../store/user/user.api";
import { useDispatch, useSelector } from "react-redux";

const headerRoutes = [
    {
        url: router.main,
        title: "Главная",
    },
    {
        url: router.about,
        title: "О компании",
    },
    {
        url: router.trade_group,
        title: "Трейд групп",
    },
    {
        url: router.copy_trade,
        title: "Копи Трейд",
    },
    {
        url: router.faq,
        title: "Вопросы и ответы",
    },
    {
        url: router.contacts,
        title: "Контакты",
    },
];

const Header = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    return (
        <div className="header">
            <div className="header__logo">
                <Link to={router.main}>
                    <img src={logo} alt="" />
                </Link>
            </div>
            <nav className="header__menu">
                {headerRoutes.map((e) => (
                    <NavLink to={e.url}>
                        <img src={arrow} alt="arrow" />
                        <img src={plus} alt="plus" />

                        {e.title}
                    </NavLink>
                ))}
            </nav>
            <div className="header__userblock">
                {user ? (
                    <UserInfoBlock
                        order={true}
                        email={user.email}
                        name={`${user.first_name} ${user.last_name}`}
                        onClick={() => navigate(router.dashboard)}
                        logo="https://cdn.dribbble.com/users/24078/screenshots/15522433/media/e92e58ec9d338a234945ae3d3ffd5be3.jpg?compress=1&resize=400x300"
                    />
                ) : null}
                {/* <div className="header__userblock__theme">
                    <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            opacity="0.2"
                            d="M0.25 9C0.25 4.19531 4.15625 0.25 8.96094 0.25C9.42969 0.25 10.1328 0.328125 10.5625 0.40625C10.9531 0.484375 11.0312 0.992188 10.6797 1.1875C8.57031 2.39844 7.24219 4.66406 7.24219 7.125C7.24219 11.4219 11.1094 14.6641 15.3672 13.8828C15.7578 13.8047 15.9922 14.2344 15.7578 14.5469C14.1172 16.5391 11.6562 17.75 8.96094 17.75C4.15625 17.75 0.25 13.8438 0.25 9Z"
                            fill="black"
                        />
                    </svg>

                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11 7.25C8.89062 7.25 7.25 8.92969 7.25 10.9609C7.25 12.9922 8.89062 14.75 11 14.75C13.0703 14.75 14.7109 13.0703 14.7109 11C14.7109 8.96875 13.0703 7.25 11 7.25ZM20.8828 14.5547L18.4219 11L20.8828 7.44531C21.1172 7.05469 20.9219 6.58594 20.4922 6.50781L16.2344 5.72656L15.4531 1.46875C15.375 1.03906 14.9062 0.84375 14.5547 1.07812L11 3.57812L7.40625 1.11719C7.01562 0.882812 6.54688 1.07812 6.46875 1.50781L5.72656 5.76562L1.46875 6.54688C1.03906 6.625 0.84375 7.09375 1.07812 7.44531L3.53906 11L1.07812 14.5938C0.84375 14.9453 1.03906 15.4141 1.46875 15.4922L5.72656 16.2734L6.50781 20.5312C6.58594 20.9609 7.05469 21.1562 7.40625 20.9219L11 18.4609L14.5547 20.9219C14.9062 21.1562 15.375 20.9609 15.4531 20.5312L16.2344 16.2734L20.4922 15.4922C20.9219 15.4141 21.1172 14.9453 20.8828 14.5547ZM11 16C8.22656 16 6 13.7344 6 11C6 8.26562 8.26562 6.03906 11 6.03906C13.6953 6.03906 15.9609 8.30469 15.9609 11C15.9609 13.7734 13.7344 16 11 16Z"
                            fill="#7972F3"
                        />
                    </svg>
                </div> */}
            </div>

            <DropMenu user={user} />
        </div>
    );
};

export default Header;
