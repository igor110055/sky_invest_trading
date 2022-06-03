import React from "react";

//Styles
import "./Button.scss";

const Button = ({
    ref,
    children,
    onClick,
    theme = "usually",
    className = "",
    disabled = false,
    type = "",
}) => {
    return (
        <button
            ref={ref}
            className={`button ${className} ${disabled && "disabled"} ${theme}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
