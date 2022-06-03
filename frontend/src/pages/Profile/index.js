import React, { useState } from "react";

//Router
import router from "@utils/router";

//Layouts
import ProfileLayout from "@layouts/ProfileLayout";

//Styles
import "./Profile.scss";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Profile = () => {
    const [getTitle, setGetTitle] = useState("");
    const { isTraider } = useSelector((state) => state.user);

    const location = useLocation();
    const navigate = useNavigate();

    const changeBack = () => {
        if (location.search) {
            navigate(router.profile);
            setGetTitle("Профиль");
        } else {
            if (isTraider) {
                navigate(router.traider_page);
            } else {
                navigate(router.investor_page);
            }
        }
    };

    const renameBlock = (title) => {
        if (title) {
            setGetTitle(title);
        }
    };

    return (
        <div className="main history_header profile">
            <div className="main__header">
                <div className="main__header__title">
                    <div
                        className="history_header__back"
                        onClick={changeBack}
                    ></div>
                    <svg
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14 7.75C14 11.6328 10.8555 14.75 7 14.75C3.11719 14.75 0 11.6328 0 7.75C0 6.30078 0.4375 4.96094 1.20312 3.83984C1.33984 3.62109 1.61328 3.56641 1.80469 3.70312C1.99609 3.83984 2.05078 4.11328 1.91406 4.33203C1.25781 5.31641 0.875 6.49219 0.875 7.75C0.875 11.1406 3.60938 13.875 7 13.875C10.3633 13.875 13.125 11.1406 13.125 7.75C13.125 4.52344 10.6094 1.87109 7.4375 1.65234V3.8125C7.4375 4.05859 7.21875 4.25 7 4.25C6.75391 4.25 6.5625 4.05859 6.5625 3.8125V1.1875C6.5625 0.96875 6.75391 0.75 7 0.75C10.8555 0.75 14 3.89453 14 7.75ZM7.30078 7.44922C7.46484 7.61328 7.46484 7.91406 7.30078 8.07812C7.13672 8.24219 6.83594 8.24219 6.67188 8.07812L4.04688 5.45312C3.88281 5.28906 3.88281 4.98828 4.04688 4.82422C4.21094 4.66016 4.51172 4.66016 4.67578 4.82422L7.30078 7.44922Z"
                            fill="#09090E"
                        />
                    </svg>

                    <span>{getTitle ? getTitle : "Профиль"}</span>
                </div>
            </div>
            <div className="main__history_content">
                <ProfileLayout renameBlock={renameBlock} />
            </div>
        </div>
    );
};

export default Profile;
