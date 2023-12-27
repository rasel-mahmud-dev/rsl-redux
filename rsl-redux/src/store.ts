const store = {
    state: {},
    listens: [],
    asyncActions: {},
    dispatch: function (value: object | Array<any>) {
        this.state = {
            ...this.state,
            ...value
        }
        this.notify()
    },
    reducerDispatch: function (reducerName: string, state) {
        this.state[reducerName] = {
            ...this.state[reducerName],
            ...state
        }
        this.notify()
    },
    subscribe: function (fn: Function) {
        let index = this.listens.findIndex(lis => lis === fn)
        if (index === -1) {
            this.listens.push(fn)
        }
    },
    notify: function () {
        this.listens.forEach(lis => lis(this.state))
    },
    removeListener: function (lis) {
        this.listens = this.listens.filter(list => list !== lis)
    },
    getState(){
        return store.state
    }
}

export default store