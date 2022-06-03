import React from "react";

//Helpers
import { dateFormatter } from "@utils/stringHelper";

//Styles
import "./MessageBlock.scss";

const MessageBlock = ({
    title,
    date,
    card,
    sum,
    succesfull,
    copyStart = false,
    copyEnd = false,
}) => {
    return (
        <div className="messageblock">
            <div className="messageblock__header">
                <div className="messageblock__header__title">
                    <span>{title}</span>
                </div>
                {succesfull ? (
                    <div className="messageblock__header__success">
                        <span
                            className={
                                succesfull === "fechted"
                                    ? "success"
                                    : succesfull === "failed"
                                    ? "fail"
                                    : "load"
                            }
                        >
                            {succesfull === "fechted"
                                ? "Успешно"
                                : succesfull === "failed"
                                ? "Не успешно"
                                : "Ожидание"}
                        </span>
                    </div>
                ) : null}
            </div>
            {card ? (
                <div className="messageblock__card">
                    <span>Кошолек:</span>
                    <span className="opacity">{card}</span>
                </div>
            ) : null}
            <div className="messageblock__footer">
                <div className="messageblock__footer__date">
                    <span>
                        {copyStart
                            ? "Начало копирования:"
                            : copyEnd
                            ? "Конец копирования:"
                            : "Дата:"}
                    </span>
                    <span className="opacity">
                        {dateFormatter(new Date(date))}
                    </span>
                </div>
                {sum ? (
                    <div className="messageblock__footer__sum">
                        <span>Сумма:</span>
                        <span className="opacity">{sum}</span>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default MessageBlock;
