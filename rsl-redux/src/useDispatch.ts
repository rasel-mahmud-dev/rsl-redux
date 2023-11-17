import store from "./store";

function useDispatch() {

    return function (actionObj) {
        let actionCall;
        if (typeof actionObj === "function") {

            // handle asynchronous createAsyncThunk action.
            actionCall = actionObj(useDispatch, store.getState, {})

            if (actionCall instanceof Promise) {
                actionCall.then(payloadResponse => {
                    const reducerActionInfo = store.reducerAction[actionCall.type]
                    const updatedState = reducerActionInfo.reducerActionFn(store.state[reducerActionInfo.reducerName], {
                        payload: payloadResponse, action: actionCall.type
                    })
                    store.reducerDispatch(reducerActionInfo.reducerName, updatedState)
                }).catch(ex => {
                })
            }
        } else {
            const {
                actionFn,
                reducerName,
                payload
            } = actionObj

            let sliceState = store["state"][reducerName]
            actionFn(sliceState, {payload})
            store.reducerDispatch(reducerName, sliceState)
            actionCall = payload
        }

        return {
            unwrap() {
                if (actionCall instanceof Promise) {
                    return actionCall
                } else {
                    return Promise.resolve(actionCall)
                }
            }
        }
    }


}

export default useDispatch

