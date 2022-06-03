import React from "react";

//Icons
import logout from "@assets/img/logout.svg";

//Styles
import "./UserInfoBlock.scss";

const UserInfoBlock = ({
    logo = "",
    onClick,
    isLogout = false,
    order,
    id,
    name,
    email,
    className,
    handleChange,
}) => {
    const onHandleClick = () => {
        onClick();
    };

    return (
        <div className={`userinfoblock ${className}`} onClick={onHandleClick}>
            <div
                className={`userinfoblock__information ${order ? "order" : ""}`}
            >
                <img src={logo} alt="logo" />
                <div className="userinfoblock__information__desc">
                    <span>{name}</span>
                    <p>{email}</p>
                </div>
            </div>
            {isLogout ? (
                <div onClick={handleChange} className="userinfoblock__logout">
                    <img src={logout} alt="logout" />
                </div>
            ) : null}
        </div>
    );
};

export default UserInfoBlock;
