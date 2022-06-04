import React, { useCallback, useEffect, useState, useRef } from "react";

//Styles
import "./RangeSlider.scss";

const RangeSlider = ({ min, max, onChange }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);

    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    useEffect(() => {
        onChange(minVal);
    }, [minVal, maxVal, onChange]);

    return (
        <div className="slider-container">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className="thumb thumb--left"
                //@ts-ignore
                style={{ zIndex: minVal > max - 100 && "5" }}
            />

            <div className="slider">
                <div className="slider__values">
                    <span>{minVal}</span>
                    <span>{maxVal} USD</span>
                </div>
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
            </div>
        </div>
    );
};

export default RangeSlider;
