import React, { useEffect, useState } from "react";

//Components
import Field from "@components/Field";
import Select from "@components/Select";
import { Calendar } from "react-calendar";

//Styles
import "react-calendar/dist/Calendar.css";
import MessageBlock from "../../UI/MessageBlock";

const messagesData = [
    {
        succesfull: "failed",
        title: "Доход с группы (#9379992)",
        date: "2019-06-11T00:00",
        sum: "200",
    },
    {
        succesfull: "fechted",
        title: "Доход с группы (#9379992)",
        date: "2019-06-11T00:00",
        sum: "200",
    },
    {
        succesfull: "load",
        title: "Доход с группы (#9379992)",
        date: "2019-06-11T00:00",
        sum: "2300",
    },
];

const GroupCash = () => {
    const [dateOneShow, setDateOneShow] = useState(false);
    const [dateTwoShow, setDateTwoShow] = useState(false);
    const [dateOne, setDateOne] = useState(null);
    const [dateTwo, setDateTwo] = useState(null);
    const [select, setSelect] = useState("Все");

    const setDateTwoToggle = () => {
        setDateTwoShow(true);
        setDateOneShow(false);
    };

    const setDateOneToggle = () => {
        setDateOneShow(true);
        setDateTwoShow(false);
    };

    document.addEventListener("click", (e) => {
        if (e.target.localName !== "input") {
            if (
                e.path[1].className.includes("react-calendar") ||
                e.path[3].className.includes("react-calendar") ||
                e.path[4].className.includes("react-calendar")
            ) {
                return;
            } else {
                setDateOneShow(false);
                setDateTwoShow(false);
            }
        }
    });

    return (
        <div className="history_page history_payment">
            <div className="history_page__title">
                <span>Доходы с групп</span>
            </div>
            <div className="history_page__filter">
                <div className="history_page__filter__date">
                    <Field
                        label="Дата от"
                        placeholder="-- / -- / ----"
                        onFocus={setDateOneToggle}
                        value={
                            dateOne
                                ? new Date(dateOne).toLocaleDateString()
                                : ""
                        }
                    />
                    {dateOneShow ? (
                        <Calendar
                            className="calendar_one"
                            onChange={setDateOne}
                            value={dateOne}
                        />
                    ) : null}
                </div>
                <div className="history_page__filter__date">
                    <Field
                        label="Дата от"
                        placeholder="-- / -- / ----"
                        onFocus={setDateTwoToggle}
                        value={
                            dateTwo
                                ? new Date(dateOne).toLocaleDateString()
                                : ""
                        }
                    />
                    {dateTwoShow ? (
                        <Calendar
                            className="calendar_one"
                            onChange={setDateTwo}
                            value={dateTwo}
                        />
                    ) : null}
                </div>
                <div className="history_page__filter__select">
                    <label>Статус</label>
                    <Select
                        defaultOption={select}
                        onChange={(e) => setSelect(e)}
                    >
                        <li>Все</li>
                        <li>Успешно</li>
                        <li>Не успешно</li>
                        <li>Ожидание</li>
                    </Select>
                </div>
            </div>
            <div className="history_page__messages_info">
                <div className="history_page__messages_info__title opacity f12">
                    <span>Список операций</span>
                </div>
                <div className="history_page__messages_info__content">
                    {messagesData.map((e) => (
                        <MessageBlock {...e} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GroupCash;
