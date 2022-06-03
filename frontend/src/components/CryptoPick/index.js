import React from "react";

//Icon
import btcIcon from "@assets/img/btc.svg";
import balanceIcon from "@assets/img/balance.svg";

//Style
import "./CryptoPick.scss";

const CryptoPick = () => {
    return (
        <div className="cryptopick">
            <div className="cryptopick__img">
                <img src={btcIcon} alt="btc" />
            </div>
            <span>BTCUSDT</span>
            <div className="cryptopick__img">
                <img src={balanceIcon} alt="usdt" />
            </div>
        </div>
    );
};

export default CryptoPick;
