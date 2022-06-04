import React from "react";

//Styles
import "./Checkbox.scss";

const Checkbox = ({ id, group, value, label, onClick, ...props }) => {
    return (
        <div className="custom_checkbox" onClick={onClick}>
            <input type="checkbox" id={id} name={group} {...props} />
            <label for={id}>{label}</label>
        </div>
    );
};

export default Checkbox;
