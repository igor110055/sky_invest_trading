import React, { useEffect, useState } from "react";

//Components
import CardInfo from "@components/CardInfo";
import InfoBlock from "@components/UI/InfoBlock";
import Button from "@components/Button";
import CryptoPick from "@components/CryptoPick";
import Field from "@components/Field";
import Select from "@components/Select";

//Icon
import arrowTop from "@assets/img/arrowTop.svg";
import btcIcon from "@assets/img/btc.svg";
import usdtIcon from "@assets/img/usdt.svg";

//Styles
import "./Verify.scss";
import { useForm } from "react-hook-form";
import { Calendar } from "react-calendar";
import FileUpload from "../../components/FileUpload";
import { verification } from "../../store/user/user.api";
import { useDispatch } from "react-redux";

const Verify = () => {
    const [dateTwoShow, setDateTwoShow] = useState(false);
    const [dateOne, setDateOne] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [select, setSelect] = useState("Кыргызстан");
    const [filePerson, setFilePerson] = useState(null);
    const [locationPerson, setLocationPerson] = useState(null);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [pasportNum, setPasportNum] = useState("");
    const [inn, setInn] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");

    const [errors, setErrors] = useState({
        name: "",
        lastname: "",
        passnum: "",
        inn: "",
        birthDay: "",
        address: "",
        city: "",
        personFile: "",
        locationFile: "",
        message: "",
    });

    const setDateTwoToggle = () => {
        setDateTwoShow(true);
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
                setDateTwoShow(false);
            }
        }
    });

    const showError = (name, valid = "", msg = "") => {
        setErrors((prev) => {
            return {
                ...prev,
                [name]: valid ? "true" : "false",
                message: msg,
            };
        });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoaded(true);
        let validate = 0;
        Object.entries(errors).forEach((e) => {
            if (e[1] !== "true") {
                showError(e[0], "", "Не заполнены все поля");
            } else {
                validate += 1;
                setErrors((prev) => {
                    return {
                        ...prev,
                        message: "",
                    };
                });
            }

            if (
                !errors["birthDay"] &&
                new Date(dateOne).toLocaleDateString().length > 0
            ) {
                showError("birthDay", "", "Не заполнены все поля");
            } else {
                showError("birthDay", "true", "");
            }
        });

        if (validate === 9) {
            console.log(errors);
        }

        // dispatch(verification(obj));
        setLoaded(false);
    };

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

                    <span>Верификация</span>
                </div>
            </div>
            <div className="main__verify_content">
                <div className="main__verify_content__title">
                    <svg
                        width="26"
                        height="22"
                        viewBox="0 0 26 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M24.7188 18.5469L14.7344 1.48438C13.9375 0.171875 12.0156 0.171875 11.2656 1.48438L1.23438 18.5469C0.484375 19.8594 1.42188 21.5 2.96875 21.5H22.9844C24.5312 21.5 25.4688 19.8594 24.7188 18.5469ZM11.875 6.875C11.875 6.26562 12.3438 5.75 13 5.75C13.6094 5.75 14.125 6.26562 14.125 6.875V12.875C14.125 13.5312 13.6094 14 13 14C12.4375 14 11.875 13.5312 11.875 12.875V6.875ZM13 18.5C12.1562 18.5 11.5 17.8438 11.5 17.0469C11.5 16.25 12.1562 15.5938 13 15.5938C13.7969 15.5938 14.4531 16.25 14.4531 17.0469C14.4531 17.8438 13.7969 18.5 13 18.5Z"
                            fill="#FF6B00"
                        />
                    </svg>
                    <p>
                        Идентификация счета необходима для предотвращения
                        случаев мошенничества, противодействия отмыванию средств
                        и финансирования терроризма.
                    </p>
                </div>
                <div className="main__verify_content__desc">
                    <span>
                        - В поле «документ, удостоверяющий личность» загрузите
                        сканированную копию или фото внутреннего или загран
                        паспорта, водительское удостоверение, военный билет.
                    </span>
                    <span>
                        - В поле «документ, подтверждающий адрес проживания»
                        загрузите сканированную копию или фото страницы прописки
                        в паспорте (только если в качестве документа
                        подтверждающего личность вы загрузили внутренний
                        паспорт), либо любой официальный документ с печатью и
                        адресом проживания на котором указаны Ваши данные.
                    </span>
                </div>
                <form
                    onSubmit={onSubmitHandler}
                    className="main__verify_content__data"
                >
                    <div className="main__verify_content__data__title">
                        <span>Персональные данные</span>
                    </div>
                    <div className="main__verify_content__data__fio">
                        <Field
                            label="Имя"
                            onChange={(e) => {
                                showError("name", e.target.value);
                                setName(e.target.value);
                            }}
                            error={errors.name === "false" && "Заполните поле"}
                        />
                        <Field
                            label="Фамилия"
                            onChange={(e) => {
                                showError("lastname", e.target.value);
                                setLastName(e.target.value);
                            }}
                            error={
                                errors.lastname === "false" && "Заполните поле"
                            }
                        />
                        <div className="birthday">
                            <Field
                                label="Дата рождения"
                                placeholder="-- / -- / ----"
                                name="birth_day"
                                onFocus={setDateTwoToggle}
                                type="date"
                                value={
                                    dateOne
                                        ? new Date(dateOne).toLocaleDateString()
                                        : ""
                                }
                                error={
                                    !dateOne &&
                                    errors.birthDay &&
                                    "Заполните поле"
                                }
                            />
                            {dateTwoShow ? (
                                <Calendar
                                    className="calendar_one"
                                    onChange={(e) => {
                                        showError(
                                            "birthDay",
                                            new Date(e).toLocaleDateString()
                                        );
                                        setDateOne(e);
                                    }}
                                    value={dateOne}
                                />
                            ) : null}
                        </div>
                    </div>
                    <div className="main__verify_content__data__card_num">
                        <Field
                            label="Номер паспорта"
                            onChange={(e) => {
                                showError("passnum", e.target.value);
                                setPasportNum(e.target.value);
                            }}
                            error={
                                errors.passnum === "false" && "Заполните поле"
                            }
                        />
                        <Field
                            label="ИНН"
                            onChange={(e) => {
                                showError("inn", e.target.value);
                                setInn(e.target.value);
                            }}
                            error={errors.inn === "false" && "Заполните поле"}
                        />
                    </div>
                    <div className="main__verify_content__data__state">
                        <div className="main__verify_content__data__title">
                            <span>Адрес проживания</span>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                            }}
                        >
                            <span className="f12">Страна</span>
                            <Select
                                defaultOption="Кыргызстан"
                                onChange={(e) => {
                                    // showError("country", e);
                                    setSelect(e);
                                }}
                            >
                                <li>Россия</li>
                            </Select>
                        </div>
                        <Field
                            label="Город"
                            onChange={(e) => {
                                showError("city", e.target.value);
                                setCity(e.target.value);
                            }}
                            error={errors.city === "false" && "Заполните поле"}
                        />
                        <Field
                            label="Адрес"
                            onChange={(e) => {
                                showError("address", e.target.value);
                                setAddress(e.target.value);
                            }}
                            error={
                                errors.address === "false" && "Заполните поле"
                            }
                        />
                    </div>
                    <div className="main__verify_content__data__title_normal">
                        <span>Документ, удостоверяющий личность</span>
                    </div>
                    <div className="main__verify_content__data__confirm_img">
                        <FileUpload
                            id="person"
                            name="person"
                            text="Документ, удостоверяющий личность"
                            handleChange={(e) => {
                                showError("personFile", e);
                                setFilePerson(e);
                            }}
                            icon={
                                <svg
                                    width="22"
                                    height="24"
                                    viewBox="0 0 22 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.2"
                                        d="M18.0113 0H3.60225C1.60901 0 0 1.597 0 3.56623V16.6664C0 18.6357 1.60901 20.2326 3.60225 20.2326H4.51484C5.47543 20.2326 6.38801 20.6049 7.06042 21.2773L9.1137 23.3066C10.0503 24.2311 11.5753 24.2311 12.5118 23.3066L14.5651 21.2773C15.2375 20.6049 16.1621 20.2326 17.1107 20.2326H18.0113C20.0045 20.2326 21.6135 18.6357 21.6135 16.6664V3.56623C21.6135 1.597 20.0045 0 18.0113 0ZM10.8068 4.50281C12.3557 4.50281 13.6045 5.75158 13.6045 7.30055C13.6045 8.84952 12.3557 10.0983 10.8068 10.0983C9.25779 10.0983 8.00903 8.83754 8.00903 7.30055C8.00903 5.75158 9.25779 4.50281 10.8068 4.50281ZM14.0248 15.6818H7.58873C6.61612 15.6818 6.05179 14.6011 6.59212 13.7966C7.40862 12.5839 8.99361 11.7673 10.8068 11.7673C12.6199 11.7673 14.2049 12.5839 15.0214 13.7966C15.5617 14.6011 14.9854 15.6818 14.0248 15.6818Z"
                                        fill="#323A46"
                                    />
                                </svg>
                            }
                        />

                        <FileUpload
                            id="location"
                            name="location"
                            text="Документ, подтверждающий адрес проживания"
                            handleChange={(e) => {
                                showError("locationFile", e);
                                setLocationPerson(e);
                            }}
                            icon={
                                <svg
                                    width="21"
                                    height="24"
                                    viewBox="0 0 21 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.2"
                                        d="M20.4878 7.84391C19.2585 2.43512 14.5405 0 10.3961 0C10.3961 0 10.3961 0 10.3843 0C6.25168 0 1.52193 2.42341 0.292657 7.83219C-1.0771 13.8732 2.62241 18.9892 5.9707 22.2088C7.21169 23.4029 8.80385 24 10.3961 24C11.9883 24 13.5804 23.4029 14.8097 22.2088C18.158 18.9892 21.8575 13.8849 20.4878 7.84391ZM10.3961 13.7093C8.35899 13.7093 6.70826 12.0585 6.70826 10.0215C6.70826 7.9844 8.35899 6.33367 10.3961 6.33367C12.4331 6.33367 14.0839 7.9844 14.0839 10.0215C14.0839 12.0585 12.4331 13.7093 10.3961 13.7093Z"
                                        fill="#323A46"
                                    />
                                </svg>
                            }
                        />
                    </div>
                    {errors.birthDay && (
                        <span className="form__error">{errors.message}</span>
                    )}
                    <Button
                        type="submit"
                        theme="beforesubmit"
                        disabled={loaded}
                    >
                        Далее
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Verify;
