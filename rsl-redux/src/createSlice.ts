import store from "./store"

type ActionCreator = {
    type: string;
};

type ReducerAction = {
    (state: any, action: any): void; // Define the signature of your reducer action function
};

type ReducersMap = {
    [key: string]: () => void; // Define the structure of your reducers
};

type ExtraReducersArg = {
    addCase: (actionCreator: ActionCreator, reducerAction: ReducerAction) => void;
};

type ExtraReducersFunc = (builder: {
    addCase: (actionCreator: ActionCreator, reducerAction: ReducerAction) => void;
}) => void;

type CreateSlicePayload = {
    name: string;
    initialState: any;
    extraReducers: (builder: {
        addCase: (actionCreator: ActionCreator, reducerAction: ReducerAction) => void;
    }) => void
    reducers: ReducersMap;
};


type CreateSliceReturn = {
    name: string,
    reducer: {
        [key in string]: () => void
    },
    actions: {
        [key in string]: () => void
    }
}


function createSlice(payload: CreateSlicePayload): CreateSliceReturn {

    const reducerName = payload.name
    const extraReducers = payload.extraReducers

    let actions: {[key: string]: (...arg: any)=>void} = {}

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
                        reducerActionFn: (updatedState, result) => reducerAction(updatedState, result)
                    }
                }

                console.log(store, actionCreator.type)





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