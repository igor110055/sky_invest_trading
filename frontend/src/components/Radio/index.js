import React from "react";

//Styles
import "./Radio.scss";

const Radio = ({ id, group, value, checked, label, onClick, ...props }) => {
    return (
        <div class="custom_radio" onClick={onClick}>
            <input
                type="radio"
                id={id}
                name={group}
                checked={checked}
                {...props}
            />
            <label for={id}>{label}</label>
        </div>
    );
};

export default Radio;
