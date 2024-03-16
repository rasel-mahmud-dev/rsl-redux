import store from "./store"


function createSlice(payload) {

    const {name: reducerName, reducers, extraReducers, initialState} = payload

    const actions = {}
    for (let actionName in reducers) {
        let actionFn = reducers[actionName]
        actions[actionName] = function (args) {
            return {
                actionFn,
                reducerName,
                payload: args,
            }
        }
    }

    reducers["initialState"] = initialState

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