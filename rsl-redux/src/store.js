import {dispatch} from "./useDispatch";

const store = {
    state: {},
    listens: [],
    asyncActions: {},
    dispatch,
    reducerDispatch: function (reducerName, state) {
        this.state[reducerName] = {
            ...this.state[reducerName],
            ...state
        }
        this.notify()
    },
    subscribe: function (fn) {
        let index = this.listens.findIndex(lis => lis === fn)
        if (index === -1) {
            this.listens.push(fn)
        }
    },
    notify: function () {
        this.listens.forEach(lis => lis(this))
    },
    removeListener: function (lis) {
        this.listens = this.listens.filter(list => list !== lis)
    },
    getState(){
        return store.state
    }
}

export default store