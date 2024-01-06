import store from "./store";

function useDispatch() {

    return function (actionObj) {
        let actionCall;


        if (typeof actionObj === "function") {

            // handle asynchronous createAsyncThunk action.
            actionCall = actionObj(useDispatch, store.getState, {})
            let action: { type: string; payload?: any; };

            if (actionCall instanceof Promise) {

                actionCall.then(payloadResponse => {
                    action = {
                        payload: payloadResponse,
                        type: actionCall.type + "/fulfilled"
                    }
                }).catch(ex => {
                    let type = actionCall.type
                    const lastPart = type.replace(/\/[^/]*$/, '');
                    action = {
                        payload: ex,
                        type: lastPart + "/rejected"
                    }
                }).finally(() => {
                    const reducerActionInfo = store.asyncActions[action.type]

                    if (reducerActionInfo) {
                        const updatedState = reducerActionInfo.reducerActionFn(store.state[reducerActionInfo.reducerName], action)
                        store.reducerDispatch(reducerActionInfo.reducerName, updatedState)
                    }
                })
            } else {
                action = {
                    payload: actionCall,
                    type: actionCall.type + "/fulfilled"
                }
                const reducerActionInfo = store.asyncActions[action.type]
                if (reducerActionInfo) {
                    const updatedState = reducerActionInfo.reducerActionFn(store.state[reducerActionInfo.reducerName], action)
                    store.reducerDispatch(reducerActionInfo.reducerName, updatedState)
                }
            }
        } else {
            const {actionFn, reducerName, payload} = actionObj


            let sliceState = store["state"][reducerName]
            actionFn(sliceState, {payload})
            store.reducerDispatch(reducerName, sliceState)
            actionCall = payload
        }

        return {
            unwrap() {
                return actionCall
            }
        }
    }


}

export default useDispatch

