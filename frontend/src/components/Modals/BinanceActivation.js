import React from "react";

//Components
import Button from "@components/Button";
import Checkbox from "../Checkbox";

//Styles
import "./Modal.scss";
import BinanceForm from "../Forms/BinanceForm";

const BinanceActivation = ({ handleChange }) => {
    const fetchData = (e) => {
        handleChange(e);
    };

    return (
        <div className="modal">
            <div className="modal__block">
                <div className="modal__block__title">
                    <span>Введите Binance ключи!</span>
                </div>
                <div className="modal__block__content">
                    <BinanceForm fetchData={fetchData} />
                </div>
            </div>
        </div>
    );
};

export default BinanceActivation;
