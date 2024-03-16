import store from "./store"

function createSlice(payload) {

    const {name: reducerName, reducers, extraReducers, initialState} = payload

    reducers["initialState"] = initialState

    let actions = {}

    for (let actionName in reducers) {
        let actionFn = reducers[actionName]

        actions[actionName] = function (arg) {
            return {
                actionFn,
                reducerName,
                payload: arg,
            }
        }
    }


    if (extraReducers) {
        extraReducers({
            addCase: function (actionCreator, reducerAction) {

                if (Object.keys((store["asyncActions"])).includes(actionCreator.type)) {
                    console.warn("Duplicate action type:: " + actionCreator.type)
                }

                if (!store["asyncActions"]) store["asyncActions"] = {}

                store["asyncActions"][actionCreator.type] = {
                    reducerName: reducerName,
                    reducerActionFn: (updatedState, result) => reducerAction(updatedState, result)
                }
            }
        })
    }

    return {
        name: reducerName,
        reducer: reducers,
        actions
    }
}

export default createSlice