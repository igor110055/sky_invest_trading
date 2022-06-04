import React, { useEffect, useState } from "react";

//Components
import CardInfo from "@components/CardInfo";
import Button from "@components/Button";
import ProgressBar from "@components/ProgressBar";

//Styles
import "./Groups.scss";
import { useDispatch, useSelector } from "react-redux";
import { getMyGroups, getTraiderGroup } from "../../store/user/user.api";
import CreateGroupSidebar from "../../components/CreateGroupSidebar";
import TraiderGroup from "../../components/TraiderComponents/TraiderGroup";
import InvestorGroup from "../../components/InvestorComponents/InvestorGroup";
import { getGroups } from "../../store/group/group.api";
import SpinnerLoad from "../../components/SpinnerLoad";

const mockData = {
    mygroup: [
        {
            id: 4,
            name: "User Name",
            email: "username@mail.com",
            rating: "0/50",
            from: "30",
            to: "50",
            completed: "50",
            started: false,
        },
        {
            id: 3,
            name: "User Name",
            email: "username@mail.com",
            rating: "15/50",
            from: "100",
            to: "700",
            completed: "80",
            started: true,
        },
        {
            id: 2,
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            from: "600",
            to: "4000",
            completed: "30",
            started: false,
        },
        {
            id: 1,
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            from: "200",
            to: "900",
            completed: "40",
            started: true,
        },
    ],
};

