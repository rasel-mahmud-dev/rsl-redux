import store from "./store";

function configureStore({reducer}) {
    for (const reducerKey in reducer) {
        let a = reducer[reducerKey]?.["initialState"]
        store.state = {
            ...store.state,
            [reducerKey]: a || undefined
        }
    }
    return store
}

export default configureStore