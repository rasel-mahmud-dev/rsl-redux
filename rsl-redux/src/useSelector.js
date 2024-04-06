import { useEffect, useState } from "react";
import store from "./store";
import isArray from "./utils/isArray";
import isObject from "./utils/isObject";

function useSelector(cb) {
    let ini = {};
    const selectedState = cb(store.state);

    if(isArray(selectedState)){
        ini = [...selectedState]
    }else if(isObject(selectedState)) {
        ini = {...selectedState}
    }

    const [state, setState] = useState(ini); // Initialize state with the specific part


    const listener = (store) => {
        const selectedState = cb(store.getState());
        setState(selectedState)
    };


    useEffect(() => {
        // Subscribe to the store when the components mounts
        store.subscribe(listener);

        // Clean up the subscription when the components unmounts
        return () => {
            store.removeListener(listener);
        };

    }, [selectedState]); // Only resubscribe if the callback function changes

    // Return the selected state
    return state;
}

export default useSelector;
