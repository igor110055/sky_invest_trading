import React from "react";

//Styles
import "./ProgressBar.scss";

//Utils
import { numberWithSpaces, dateFormatter } from "@utils/stringHelper";

const ProgressBar = ({ completed, from, to, start, end }) => {
    const styles = {
        backgroundColor: "#61CB58",
        height: "4px",
        width: `${completed}%`,
    };

    return (
        <div className="progressbar">
            <div className="progressbar__from_to">
                <span>{numberWithSpaces(from, "$")}</span>
                <span>{numberWithSpaces(to, "$")}</span>
            </div>
            <div className="progressbar__line">
                <div style={styles} />
            </div>
            {start && end ? (
                <div className="progressbar__start_end">
                    <span>Начало: {dateFormatter(new Date(start))}</span>
                    <span>Конец: {dateFormatter(new Date(end))}</span>
                </div>
            ) : null}
        </div>
    );
};

export default ProgressBar;
