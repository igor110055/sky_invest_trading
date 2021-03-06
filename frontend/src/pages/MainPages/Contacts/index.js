import React from "react";

//Icons
import logo from "@assets/img/forContacts.svg";

//Components
import MapContainer from "@components/Maps";
import Footer from "@components/Footer";

//Styles
import "./Contacts.scss";

const mockData = {
    contacts: [
        {
            title: "Номер",
            desc: "+996 (508) 24 11 11 (Whatsapp)",
            href: "tel:+996508241111",
            img: (
                <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M23.8281 1.92188L19.1406 0.796875C18.4375 0.65625 17.7344 1.03125 17.4531 1.64062L15.25 6.75C15.0156 7.35938 15.1562 8.0625 15.6719 8.4375L18.2031 10.5C16.6094 13.7812 13.9844 16.4062 10.7031 18L8.64062 15.4688C8.26562 14.9531 7.5625 14.8125 6.95312 15.0469L1.84375 17.25C1.23438 17.5312 0.859375 18.2344 1 18.9375L2.125 23.625C2.26562 24.3281 2.82812 24.7969 3.53125 24.7969C15.3438 24.7969 25 15.1406 25 3.32812C25 2.625 24.5312 2.0625 23.8281 1.92188ZM3.53125 24C3.20312 24 2.92188 23.8125 2.82812 23.4844L1.75 18.75C1.65625 18.4219 1.84375 18.0469 2.17188 17.9062L7.23438 15.75C7.5625 15.6094 7.89062 15.7031 8.07812 15.9375L10.5156 18.9375C16.7969 15.9844 18.8125 11.0156 19.1406 10.3125L16.1406 7.875C15.9062 7.6875 15.8125 7.3125 15.9531 7.03125L18.1094 1.96875C18.25 1.64062 18.625 1.45312 18.9531 1.54688L23.6875 2.625C24.0156 2.71875 24.25 3 24.25 3.32812C24.25 14.7188 14.9219 24 3.53125 24Z"
                        fill="#0D121F"
                    />
                </svg>
            ),
        },
        {
            title: "Электронная почта",
            desc: "business@netex.kg",
            href: "mailto:business@netex.kg",
            img: (
                <svg
                    width="24"
                    height="19"
                    viewBox="0 0 24 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M21 0.25H3C1.3125 0.25 0 1.60938 0 3.25V15.25C0 16.9375 1.3125 18.25 3 18.25H21C22.6406 18.25 24 16.9375 24 15.25V3.25C24 1.60938 22.6406 0.25 21 0.25ZM23.25 15.25C23.25 16.5156 22.2188 17.5 21 17.5H3C1.73438 17.5 0.75 16.5156 0.75 15.25V5.5L10.4062 13.2344C10.875 13.5625 11.3906 13.75 12 13.75C12.5625 13.75 13.125 13.5625 13.5469 13.2344L23.25 5.5V15.25ZM23.25 4.51562L13.0781 12.625C12.4688 13.1406 11.4844 13.1406 10.875 12.625L0.75 4.51562V3.25C0.75 2.03125 1.73438 1 3 1H21C22.2188 1 23.25 2.03125 23.25 3.25V4.51562Z"
                        fill="#0D121F"
                    />
                </svg>
            ),
        },
        {
            title: "Рабочее время",
            desc: "Пн-Пт 10:00-19:00",
            img: (
                <svg
                    width="22"
                    height="25"
                    viewBox="0 0 22 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.125 0.75C6.3125 0.75 6.5 0.9375 6.5 1.125V3.75H15.5V1.125C15.5 0.9375 15.6406 0.75 15.875 0.75C16.0625 0.75 16.25 0.9375 16.25 1.125V3.75H18.5C20.1406 3.75 21.5 5.10938 21.5 6.75V21.75C21.5 23.4375 20.1406 24.75 18.5 24.75H3.5C1.8125 24.75 0.5 23.4375 0.5 21.75V6.75C0.5 5.10938 1.8125 3.75 3.5 3.75H5.75V1.125C5.75 0.9375 5.89062 0.75 6.125 0.75ZM20.75 9.75H1.25V21.75C1.25 23.0156 2.23438 24 3.5 24H18.5C19.7188 24 20.75 23.0156 20.75 21.75V9.75ZM5.75 6.375V4.5H3.5C2.23438 4.5 1.25 5.53125 1.25 6.75V9H20.75V6.75C20.75 5.53125 19.7188 4.5 18.5 4.5H16.25V6.375C16.25 6.60938 16.0625 6.75 15.875 6.75C15.6406 6.75 15.5 6.60938 15.5 6.375V4.5H6.5V6.375C6.5 6.60938 6.3125 6.75 6.125 6.75C5.89062 6.75 5.75 6.60938 5.75 6.375Z"
                        fill="#0D121F"
                    />
                </svg>
            ),
        },
        {
            title: "Адрес",
            desc: "Hyatt Regency (191 Советская, Бишкек 720011)",
            img: (
                <svg
                    width="18"
                    height="25"
                    viewBox="0 0 18 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.25 9.25C5.25 7.1875 6.89062 5.5 9 5.5C11.0625 5.5 12.75 7.1875 12.75 9.25C12.75 11.3594 11.0625 13 9 13C6.89062 13 5.25 11.3594 5.25 9.25ZM9 6.25C7.3125 6.25 6 7.60938 6 9.25C6 10.9375 7.3125 12.25 9 12.25C10.6406 12.25 12 10.9375 12 9.25C12 7.60938 10.6406 6.25 9 6.25ZM18 9.25C18 13.375 12.5156 20.6406 10.0781 23.6875C9.51562 24.3906 8.4375 24.3906 7.875 23.6875C5.4375 20.6406 0 13.375 0 9.25C0 4.28125 3.98438 0.25 9 0.25C13.9688 0.25 18 4.28125 18 9.25ZM9 1C4.40625 1 0.75 4.70312 0.75 9.25C0.75 10.1406 1.03125 11.2656 1.54688 12.5312C2.10938 13.7969 2.8125 15.1562 3.65625 16.4688C5.29688 19.1406 7.26562 21.7188 8.4375 23.2188C8.71875 23.5469 9.23438 23.5469 9.51562 23.2188C10.6875 21.7188 12.6562 19.1406 14.2969 16.4688C15.1406 15.1562 15.8438 13.7969 16.4062 12.5312C16.9219 11.2656 17.25 10.1406 17.25 9.25C17.25 4.70312 13.5469 1 9 1Z"
                        fill="#0D121F"
                    />
                </svg>
            ),
        },
    ],
};

const Contacts = () => {
    return (
        <div className="main contacts">
            <div className="main__title">
                <img src={logo} alt="about" />
                <div className="main__title__text">
                    <p>Подробности о нашей</p>
                    <span>о компании </span>
                </div>
            </div>

            <div className="main__contacts__content">
                <ul className="main__contacts__content__links">
                    {mockData.contacts.map((e) => (
                        <li>
                            <div>{e.img}</div>
                            <div>
                                <span>{e.title}</span>
                                <a href={e.href}>{e.desc}</a>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="main__contacts__content__maps">
                    <MapContainer />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Contacts;
