import React, { useEffect, useRef, useState } from "react";

//Icons
import arrow from "@assets/img/selectArrow.svg";

//Styles
import "./Select.scss";

const Select = ({ children, className, defaultOption, onChange }) => {
    const [open, setOpen] = useState(false);
    const [select, setSelect] = useState(defaultOption);

    document.addEventListener("click", (e) => {
        if (e.target.localName === "li") {
            setSelect(e.target.innerText);
        }
    });

    useEffect(() => {
        onChange && onChange(select);
    }, [select]);

    const toggleSelect = () => {
        setOpen(!open);
    };

    return (
        <div className={`select ${className}`} onClick={toggleSelect}>
            <span>{select}</span>
            {open && <ul className="select__list">{children}</ul>}
            <img src={arrow} alt="arrow" />
        </div>
    );
};

export default Select;
