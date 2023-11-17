import store from "./store"

function createSlice(payload) {

    const reducerName = payload.name
    const extraReducers = payload.extraReducers

    let actions = {}

    for (let actionName in payload.reducers) {
        let actionFn = payload.reducers[actionName]

        actions[actionName] = function (payload) {
            return {
                actionFn,
                reducerName,
                payload,
            }
        }
    }

    payload.reducers["initialState"] = payload.initialState

    if (extraReducers) {
        extraReducers({
            addCase: function (actionCreator, reducerAction) {

                // const result = actionCreator("")
                // reducerAction(store.state, result)

                store["reducerAction"] = {
                    ...store["reducerAction"],
                    [actionCreator.type]: {
                        reducerName: reducerName,
                        reducerActionFn: (latestState, result)=>reducerAction(latestState, result)
                    }
                }
            }
        })
    }

    return {
        name: reducerName,
        reducer: payload.reducers,
        actions
    }
}

export default createSlice