const Groups = ({ title }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const { isTraider, user } = useSelector((state) => state.user);
    const { message, groups } = useSelector((state) => state.group);

    useEffect(() => {
        if (user) {
            if (isTraider) {
                dispatch(getGroups());
            } else {
                dispatch(getMyGroups());
            }
        }
    }, [user]);

    return groups ? (
        <div className="main">
            <div className="main__header">
                <div className="main__header__title">
                    <div className="main__header__title__back"></div>
                    <svg
                        width="18"
                        height="15"
                        viewBox="0 0 18 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16.5742 9.99219H16.3555V9.77344C16.3555 9.14453 15.8633 8.625 15.2344 8.625H14.1406C13.4844 8.625 12.9922 9.14453 12.9922 9.77344V9.99219H12.7734C12.1172 9.99219 11.625 10.5117 11.625 11.1406V12.2344C11.625 12.8906 12.1172 13.3828 12.7461 13.3828H12.9648V13.6016C12.9648 14.2578 13.457 14.75 14.1133 14.75H15.207C15.8359 14.75 16.3281 14.2578 16.3281 13.6016V13.3828H16.5469C17.2305 13.3828 17.75 12.8906 17.75 12.2344V11.1406C17.75 10.5117 17.2305 9.99219 16.5742 9.99219ZM16.875 12.2344C16.875 12.3984 16.7383 12.5078 16.6016 12.5078H15.5078V13.6016C15.5078 13.7656 15.3711 13.875 15.2344 13.875H14.1406C14.0039 13.875 13.8672 13.7656 13.8672 13.6016V12.5078H12.7734C12.6094 12.5078 12.5 12.3984 12.5 12.2344V11.1406C12.5 11.0039 12.6094 10.8672 12.7461 10.8672H13.8398V9.77344C13.8398 9.63672 13.9492 9.5 14.1133 9.5H15.207C15.3438 9.5 15.4531 9.63672 15.4531 9.77344V10.8672H16.5469C16.7383 10.8672 16.875 11.0039 16.875 11.1406V12.2344ZM13.8125 6C13.5117 6 13.2109 6.08203 12.9375 6.19141C12.7188 6.30078 12.6094 6.54688 12.6914 6.76562C12.7734 7.01172 13.0469 7.12109 13.293 7.01172C13.457 6.92969 13.6211 6.875 13.8125 6.875H15.5898C16.0273 6.875 16.4375 7.14844 16.6562 7.53125C16.7383 7.66797 16.875 7.75 17.0391 7.75C17.3945 7.75 17.5859 7.39453 17.4219 7.09375C17.0391 6.4375 16.3555 6 15.5898 6H13.8125ZM14.25 5.125C15.4531 5.125 16.4375 4.16797 16.4375 2.9375C16.4375 1.73438 15.4531 0.75 14.25 0.75C13.0195 0.75 12.0625 1.73438 12.0625 2.9375C12.0625 4.16797 13.0195 5.125 14.25 5.125ZM14.25 1.625C14.9609 1.625 15.5625 2.22656 15.5625 2.9375C15.5625 3.67578 14.9609 4.25 14.25 4.25C13.5117 4.25 12.9375 3.67578 12.9375 2.9375C12.9375 2.22656 13.5117 1.625 14.25 1.625ZM11.1875 13.875H4.625C4.70703 12.4258 6.01953 11.25 7.60547 11.25H10.3125C10.5312 11.25 10.75 11.0586 10.75 10.8125C10.75 10.5938 10.5312 10.375 10.3125 10.375H7.63281C5.47266 10.375 3.75 12.0156 3.75 14.0391C3.75 14.4492 4.07812 14.75 4.51562 14.75H11.1875C11.4062 14.75 11.625 14.5586 11.625 14.3125C11.625 14.0938 11.4062 13.875 11.1875 13.875ZM4.67969 7.01172C4.89844 7.12109 5.17188 7.01172 5.28125 6.79297C5.36328 6.57422 5.28125 6.32812 5.0625 6.21875C4.78906 6.08203 4.48828 6 4.1875 6H2.38281C1.20703 6 0.25 7.03906 0.25 8.26953V8.625C0.25 8.87109 0.441406 9.0625 0.6875 9.0625C0.90625 9.0625 1.125 8.87109 1.125 8.625V8.26953C1.125 7.50391 1.69922 6.875 2.38281 6.875H4.1875C4.35156 6.875 4.51562 6.92969 4.67969 7.01172ZM3.75 5.125C4.95312 5.125 5.9375 4.16797 5.9375 2.9375C5.9375 1.73438 4.95312 0.75 3.75 0.75C2.51953 0.75 1.5625 1.73438 1.5625 2.9375C1.5625 4.16797 2.51953 5.125 3.75 5.125ZM3.75 1.625C4.46094 1.625 5.0625 2.22656 5.0625 2.9375C5.0625 3.67578 4.46094 4.25 3.75 4.25C3.01172 4.25 2.4375 3.67578 2.4375 2.9375C2.4375 2.22656 3.01172 1.625 3.75 1.625ZM8.97266 9.5C10.5586 9.5 11.8164 8.24219 11.8164 6.65625C11.8164 5.09766 10.5312 3.8125 8.97266 3.8125C7.41406 3.8125 6.15625 5.09766 6.15625 6.65625C6.12891 8.24219 7.41406 9.5 8.97266 9.5ZM8.97266 4.6875C10.0664 4.6875 10.9414 5.58984 10.9414 6.65625C10.9414 7.75 10.0664 8.625 8.97266 8.625C7.90625 8.625 7.00391 7.75 7.00391 6.65625C7.00391 5.58984 7.90625 4.6875 8.97266 4.6875Z"
                            fill="#09090E"
                        />
                    </svg>

                    <span>Мои группы</span>
                </div>
                <div className="main__header__info_group">
                    <span>Прибыль за 24 часа: +958 USDT</span>
                </div>
            </div>
            <div className="main__group_create">
                {isTraider ? (
                    <Button theme="aftersubmit" onClick={() => setIsOpen(true)}>
                        Создать группу
                    </Button>
                ) : null}
            </div>
            <div className="main__group_content">
                {isTraider
                    ? groups.map((e) => <TraiderGroup e={e} />)
                    : mockData.mygroup.map((e) => <InvestorGroup e={e} />)}
                {isTraider
                    ? mockData.mygroup.map((e) => <TraiderGroup e={e} />)
                    : mockData.mygroup.map((e) => <InvestorGroup e={e} />)}
            </div>
            {isOpen ? (
                <CreateGroupSidebar toggle={() => setIsOpen(!isOpen)} />
            ) : null}
        </div>
    ) : (
        <div className="main">
            <SpinnerLoad />
        </div>
    );
};

export default Groups;
