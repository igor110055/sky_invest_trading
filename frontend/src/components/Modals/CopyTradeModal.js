import React, { useState } from "react";

//Components
import Button from "@components/Button";
import CardInfo from "../CardInfo";
import InfoBlock from "@components/UI/InfoBlock";
import RangeSlider from "@components/RangeSlider";
import Checkbox from "@components/Checkbox";

//Icons
import balance from "@assets/img/balance.svg";

//Styles
import "./Modal.scss";

export const PareButton = () => {
    const [active, setActive] = useState(false);

    return (
        <Button
            theme={active ? "beforesubmit" : "aftersubmit"}
            onClick={() => setActive(!active)}
        >
            <img src={balance} alt="" />
            <span>USDTETH</span>
        </Button>
    );
};

const CopyTradeModal = ({ handleChange, info }) => {
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
                    <span>Копирование трейдера</span>
                </div>
                <div className="modal__block__desc opacity">
                    <span>
                        Вы можете выбрать пары и указать свою сумму, которую
                        будете копировать.
                    </span>
                </div>
                <div className="modal__block__line"></div>
                <CardInfo
                    className="modal__block__profit"
                    name={"Богдан Богданов"}
                    email={"danghoang87hl@gmail.com"}
                    rating={"50/50"}
                    logo="https://cdn.dribbble.com/users/24078/screenshots/15522433/media/e92e58ec9d338a234945ae3d3ffd5be3.jpg?compress=1&resize=400x300"
                >
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
                </CardInfo>
                <div className="modal__block__line"></div>
                <span className="w700 f12">Пары</span>
                <div className="modal__block__pare">
                    {Array.from({ length: 4 }).map((e) => (
                        <PareButton key={e} />
                    ))}
                </div>
                <Button>ПОКАЗАТЬ ВСЕ</Button>
                <span className="w700 f12">ВАША СУММА КОПИРОВАНИЯ</span>
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
                        Копировать
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CopyTradeModal;
