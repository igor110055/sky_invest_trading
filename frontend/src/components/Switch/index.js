import React from "react";

//Styles
import "./Switch.scss";

const Switch = ({ isOn, handleToggle, id }) => {
    return (
        <>
            <input
                checked={isOn}
                onChange={handleToggle}
                className="react-switch-checkbox"
                id={id}
                type="checkbox"
            />
            <label className="react-switch-label" htmlFor={id}>
                <span className={`react-switch-button`} />
            </label>
        </>
    );
};

export default Switch;
