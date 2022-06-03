import React, { useState } from "react";

//Icons
import faq from "@assets/img/faq.svg";

//Components
import Button from "@components/Button";
import {
    EditPhone,
    ForgotPassword,
    Logout,
    NoCodeMessage,
    NoEmailPhone,
    Signin,
    Signup,
    TwoFactor,
    VerifyPerson,
} from "@components/FaqComponents";
import Footer from "@components/Footer";

//Styles
import "./FAQ.scss";

const mockFaq = {
    faq_blocks: [
        {
            tab: 1,
            block: <Signin />,
        },
        {
            tab: 2,
            block: <Signup />,
        },
        {
            tab: 3,
            block: <NoEmailPhone />,
        },
        {
            tab: 4,
            block: <EditPhone />,
        },
        {
            tab: 5,
            block: <VerifyPerson />,
        },
        {
            tab: 6,
            block: <TwoFactor />,
        },
        {
            tab: 7,
            block: <NoCodeMessage />,
        },
        {
            tab: 8,
            block: <ForgotPassword />,
        },
        {
            tab: 9,
            block: <Logout />,
        },
    ],
    faqLinks: [
        {
            tab: 1,
            title: "Как войти в учетную запись?",
        },
        {
            tab: 2,
            title: "Как зарегистрироваться?",
        },
        {
            tab: 3,
            title: "Нет доступа к номеру мобильного телефона или email?",
        },
        {
            tab: 4,
            title: "Как привязать или изменить номер мобильного телефона?",
        },
        {
            tab: 5,
            title: "Как пройти верификации личности?",
        },
        {
            tab: 6,
            title: "Как включить двухфакторную верификацию?",
        },
        {
            tab: 7,
            title: "Не приходит код подтверждения или другие уведомления?",
        },
        {
            tab: 8,
            title: "Забыли пароль для входа?",
        },
        {
            tab: 9,
            title: "Как выйти из учётной записи?",
        },
    ],
};

const FAQ = () => {
    const [faqTab, setFaqTab] = useState(1);

    const toggleFaqTab = (tab) => {
        if (faqTab === tab) {
            setFaqTab(0);
        } else {
            setFaqTab(tab);
        }
    };

    return (
        <div className="main faq_page">
            <div className="main__content__faq">
                <div className="main__title">
                    <img src={faq} alt="instruct" />
                    <div className="main__title__text">
                        <p>Самые часто задаваемые</p>
                        <span>вопросы и ответы </span>
                    </div>
                </div>
                <div className="main__content__faq__desc">
                    <p>
                        Sky Invest занимается брокерской/дилерской деятельностью
                        на более 150 рынках по всему миру. В качестве брокера
                        Sky Invest предоставляет институционным и
                        профессиональным трейдерам прямой доступ к ("онлайн")
                        услугам по клирингу и исполнению сделок с широким
                        спектром инструментов (включая акции, опционы, фьючерсы,
                        валюту, облигации, золото
                    </p>
                </div>
                <div className="main__content__faq__content">
                    <div className="main__content__faq__content__links">
                        {mockFaq.faqLinks.map((e) => (
                            <div
                                className={`faq_btn_block ${
                                    faqTab === e.tab ? "active" : ""
                                }`}
                            >
                                <Button
                                    theme={
                                        faqTab === e.tab
                                            ? "beforesubmit"
                                            : "usually"
                                    }
                                    onClick={() => toggleFaqTab(e.tab)}
                                >
                                    {e.title}

                                    <svg
                                        width="12"
                                        height="7"
                                        viewBox="0 0 12 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11.3125 1.375L6.34375 5.875C6.15625 6.0625 5.875 6.0625 5.6875 5.875L0.65625 1.375C0.4375 1.1875 0.4375 0.875 0.625 0.6875C0.8125 0.46875 1.125 0.46875 1.3125 0.65625L6 4.84375L10.6562 0.65625C10.8438 0.46875 11.1562 0.46875 11.3438 0.6875C11.5312 0.875 11.5312 1.1875 11.3125 1.375Z"
                                            fill="black"
                                        />
                                    </svg>
                                </Button>
                                <div className="faq_block_main">
                                    {mockFaq.faq_blocks.map((e) => {
                                        if (e.tab === faqTab) {
                                            return e.block;
                                        }
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="main__content__faq__content__block">
                        {mockFaq.faq_blocks.map((e) => {
                            if (e.tab === faqTab) {
                                return e.block;
                            }
                        })}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default FAQ;
