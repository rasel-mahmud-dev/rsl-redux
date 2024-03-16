import store from "./store";

function useDispatch() {
    return dispatch
}

function dispatch(actionObj) {
    let actionCall;
    if (typeof actionObj === "function") {

        // handle asynchronous createAsyncThunk action.
        actionCall = actionObj(dispatch, store.getState, {})
        let action = {};

        // when action creator function return promise
        if (actionCall instanceof Promise) {
            actionCall.then(payloadResponse => {
                action = {
                    payload: payloadResponse,
                    type: actionCall.type + "/fulfilled"
                }
            }).catch(ex => {
                const type = actionCall.type
                const lastPartActionType = type.replace(/\/[^/]*$/, '');
                action = {
                    payload: ex,
                    type: lastPartActionType + "/rejected"
                }
            }).finally(() => {
                // retrieve stored async actionCreator function from store via action type
                const reducerActionInfo = store.asyncActions[action.type]

                if (reducerActionInfo) {
                    const updatedState = reducerActionInfo.reducerActionFn(store.state[reducerActionInfo.reducerName], action)
                    store.reducerDispatch(reducerActionInfo.reducerName, updatedState)
                }
            })
        } else {
            // when action creator function return plain object, arr or other.
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
        // handle sync action
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


export default useDispatch

