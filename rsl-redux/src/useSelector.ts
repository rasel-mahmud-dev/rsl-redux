import { useEffect, useState } from "react";
import store from "./store";

type SelectorPayload = (args: any)=> any

function useSelector(cb: SelectorPayload) {
    let ini = {};
    const selectedState = cb(store.state);

    if(selectedState && Array.isArray(selectedState)){
        ini = [...selectedState]
    }else if(typeof selectedState === "object") {
        ini = {...selectedState}
    }

    const [state, setState] = useState(ini); // Initialize state with the specific part


    const listener = (gState) => {
        const selectedState = cb(gState);
        setState(selectedState)
    };


    useEffect(() => {
        // Subscribe to the store when the component mounts
        store.subscribe(listener);

        // Clean up the subscription when the component unmounts
        return () => {
            store.removeListener(listener);
        };

    }, [selectedState]); // Only resubscribe if the callback function changes

    // Return the selected state
    return state;
}

export default useSelector;
