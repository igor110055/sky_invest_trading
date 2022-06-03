import React, { useEffect, useState } from "react";

//Components
import MenuToggle from "@components/MenuToggle";
import Select from "@components/Select";
import Field from "@components/Field";
import Button from "@components/Button";

//Styles
import "./CreateGroupSidebar.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "react-calendar";
import { createGroup } from "../../store/group/group.api";
import BinanceActivation from "../Modals/BinanceActivation";
import { binanceApiActive } from "../../store/user/user.api";

const CreateGroupSidebar = ({ isOpen, toggle }) => {
    const dispatch = useDispatch();
    const [dateTwoShow, setDateTwoShow] = useState(false);
    const [dateOneShow, setDateOneShow] = useState(false);
    const [dateOne, setDateOne] = useState(null);
    const [dateTwo, setDateTwo] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [active_binance, set_active_binance] = useState(false);
    const [select, setSelect] = useState("");
    const { message } = useSelector((state) => state.group);
    const { messages } = useSelector((state) => state.group);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    useEffect(() => {
        if (message === "create_group_err") {
            set_active_binance(true);
        }
        if (messages === "binance_active") {
            set_active_binance(false);
        }
        if (message === "group_create") {
            toggle();
        }
    }, [message, messages]);

    const binanceActivation = (data) => {
        dispatch(binanceApiActive(data));
    };

    const onChangeHandler = (ev) => {
        setValue(ev.currentTarget.name, ev.currentTarget.value);
    };

    const setDateTwoToggle = () => {
        setDateTwoShow(true);
        setDateOneShow(false);
    };

    const setDateOneToggle = () => {
        setDateTwoShow(false);
        setDateOneShow(true);
    };

    const onSubmitHandler = async (data) => {
        setLoaded(true);

        if (select && dateOne && dateTwo) {
            const obj = {
                ...data,
                start_date: new Date(dateOne).toISOString(),
                end_date: new Date(dateTwo).toISOString(),
            };
            dispatch(createGroup(obj));
        }

        setLoaded(false);
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
        <div className="create_group">
            <div className="create_group__sidebar">
                <div className="create_group__sidebar__title">
                    <div
                        className="create_group__sidebar__back"
                        onClick={() => toggle(false)}
                    ></div>
                    <span>Создать группу</span>
                    <MenuToggle isOpen={true} toggle={toggle} />
                </div>
                <form
                    onSubmit={handleSubmit(onSubmitHandler)}
                    className="create_group__sidebar__content"
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                        }}
                    >
                        <span className="f12">Цель создания группы</span>
                        <Select
                            defaultOption="Трейдинг"
                            onChange={(e) => setSelect(e)}
                        >
                            <li>Трейдинг</li>
                            <li>ISEO</li>
                            <li>Другое</li>
                        </Select>
                    </div>
                    <Field
                        label="Название группы"
                        {...register("title", {
                            required: true,
                            minLength: 2,
                            maxLength: 150,
                        })}
                        onChange={onChangeHandler}
                        error={errors.title && "Заполните поле"}
                    />
                    <Field
                        label="Описание группы"
                        {...register("description", {
                            required: true,
                            minLength: 2,
                            maxLength: 500,
                        })}
                        onChange={onChangeHandler}
                        error={errors.description && "Заполните поле"}
                    />
                    <Field
                        label="Количество людей в группе"
                        {...register("group_size", {
                            required: true,
                            minLength: 2,
                            maxLength: 5,
                        })}
                        type="user_count"
                        onChange={onChangeHandler}
                        error={errors.group_size && "Заполните поле"}
                    />
                    <Field
                        label="Процент начисления"
                        {...register("percent_from_income", {
                            required: true,
                            minLength: 2,
                            maxLength: 5,
                        })}
                        type="number"
                        onChange={onChangeHandler}
                        error={errors.group_size && "Заполните поле"}
                    />
                    <Field
                        label="Необходимая сумма"
                        {...register("need_sum", {
                            required: true,
                            minLength: 2,
                            maxLength: 5,
                        })}
                        type="money"
                        onChange={onChangeHandler}
                        error={errors.need_sum && "Заполните поле"}
                    />
                    <div className="create_group__sidebar__content__sum">
                        <Field
                            label="Минимальная сумма входа"
                            {...register("min_entry_sum", {
                                required: true,
                                minLength: 2,
                                maxLength: 50,
                            })}
                            type="money"
                            onChange={onChangeHandler}
                            error={errors.min_entry_sum && "Заполните поле"}
                        />
                        <Field
                            label="Максимальная сумма входа"
                            {...register("max_entry_sum", {
                                required: true,
                                minLength: 2,
                                maxLength: 50,
                            })}
                            type="money"
                            onChange={onChangeHandler}
                            error={errors.max_entry_sum && "Заполните поле"}
                        />
                    </div>
                    <div className="birthday">
                        <Field
                            label="Дата рождения"
                            placeholder="-- / -- / ----"
                            name="birth_day"
                            onFocus={setDateOneToggle}
                            type="date"
                            value={
                                dateOne
                                    ? new Date(dateOne).toLocaleDateString()
                                    : ""
                            }
                            error={
                                !dateOne && errors.birthDay && "Заполните поле"
                            }
                        />
                        {dateOneShow ? (
                            <Calendar
                                className="calendar_one"
                                onChange={(e) => {
                                    setDateOne(e);
                                }}
                                value={dateOne}
                            />
                        ) : null}
                    </div>
                    <div className="birthday">
                        <Field
                            label="Дата рождения"
                            placeholder="-- / -- / ----"
                            name="birth_day"
                            onFocus={setDateTwoToggle}
                            type="date"
                            value={
                                dateOne
                                    ? new Date(dateTwo).toLocaleDateString()
                                    : ""
                            }
                            error={
                                !dateTwo && errors.birthDay && "Заполните поле"
                            }
                        />
                        {dateTwoShow ? (
                            <Calendar
                                className="calendar_one"
                                onChange={(e) => {
                                    setDateTwo(e);
                                }}
                                value={dateOne}
                            />
                        ) : null}
                    </div>
                    <Button theme="beforesubmit" type="submit">
                        Создать группу
                    </Button>
                </form>
                {active_binance && (
                    <BinanceActivation handleChange={binanceActivation} />
                )}
            </div>
        </div>
    );
};

export default CreateGroupSidebar;
