import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

//Icons
import logo from "@assets/img/logo.svg";
import insta from "@assets/img/inst.png";
import wt from "@assets/img/wt.png";
import tg from "@assets/img/tg.png";
import logoGray from "@assets/img/logoGray.svg";

//Components
import Button from "@components/Button";

//Styles
import "./Footer.scss";

//Router
import router from "@utils/router";

const headerRoutes = {
    firstUl: [
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
    ],
    secondUl: [
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
    ],
};

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className="footer">
            <div className="footer__media_auth">
                <div className="footer__media_auth__media">
                    <div className="footer__media_auth__media__logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="footer__media_auth__media__social">
                        <a href="https://instagram.com" target="_blank">
                            <img src={insta} alt="logo" />
                        </a>
                        <a href="https://wa.me/" target="_blank">
                            <img src={wt} alt="logo" />
                        </a>
                        <a href="https://t.me/" target="_blank">
                            <img src={tg} alt="logo" />
                        </a>
                    </div>
                </div>
                <div className="footer__media_auth__auth">
                    <span>
                        <svg
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.40625 4.1875C9.40625 3.83203 9.67969 3.53125 10.0625 3.53125C10.418 3.53125 10.7188 3.83203 10.7188 4.1875C10.7188 4.57031 10.418 4.84375 10.0625 4.84375C9.67969 4.84375 9.40625 4.57031 9.40625 4.1875ZM9.1875 9.875C8.91406 9.875 8.66797 9.875 8.42188 9.82031L7.65625 10.5586C7.54688 10.6953 7.38281 10.75 7.21875 10.75H6.125V11.8438C6.125 12.2266 5.82422 12.5 5.46875 12.5H4.375V13.5938C4.375 13.9766 4.07422 14.25 3.71875 14.25H0.65625C0.273438 14.25 0 13.9766 0 13.5938V10.9688C0 10.8047 0.0546875 10.6406 0.191406 10.5039L4.48438 6.21094C4.40234 5.82812 4.375 5.47266 4.375 5.0625C4.375 2.41016 6.50781 0.25 9.1875 0.25C11.8398 0.25 14 2.41016 14 5.0625C14 7.74219 11.8398 9.875 9.1875 9.875ZM9.1875 9C11.3477 9 13.125 7.25 13.125 5.0625C13.125 2.90234 11.3477 1.125 9.1875 1.125C7 1.125 5.25 2.90234 5.25 5.0625C5.25 5.39062 5.27734 5.69141 5.33203 5.99219L5.46875 6.48438L0.875 11.0781V13.375H3.5V11.625H5.25V9.875H7.10938L8.12109 8.89062L8.55859 8.97266C8.75 9 8.96875 9 9.1875 9Z"
                                fill="#09090E"
                            />
                        </svg>
                        У вас уже есть учётная запись
                    </span>
                    <Button
                        theme="beforesubmit"
                        onClick={() => navigate(router.login)}
                    >
                        Войти / Зарегистрироваться
                        <svg
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7 0.75C3.11719 0.75 0 3.89453 0 7.75C0 11.6328 3.11719 14.75 7 14.75C10.8555 14.75 14 11.6328 14 7.75C14 3.89453 10.8555 0.75 7 0.75ZM7 4.25C8.06641 4.25 8.96875 5.15234 8.96875 6.21875C8.96875 7.3125 8.06641 8.1875 7 8.1875C5.90625 8.1875 5.03125 7.3125 5.03125 6.21875C5.03125 5.15234 5.90625 4.25 7 4.25ZM7 13C5.55078 13 4.23828 12.4258 3.28125 11.4688C3.71875 10.3203 4.8125 9.5 6.125 9.5H7.875C9.16016 9.5 10.2539 10.3203 10.6914 11.4688C9.73438 12.4258 8.42188 13 7 13Z"
                                fill="#FDFDFE"
                            />
                        </svg>
                    </Button>
                </div>
            </div>
            <div className="footer__company_desc">
                <div className="footer__company_desc__logo">
                    <img src={logoGray} alt="logo" />
                    <span>
                        Копитрейдинг в один клик объединяющий более 10 тыс.
                        трейдеров Единый контракт позволяет размещать сделки без
                        дополнительной конвертации Единственные на рынке
                        поддерживаем USDC в качестве маржи.
                    </span>
                </div>
                <nav className="footer__company_desc__list">
                    {headerRoutes.firstUl.map((e) => (
                        <NavLink key={e.url} to={e.url}>
                            {e.title}
                        </NavLink>
                    ))}
                </nav>
                <nav className="footer__company_desc__list">
                    {headerRoutes.secondUl.map((e) => (
                        <NavLink key={e.url} to={e.url}>
                            {e.title}
                        </NavLink>
                    ))}
                </nav>
                <div className="footer__company_desc__contacts">
                    <div className="footer__company_desc__contacts__phone">
                        <span>Телефон:</span>
                        <p>
                            <a href="tel:+996508241111">+996 777 438 992</a>
                        </p>
                    </div>
                    <div className="footer__company_desc__contacts__email">
                        <span>Email:</span>
                        <p>
                            <a href="mailto:business@netex.kg">
                                business@netex.kg
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="footer__realise">
                <span>Sky Invest | 2022</span>
            </div>
        </div>
    );
};

export default Footer;
