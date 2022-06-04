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

const BinanceForm = ({ fetchData }) => {
    const [valute, setValute] = useState("USD");
    const [loaded, setLoaded] = useState(true);
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

        fetchData(data);

        setLoaded(true);
    };

    return (
        <div className="form">
            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                noValidate
                autoComplete="off"
            >
                <Field
                    label="Binance api key"
                    {...register("binance_api_key", {
                        required: true,
                        minLength: 2,
                        maxLength: 50,
                    })}
                    onChange={onChangeHandler}
                />
                <Field
                    label="Binance secret key"
                    {...register("binance_secret_key", {
                        required: true,
                        minLength: 2,
                        maxLength: 50,
                    })}
                    onChange={onChangeHandler}
                />
                <Button
                    className="form__button"
                    theme={"beforesubmit"}
                    type="submit"
                >
                    {!loaded ? <SpinnerLoad /> : <span>Подключить</span>}
                </Button>
            </form>
        </div>
    );
};

export default BinanceForm;
