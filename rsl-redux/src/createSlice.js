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

                if(Object.keys((store["asyncActions"])).includes(actionCreator.type)){
                    console.warn("Duplicate action type:: "+ actionCreator.type)
                }

                store["asyncActions"] = {
                    ...store["asyncActions"],
                    [actionCreator.type]: {
                        reducerName: reducerName,
                        reducerActionFn: (updatedState, result) => reducerAction(updatedState, result)
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