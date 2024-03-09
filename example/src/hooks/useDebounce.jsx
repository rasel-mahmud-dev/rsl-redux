import {useState} from "react";

function useDebounce(callback, delay) {
    const [timer, setTimer] = useState(null);

    return (...args) => {

        clearTimeout(timer);

        const newTimer = setTimeout(() => {
            callback(...args);
        }, delay);

        setTimer(newTimer);
    };
}

export default useDebounce
