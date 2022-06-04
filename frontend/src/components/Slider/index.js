import React, { useEffect, useState } from "react";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

//Styles
import "./Slider.scss";

export default function Slider({ children, slides = 1 }) {
    const [slideNum, setSlideNum] = useState(0);

    const [sliderRef, instanceRef] = useKeenSlider(
        {
            initial: 0,
            slideChanged(slider) {
                setSlideNum(slider.track.details.rel);
            },
            loop: true,
            mode: "free",
            duration: 2000,
            // slides: slides,
        },
        [
            (slider) => {
                let timeout;
                let mouseOver = false;
                function clearNextTimeout() {
                    clearTimeout(timeout);
                }
                function nextTimeout() {
                    clearTimeout(timeout);
                    if (mouseOver) return;
                    timeout = setTimeout(() => {
                        slider.next();
                    }, 2000);
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false;
                        nextTimeout();
                    });
                    nextTimeout();
                });
                slider.on("dragStarted", clearNextTimeout);
                slider.on("animationEnded", nextTimeout);
                slider.on("updated", nextTimeout);
            },
        ]
    );

    const moveDot = (idx) => {
        setSlideNum(instanceRef.current?.moveToIdx(idx));
    };

    return (
        <div className="slider">
            <div ref={sliderRef} className="keen-slider">
                {children.map((e, index) => (
                    <div className="keen-slider__slide" data-key={index}>
                        {e}
                    </div>
                ))}
            </div>
            <div className="slider__dots">
                {Array.from({ length: children.length }).map((e, idx) => (
                    <div
                        className={`slider__dots__dot ${
                            slideNum === idx ? "active" : ""
                        }`}
                        onClick={() => moveDot(idx)}
                    ></div>
                ))}
            </div>
        </div>
    );
}
