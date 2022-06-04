import React from "react";

//Icons
import about from "@assets/img/aboutMain.svg";
import onSum from "@assets/img/companyOnSum.svg";
import sum1 from "@assets/img/forAboutMain1.svg";
import sum2 from "@assets/img/forAboutMain2.svg";
import sum3 from "@assets/img/forAboutMain3.svg";
import causes from "@assets/img/forAboutCauses.svg";
import premium from "@assets/img/premium.svg";
import product from "@assets/img/product.svg";
import security from "@assets/img/securityMain.svg";
import help from "@assets/img/helpMain.svg";
import lider from "@assets/img/liderMain.svg";
import control from "@assets/img/control.svg";
import reliability from "@assets/img/reliability.svg";

//Components
import Footer from "@components/Footer";

//Styles
import "./About.scss";

const mockData = [
    "Вы платите только за результат",
    "Подбор новостройки бесплатный",
    "Выявим ваши потребности",
    "Освободим вас от звонков и встреч",
    "Автоматизированная система поиска",
    "Организуем совместный выезд",
    "Оформим все документы под ключ",
    "Подбор новостройки бесплатный",
    "Расскажем нюансы при продаже, покупке и сдаче",
];

const premiumObj = [
    {
        img: product,
        title: "Уникальный продукт",
    },
    {
        img: security,
        title: "Безопасность",
    },
    {
        img: help,
        title: "Клиентская поддержка",
    },
    {
        img: lider,
        title: "Лидеры на рынке деривативов",
    },
    {
        img: control,
        title: "Регулирование",
    },
    {
        img: reliability,
        title: "Надёжность",
    },
];

const About = () => {
    return (
        <div className="main about">
            <div className="main__title">
                <img src={about} alt="about" />
                <div className="main__title__text">
                    <p>Подробности о нашей</p>
                    <span>о компании </span>
                </div>
            </div>

            <div className="main__about__desc_block">
                <div className="main__about__desc_block__text">
                    <span>
                        «
                        <a href="#" alt="dwdw">
                            Sky Invest
                        </a>
                        » – одна из старейших, крупнейших и наиболее успешных
                        управляющих компаний в России, работает с 1996 года и по
                        праву считается основателем отечественной индустрии
                        управления активами.
                    </span>
                    <p>
                        Совокупный объем активов под управлением на 30 декабря
                        2021 года составляет 1,56 трлн руб. За 25 лет
                        существования компания пережила не один кризис и смогла
                        не только сохранить лидерские позиции, но и укрепить их.
                        Сегодня «Сбер Управление Активами» предоставляет
                        клиентам широкий выбор инвестиционных возможностей в
                        своих паевых инвестиционных фондах и стратегиях
                        доверительного управления.
                    </p>
                </div>
                <div className="main__about__desc_block__img"></div>
            </div>

            <div className="main__title">
                <img src={onSum} alt="about" />
                <div className="main__title__text">
                    <p>Компания</p>
                    <span>в цифрах </span>
                </div>
            </div>

            <div className="main__about__sum_block">
                <div className="main__about__sum_block__sum">
                    <img src={sum1} alt="sum" />
                    <p> тысячи частных клиентов Сбер Управление Активами </p>
                </div>
                <div className="main__about__sum_block__sum">
                    <img src={sum2} alt="sum" />
                    <p> и более тысяч точек продаж</p>
                </div>
                <div className="main__about__sum_block__sum">
                    <img src={sum3} alt="sum" />
                    <p>компания на рынке Кыргызстана</p>
                </div>
            </div>

            <div className="main__title">
                <img src={causes} alt="about" />
                <div className="main__title__text">
                    <p>9 причин</p>
                    <span>работать с нами </span>
                </div>
            </div>

            <div className="main__about__causes">
                {mockData.map((el, idx) => (
                    <div key={idx} className="main__about__causes__item">
                        <div className="main__about__causes__item__title">
                            <div>
                                <span>{idx + 1}</span>
                            </div>
                            <span>{el}</span>
                        </div>
                        <p>
                            При самостоятельной продаже, покупке или сдаче
                            придется тратить на это много времени и совсем не
                            обязательно брать отпуск, чтобы решить ваш
                            квартирный вопрос
                        </p>
                    </div>
                ))}
            </div>

            <div className="main__content__premium">
                <div className="main__title">
                    <img src={premium} alt="instruct" />
                    <div className="main__title__text">
                        <p>Какие у нас</p>
                        <span>преимущества </span>
                    </div>
                </div>
                <div className="main__content__premium__desc">
                    <p>
                        Sky Invest занимается брокерской/дилерской деятельностью
                        на более 150 рынках по всему миру. В качестве брокера
                        Sky Invest предоставляет институционным и
                        профессиональным трейдерам прямой доступ к ("онлайн")
                        услугам по клирингу и исполнению сделок с широким
                        спектром инструментов (включая акции, опционы, фьючерсы,
                        валюту, облигации, золото, крипто* и фонды по всему
                        миру). Interactive Brokers Group и ее дочерние
                        предприятия осуществляют более 2,499,000 сделок в день.
                    </p>
                </div>
                <div className="main__content__premium__content">
                    {premiumObj.map((e) => (
                        <div
                            key={e.title}
                            className="main__content__premium__content__card"
                        >
                            <img src={e.img} alt={e.title} />
                            <span>{e.title}</span>
                            <p>
                                Копитрейдинг в один клик объединяющий более 10
                                тыс. трейдеров Единый контракт позволяет
                                размещать сделки без дополнительной конвертации
                                Единственные на рынке поддерживаем USDC в
                                качестве маржи.
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;
