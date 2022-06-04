// pages

//Investor
import DashBoard from "@pages/DashBoard";
import Profile from "@pages/Profile";
import Groups from "@pages/Groups";
import Group from "@pages/Group";
import Cash from "@pages/Cash";
import History from "@pages/History";
import Payments from "@pages/Payments";
import MyCopy from "@pages/MyCopy";
import Security from "@pages/Security";
import Investor from "@pages/Investor";

//Traider
import CopySettings from "@pages/CopySettings";
// import Traider from "@pages/Traider";

//Auth
import Login from "@pages/MainPages/Login";
import Signin from "@pages/MainPages/Signin";
import ResetPassword from "@pages/MainPages/ResetPassword";
import ConfirmPassword from "@pages/MainPages/ConfirmPassword";
import Activation from "@pages/MainPages/Activation";

//Main
import Main from "@pages/MainPages/Main";
import About from "@pages/MainPages/About";
import TradeGroup from "@pages/MainPages/TradeGroup";
import CopyTrade from "@pages/MainPages/CopyTrade";
import FAQ from "@pages/MainPages/FAQ";
import Contacts from "@pages/MainPages/Contacts";

//404
import Page404 from "@pages/404";

// utils
import router from "@utils/router";
import Traider from "../pages/Traider";
import Verify from "../pages/Verify";

export const allRoutes = {
    investor: [
        {
            url: router.mycopy,
            component: MyCopy,
            layout: "investor",
            title: "Мои копирования",
        },
        {
            url: router.investor_page,
            component: Investor,
            layout: "investor",
            title: "Главная | Инвестор",
        },
    ],
    traider: [
        {
            url: router.copy_settings,
            component: CopySettings,
            layout: "investor",
            title: "Настройка копирования",
        },
        {
            url: router.verify,
            component: Verify,
            layout: "investor",
            title: "Верификация",
        },
        {
            url: router.traider_page,
            component: Traider,
            layout: "investor",
            title: "Главная | Трейдер",
        },
        {
            url: router.group,
            component: Group,
            layout: "investor",
            title: "Мои группы",
        },
    ],
    mains: [
        {
            url: router.main,
            component: Main,
            layout: "main",
            title: "Главная",
        },
        {
            url: router.about,
            component: About,
            layout: "main",
            title: "О компании",
        },
        {
            url: router.trade_group,
            component: TradeGroup,
            layout: "main",
            title: "Трейд групп",
        },
        {
            url: router.copy_trade,
            component: CopyTrade,
            layout: "main",
            title: "Копи Трейд",
        },
        {
            url: router.faq,
            component: FAQ,
            layout: "main",
            title: "Вопросы и ответы",
        },
        {
            url: router.contacts,
            component: Contacts,
            layout: "main",
            title: "Контакты",
        },
        {
            url: router.dashboard,
            component: DashBoard,
            layout: "investor",
            title: "DashBoard",
        },
        {
            url: router.groups,
            component: Groups,
            layout: "investor",
            title: "Мои группы",
        },
        {
            url: router.payment,
            component: Payments,
            layout: "investor",
            title: "Пополнение",
        },
        {
            url: router.cash,
            component: Cash,
            layout: "investor",
            title: "Вывод",
        },
        {
            url: router.history,
            component: History,
            layout: "investor",
            title: "История операции",
        },
        {
            url: router.security,
            component: Security,
            layout: "investor",
            title: "Безопастность",
        },
        {
            url: router.profile,
            component: Profile,
            layout: "investor",
            title: "Профиль",
        },
        {
            url: router.login,
            component: Login,
            layout: "auth",
            title: "Авторизация",
        },
        {
            url: router.signin,
            component: Signin,
            layout: "auth",
            title: "Авторизация",
        },
        {
            url: router.reset_password,
            component: ResetPassword,
            layout: "auth",
            title: "Сброс пароля",
        },
        {
            url: router.activated,
            component: Activation,
            layout: "auth",
            title: "Активация аккаунта",
        },
        {
            url: router.confirm_password,
            component: ConfirmPassword,
            layout: "auth",
            title: "Обновление пароля",
        },
    ],
};
