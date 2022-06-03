import React, { useState } from "react";

//Form
import { useForm } from "react-hook-form";

//Icons
import tradeIcon from "@assets/img/tradeIcon.svg";
import arrowTop from "@assets/img/arrowTop.svg";
import usdtIcon from "@assets/img/usdt.svg";

//Components
import Button from "@components/Button";
import CardInfo from "@components/CardInfo";
import InfoBlock from "@components/UI/InfoBlock";
import CryptoPick from "@components/CryptoPick";
import Footer from "@components/Footer";
import Select from "@components/Select";
import CopyTradeModal from "@components/Modals/CopyTradeModal";
import FreePlaceModal from "@components/Modals/FreePlaceModal";

//Field
import Field from "@components/Field";

//Styles
import "./CopyTrade.scss";

const mockData = {
    trade: [
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            copy: false,
            price: 300,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            copy: false,
            price: 300,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            copy: false,
            price: 300,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            copy: false,
            price: 300,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            copy: false,
            price: 300,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            copy: false,
            price: 300,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            copy: true,
            price: 300,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            copy: true,
            price: 300,
        },
        {
            name: "User Name",
            email: "username@mail.com",
            rating: "50/50",
            copy: true,
            price: 300,
        },
    ],
};

const CopyTrade = () => {
    const [loaded, setLoaded] = useState(true);
    const [copyTradeId, setCopyTradeId] = useState();
    const [freePlaceChange, setFreePlaceChange] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const onChangeHandler = (ev) => {
        setValue(ev.currentTarget.name, ev.currentTarget.value);
    };

    const onSubmitHandler = async (data) => {
        setLoaded(false);

        console.log(data);

        setLoaded(true);
    };

    return (
        <div className="main copy_trade">
            <div className="main__content__traider">
                <div className="main__title">
                    <img src={tradeIcon} alt="instruct" />
                    <div className="main__title__text">
                        <p>Список ТОП трейдеров</p>
                        <span>этой недели </span>
                    </div>
                </div>
                <div className="main__content__traider__desc">
                    <p>
                        Торговля фьючерсами на первый взгляд может напугать
                        новичка сложной терминологией и запутанными схемами.
                        Напрасно — это увлекательная и прибыльная альтернатива
                        скучным и банальным способам заработать на сбережениях
                        (например, банковским вкладам).
                    </p>
                </div>
                <div className="main__content__traider__info">
                    <Field
                        label="ФИО"
                        {...register("fio", {
                            required: true,
                            maxLength: 50,
                        })}
                        onChange={onChangeHandler}
                    />
                    <Field
                        label="Уровень ROI"
                        {...register("roi", {
                            required: true,
                            maxLength: 50,
                        })}
                        onChange={onChangeHandler}
                    />
                    <Field
                        label="Профит"
                        {...register("profit", {
                            required: true,
                            maxLength: 50,
                        })}
                        onChange={onChangeHandler}
                    />
                    <Field
                        label="Уровень MDD"
                        {...register("mdd", {
                            required: true,
                            maxLength: 50,
                        })}
                        onChange={onChangeHandler}
                    />
                    <div className="select_contain">
                        <span>Пары</span>
                        <Select defaultOption="Все">
                            <li>Все</li>
                        </Select>
                    </div>
                </div>
                <div className="main__content__traider__content">
                    {mockData.trade.map((e) => (
                        <CardInfo
                            key={e.name}
                            className="content__card"
                            name={e.name}
                            email={e.email}
                            rating={e.rating}
                            logo="https://cdn.dribbble.com/users/24078/screenshots/15522433/media/e92e58ec9d338a234945ae3d3ffd5be3.jpg?compress=1&resize=400x300"
                        >
                            <div className="content__card__profit">
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
                            <div className="content__card__traid_cryptobtn">
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
                            <div className="content__card__cryptobtn">
                                <CryptoPick />
                                <CryptoPick />
                                <CryptoPick />
                            </div>
                            <div className="content__card__price_btn">
                                <div className="content__card__price_btn__price">
                                    <span>Цена</span>
                                    <span>{e.price} $</span>
                                </div>
                                <Button
                                    onClick={() =>
                                        !e.copy
                                            ? setCopyTradeId(e.name)
                                            : setFreePlaceChange(e.name)
                                    }
                                    theme={
                                        e.copy ? "aftersubmit" : "beforesubmit"
                                    }
                                >
                                    {e.copy
                                        ? "Уведомить о свободном месте"
                                        : "Копировать"}
                                </Button>
                            </div>
                        </CardInfo>
                    ))}
                </div>
                {copyTradeId && (
                    <CopyTradeModal
                        handleChange={() => setCopyTradeId("")}
                        info={copyTradeId}
                    />
                )}
                {freePlaceChange && (
                    <FreePlaceModal
                        handleChange={() => setFreePlaceChange("")}
                        info={freePlaceChange}
                    />
                )}
                <div className="main__content__traider__slide">
                    <Button theme="aftersubmit">Загрузить еще</Button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CopyTrade;
