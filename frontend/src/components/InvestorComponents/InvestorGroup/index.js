import React, { useState } from "react";

//Components
import CardInfo from "@components/CardInfo";
import Button from "@components/Button";
import ProgressBar from "@components/ProgressBar";
import { useNavigate } from "react-router";
import router from "../../../utils/router";

const InvestorGroup = ({ e, clean_group, setgroupid, className }) => {
    const navigate = useNavigate();
    const [readMore, setReadMore] = useState(true);

    const handleClick = () => {
        navigate(`${router.groups}/${e.id}`);
    };

    return (
        <CardInfo
            className={`${className}`}
            name={e.name}
            email={e.email}
            rating={e.rating}
            onClick={handleClick}
            logo="https://cdn.dribbble.com/users/24078/screenshots/15522433/media/e92e58ec9d338a234945ae3d3ffd5be3.jpg?compress=1&resize=400x300"
        >
            <div className="main__group_content__card__title">
                <span>Название группы</span>
            </div>
            <div
                className={`main__group_content__card__desc ${
                    readMore && "active"
                }`}
            >
                <p>
                    Внеси свой первый депозит на Bitget и получи +5% кешбэка на
                    счет USDT-M. Макс.выплата торгового бонуса составляет до
                    100$.
                </p>
            </div>
            <Button onClick={() => setReadMore(!readMore)}>ПОКАЗАТЬ ВСЕ</Button>
            <div className="main__group_content__card__linebar">
                <ProgressBar
                    completed={e.completed}
                    from={e.from}
                    to={e.to}
                    start="2019-06-11T00:00"
                    end="2019-06-11T00:00"
                />
            </div>
            {clean_group ? (
                <Button
                    onClick={() => setgroupid(e.name)}
                    theme={!e.started ? "beforesubmit" : "aftersubmit"}
                >
                    {!e.started ? "Вступить в группу" : "Выйти из группы"}
                </Button>
            ) : (
                <Button
                    disabled={e.started}
                    theme={e.started ? "disabled" : "aftersubmit"}
                >
                    {e.started ? "Группа старотовала" : "Выйти из группы"}
                </Button>
            )}
        </CardInfo>
    );
};

export default InvestorGroup;
