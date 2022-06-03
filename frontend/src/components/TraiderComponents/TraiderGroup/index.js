import React, { useState } from "react";

//Components
import CardInfo from "@components/CardInfo";
import Button from "@components/Button";
import ProgressBar from "@components/ProgressBar";
import { useNavigate } from "react-router";
import router from "../../../utils/router";
import { useSelector } from "react-redux";
import RemoveGroup from "../../Modals/RemoveGroup";
import { Link } from "react-router-dom";
import RaspustitModal from "../../Modals/RaspustitModal";

const TraiderGroup = ({ e }) => {
    const navigate = useNavigate();
    const [readMore, setReadMore] = useState(true);
    const [remove, setRemove] = useState(false);
    const [raspus, setRaspus] = useState(false);

    const { isTraider } = useSelector((state) => state.user);

    const handleClick = () => {
        if (isTraider) {
            navigate(`${router.groups}/${e.id}`);
        }
    };

    const handleGroup = (e) => {
        if (e === "remove") {
            setRemove(false);
        } else {
            setRemove(false);
        }
    };

    const handleRaspus = (e) => {
        if (e === "raspus") {
            setRaspus(false);
        } else {
            setRaspus(false);
        }
    };

    return (
        e && (
            <CardInfo
                className="main__group_content__card"
                name={"User Name"}
                email={"username@mail.com"}
                rating={e.rating}
                onClick={handleClick}
                logo="https://cdn.dribbble.com/users/24078/screenshots/15522433/media/e92e58ec9d338a234945ae3d3ffd5be3.jpg?compress=1&resize=400x300"
            >
                <div className="main__group_content__card__title">
                    <span>{e.title || "Название группы"}</span>
                </div>
                <div
                    className={`main__group_content__card__desc ${
                        readMore && "active"
                    }`}
                >
                    <p>
                        {e.description ||
                            `Внеси свой первый депозит на Bitget и получи +5% кешбэка на
                    счет USDT-M. Макс.выплата торгового бонуса составляет до
                    100$.`}
                    </p>
                </div>
                {e.description > 100 && (
                    <Button onClick={() => setReadMore(!readMore)}>
                        ПОКАЗАТЬ ВСЕ
                    </Button>
                )}
                <div className="main__group_content__card__linebar">
                    <ProgressBar
                        completed={e.need_sum / 500 - 1}
                        from={e.from || 500}
                        to={e?.need_sum}
                        start={e?.start_date}
                        end={e?.end_date}
                    />
                </div>
                {e?.investors ? (
                    <div style={{ display: "flex", gap: "16px" }}>
                        <Button
                            onClick={() => setRemove(true)}
                            theme={"danger"}
                        >
                            Удалить
                        </Button>
                        <Button
                            onClick={() => navigate(`${router.groups}/${e.id}`)}
                            theme={"aftersubmit"}
                        >
                            Подробнее
                        </Button>
                    </div>
                ) : e?.investors ? (
                    <div style={{ display: "flex", gap: "16px" }}>
                        <Button
                            onClick={() => setRaspus(true)}
                            theme={"aftersubmit"}
                        >
                            Распустить
                        </Button>
                        <Button
                            onClick={() => navigate(`${router.groups}/${e.id}`)}
                            theme={"aftersubmit"}
                        >
                            Подробнее
                        </Button>
                    </div>
                ) : null}
                {e.rating === "0/50" ? (
                    <div style={{ display: "flex", gap: "16px" }}>
                        <Button
                            onClick={() => setRemove(true)}
                            theme={"danger"}
                        >
                            Удалить
                        </Button>
                        <Button
                            onClick={() => navigate(`${router.groups}/${e.id}`)}
                            theme={"aftersubmit"}
                        >
                            Подробнее
                        </Button>
                    </div>
                ) : e.rating === "15/50" ? (
                    <div style={{ display: "flex", gap: "16px" }}>
                        <Button
                            onClick={() => setRaspus(true)}
                            theme={"aftersubmit"}
                        >
                            Распустить
                        </Button>
                        <Button
                            onClick={() => navigate(`${router.groups}/${e.id}`)}
                            theme={"aftersubmit"}
                        >
                            Подробнее
                        </Button>
                    </div>
                ) : e.rating === "50/50" ? (
                    <Button
                        onClick={() => navigate(`${router.groups}/${e.id}`)}
                        theme={"aftersubmit"}
                    >
                        Подробнее
                    </Button>
                ) : null}
                {remove ? <RemoveGroup handleChange={handleGroup} /> : null}

                {raspus ? <RaspustitModal handleChange={handleRaspus} /> : null}
            </CardInfo>
        )
    );
};

export default TraiderGroup;
