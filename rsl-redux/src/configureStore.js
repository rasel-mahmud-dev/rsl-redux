import store from "./store";

function configureStore({reducer}) {
    for (const reducerKey in reducer) {
        const initialState = reducer[reducerKey]?.["initialState"]
        store.state = {
            ...store.state,
            [reducerKey]: initialState || undefined
        }
    }
    return store
}

export default configureStore