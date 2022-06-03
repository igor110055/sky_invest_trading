import * as React from "react";
import useInterval from "./useInterval";

const useSlider = ({
    total = 0,
    enabled = false,
    useLoaded = false,
    speed = 1000,
    loop = true,
    offsetNum = 0,
}) => {
    const [offset, setOffset] = React.useState(offsetNum);
    const [items, setItems] = React.useState([]);

    function incrementOffset() {
        if (offset === total - 1) {
            setOffset(loop ? 0 : offset);
        } else {
            setOffset(offset + 1);
        }
    }

    React.useEffect(() => {
        setOffset(offsetNum);
    }, [offsetNum]);

    function addItem(ref) {
        setItems([...items, ref]);
    }

    const loaded = useLoaded ? items.length === total : true;

    useInterval(() => {
        if (loaded && enabled && offset < total) {
            incrementOffset();
        }
    }, speed);

    return { offset, addItem };
};

export default useSlider;
