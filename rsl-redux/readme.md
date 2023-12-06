# Rsl-Redux
# My Own Redux Toolkit
In this project, I create redux-toolkit from scratch.

### Features
- Async action
- Sync action
- Store
- Dispatch
- useSelector
- RTK query


A simple lightweight redux-toolkit clone.


![](https://github.com/rasel-mahmud-dev/rsl-redux/blob/main/public/file.png?raw=true)


[![NPM](https://nodei.co/npm/rsl-redux.png?downloads=true)](https://nodei.co/npm/rsl-redux/)

## Installation

Install `rsl-redux` with [npm](https://www.npmjs.com/):

```
npm install rsl-redux
```

## Usage


```javascript
// store.js
export const store = {
    state: {},
    listens: [],
    fireAsyncAction: [],
    reducerAction: [],
    dispatch: function (value) {
        this.state = {
            ...this.state,
            ...value
        }
        this.notify()
    },

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
        this.listens.forEach(lis => lis(this.state))
    },
    removeListener: function (lis) {
        this.listens = this.listens.filter(list => list !== lis)
    }
}

```

Check Example [Live example]

## Params
