import React, { useState } from "react";

//Form
import { useForm } from "react-hook-form";

//Field
import Field from "@components/Field";

//Components
import Button from "@components/Button";
import SpinnerLoad from "@components/SpinnerLoad";
import Select from "@components/Select";

//Styles
import "../Forms.scss";

const ActivationForm = ({ fetchData }) => {
    const [loaded, setLoaded] = useState(true);

    const handleClick = () => {
        fetchData();
    };

    return (
        <div className="form">
            <div className="form__title">
                <span>Активация аккаунта</span>
            </div>
            <Button
                onClick={handleClick}
                className="form__button"
                theme={"beforesubmit"}
            >
                {!loaded ? <SpinnerLoad /> : <span>Активировать</span>}
            </Button>
        </div>
    );
};

export default ActivationForm;
