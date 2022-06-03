import React, { useState } from "react";

//Components
import Button from "@components/Button";
import CardInfo from "../CardInfo";
import InfoBlock from "@components/UI/InfoBlock";
import RangeSlider from "@components/RangeSlider";
import Checkbox from "@components/Checkbox";
import ProgressBar from "@components/ProgressBar";

//Icons
import balance from "@assets/img/balance.svg";

//Styles
import "./Modal.scss";

const InsideGroupModal = ({ handleChange, info }) => {
    const [pareChange, setPareChange] = useState(0);

    const hadnleClick = (toggle) => {
        if (toggle) {
            console.log(toggle);
        } else {
            handleChange(0);
        }
    };

    const rangeChange = (length) => {
        console.log(length);
    };

    return (
        <div className="modal">
            <div className="modal__block">
                <div className="modal__block__title">
                    <span>Название группы</span>
                </div>
                <div className="modal__block__desc opacity">
                    <span>
                        Внеси свой первый депозит на Bitget и получи +5% кешбэка
                        на счет USDT-M. Макс.выплата торгового бонуса составляет
                        до 100$.
                    </span>
                </div>
                <div className="modal__block__line"></div>
                <CardInfo
                    className="modal__block__profit"
                    name={"Богдан Богданов"}
                    email={"danghoang87hl@gmail.com"}
                    rating={"50/50"}
                    logo="https://cdn.dribbble.com/users/24078/screenshots/15522433/media/e92e58ec9d338a234945ae3d3ffd5be3.jpg?compress=1&resize=400x300"
                />
                <div className="modal__block__line"></div>
                <span className="w700 f12">Пары:</span>
                <span className="w400 f12">120 дней</span>
                <ProgressBar
                    completed={"80"}
                    from={"100"}
                    to={"5000"}
                    start="2019-06-11T00:00"
                    end="2019-06-11T00:00"
                />
                <span className="w700 f12">ВАША СУММА ВСТУПЛЕНИЯ</span>
                <RangeSlider
                    min={0}
                    max={500}
                    onChange={(e) => rangeChange(e)}
                />
                <div className="modal__block__confirm">
                    <Checkbox
                        id={info}
                        onClick={() => console.log("confirm")}
                        label="Я принимаю условия"
                    />
                    <span>
                        <a href="#">соглашения</a>
                    </span>
                </div>
                <div className="modal__block__btns">
                    <Button
                        className="modal__block__btns__button"
                        theme="aftersubmit"
                        onClick={() => hadnleClick(false)}
                    >
                        Отмена
                    </Button>
                    <Button
                        className="modal__block__btns__button"
                        theme="beforesubmit"
                        onClick={() => hadnleClick(true)}
                    >
                        Вступить
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InsideGroupModal;
