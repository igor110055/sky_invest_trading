import React from "react";

//Components
import CardInfo from "@components/CardInfo";
import InfoBlock from "@components/UI/InfoBlock";
import Button from "@components/Button";
import CryptoPick from "@components/CryptoPick";

//Icon
import arrowTop from "@assets/img/arrowTop.svg";
import btcIcon from "@assets/img/btc.svg";
import usdtIcon from "@assets/img/usdt.svg";

//Styles
import "./MyCopy.scss";

const mockData = {
    mygroup: [
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            from: "30",
            to: "50",
            completed: "50",
            started: false,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            from: "100",
            to: "700",
            completed: "80",
            started: true,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            from: "600",
            to: "4000",
            completed: "30",
            started: false,
        },
        {
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

const MyCopy = () => {
    return (
        <div className="main">
            <div className="main__header">
                <div className="main__header__title">
                    <div className="main__header__title__back"></div>
                    <svg
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.39844 0.886719C6.58984 0.804688 6.78125 0.75 7 0.75C7.19141 0.75 7.38281 0.804688 7.57422 0.886719L13.5352 3.56641C13.8086 3.67578 14 3.94922 14 4.25C14 4.57812 13.8086 4.85156 13.5352 4.96094L7.57422 7.64062C7.38281 7.72266 7.19141 7.75 7 7.75C6.78125 7.75 6.58984 7.72266 6.39844 7.64062L0.4375 4.96094C0.164062 4.85156 0 4.57812 0 4.25C0 3.94922 0.164062 3.67578 0.4375 3.56641L6.39844 0.886719ZM7 1.625C6.89062 1.625 6.80859 1.65234 6.75391 1.67969L1.01172 4.25L6.75391 6.84766C6.80859 6.875 6.89062 6.875 7 6.875C7.08203 6.875 7.16406 6.875 7.21875 6.84766L12.9609 4.25L7.21875 1.67969C7.16406 1.65234 7.08203 1.625 7 1.625ZM2.13281 6.76562C2.24219 6.98438 2.13281 7.25781 1.91406 7.36719L1.01172 7.75L6.75391 10.3477C6.80859 10.375 6.89062 10.375 7 10.375C7.08203 10.375 7.16406 10.375 7.21875 10.3477L12.9609 7.75L12.0586 7.36719C11.8398 7.25781 11.7305 6.98438 11.8398 6.76562C11.9492 6.54688 12.1953 6.46484 12.4141 6.54688L13.5352 7.06641C13.8086 7.17578 14 7.44922 14 7.75C14 8.07812 13.8086 8.35156 13.5352 8.46094L7.57422 11.1406C7.38281 11.2227 7.19141 11.25 7 11.25C6.78125 11.25 6.58984 11.2227 6.39844 11.1406L0.4375 8.46094C0.164062 8.35156 0 8.07812 0 7.75C0 7.44922 0.164062 7.17578 0.4375 7.06641L1.55859 6.54688C1.77734 6.46484 2.02344 6.54688 2.13281 6.76562ZM1.01172 11.25L6.75391 13.8477C6.80859 13.875 6.89062 13.875 7 13.875C7.08203 13.875 7.16406 13.875 7.21875 13.8477L12.9609 11.25L12.0586 10.8672C11.8398 10.7578 11.7305 10.4844 11.8398 10.2656C11.9492 10.0469 12.1953 9.96484 12.4141 10.0469L13.5352 10.5664C13.8086 10.6758 14 10.9492 14 11.25C14 11.5781 13.8086 11.8516 13.5352 11.9609L7.57422 14.6406C7.38281 14.7227 7.19141 14.75 7 14.75C6.78125 14.75 6.58984 14.7227 6.39844 14.6406L0.4375 11.9609C0.164062 11.8516 0 11.5781 0 11.25C0 10.9492 0.164062 10.6758 0.4375 10.5664L1.55859 10.0469C1.77734 9.96484 2.02344 10.0469 2.13281 10.2656C2.24219 10.4844 2.13281 10.7578 1.91406 10.8672L1.01172 11.25Z"
                            fill="#09090E"
                        />
                    </svg>

                    <span>Мои копирования</span>
                </div>
                <div className="main__header__info_group">
                    <span>Прибыль за 24 часа: +958 USDT</span>
                </div>
            </div>
            <div className="main__mycopy_content">
                {mockData.mygroup.map((e) => (
                    <CardInfo
                        className="main__mycopy_content__card"
                        name={e.name}
                        email={e.email}
                        rating={e.rating}
                        logo="https://cdn.dribbble.com/users/24078/screenshots/15522433/media/e92e58ec9d338a234945ae3d3ffd5be3.jpg?compress=1&resize=400x300"
                    >
                        <div className="main__mycopy_content__card__profit">
                            <InfoBlock
                                label={"Уровень ROI"}
                                value="+ 23.31 %"
                                fontSize="12"
                                color="green"
                                vWeigth="700"
                                opactityLabel
                            />
                            <InfoBlock
                                label={"Профит"}
                                value="+ 23.31 %"
                                fontSize="12"
                                color="green"
                                vWeigth="700"
                                opactityLabel
                            />
                            <InfoBlock
                                label={"Уровень MDD"}
                                value="+ 23.31 %"
                                fontSize="12"
                                vWeigth="700"
                                opactityLabel
                            />
                        </div>
                        <div className="main__mycopy_content__card__traid_cryptobtn">
                            <Button theme="whitebg">
                                <img src={arrowTop} alt="arrow" />
                                <span>Long</span>
                            </Button>
                            <Button theme="transparent">
                                <img src={usdtIcon} alt="arrow" />
                                <span>Long</span>
                            </Button>
                            <Button theme="whitebg">
                                <img src={usdtIcon} alt="arrow" />
                                <span>Long</span>
                            </Button>
                        </div>
                        <div className="main__mycopy_content__card__cryptobtn">
                            <CryptoPick />
                            <CryptoPick />
                            <CryptoPick />
                        </div>
                        <div className="main__mycopy_content__card__pricebtn">
                            <span>
                                Цена <b>200 $</b>
                            </span>
                            <Button theme="aftersubmit">Отписаться</Button>
                        </div>
                    </CardInfo>
                ))}
            </div>
        </div>
    );
};

export default MyCopy;
