# Today we will Build our Own Redux toolkit library

আজ আমরা  নিজের রিডাক্স টুলকিট লাইব্রেরি তৈরি করব।

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Conclusion](#conclusion)

## Overview <a name="overview"></a>

This blog post discusses various aspects of...

## Section 1 <a name="section-1"></a>

Lorem ipsum dolor sit amet, consectetur adipiscing elit...

## Section 2 <a name="section-2"></a>

Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...

## 

# My Own Redux Toolkit

In this project  I will create redux-toolkit from scratch.

### Features

- Async action
- Store
- Sync action
- Dispatch
- RTK query

এই উদ্যোগে, আমি নিজের রিডাক্স টুলকিট সম্পূর্ণরূপে প্রতিষ্ঠান থেকে তৈরি করার জন্য প্রতিশ্রুতিবদ্ধ।

### ****Key Features****

- Sync/Async অ্যাকশনের জন্য ব্যাপক সমর্থন ।
- Store স্টোর ম্যানেজমেন্ট ।
- কর্মক্ষম আপডেটের জন্য প্রভাবী ডিস্প্যাচ পদ্ধতি ।
- RTK Query এর ব্যাপক ইন্টিগ্রেশন এবং ব্যবহার ।
- useSelector Hook ব্যবহার করে সর্বশেষ এবং আপডেটেড স্টোরে অ্যাক্সেস ।
- প্রমিস রিজেকশন হ্যান্ডল করতে builder add case ব্যবহার করে অ্যাসিংক অ্যাকশনের জন্য হ্যান্ডলিং ।
- Comes with built-in middleware like **`redux-thunk`** for handling async actions, making it easier to manage side effects.
- Offers a scalable and modular approach to managing state in larger applications by organizing logic into slices and modules.
- Helps in writing optimized and performant code due to its efficient data handling and state management techniques.

আমরা একটি মনো রিপো প্রজেক্ট তৈরি করেছি যা Redux Toolkit ড্রাইভার কোড এবং একটি ই-কমার্স অ্যাপ্লিকেশনের উদাহরণ সহ কন্টেন্ট করে।

## প্রজেক্ট স্ট্রাকচার <a id="project-structure"></a>

```markdown
Project Directory:
- .gitignore
- .idea
- README.md
- app.js
- example/
    |-- .eslintrc.cjs
    |-- .gitignore
    |-- README.md
    |-- dist
    |-- index.html
    |-- node_modules
    |-- package-lock.json
    |-- package.json
    |-- postcss.config.js
    |-- public
    |-- src/
        |-- App.css
        |-- App.jsx
        |-- assets
        |-- axios
        |-- component
        |-- index.css
        |-- layout
        |-- main.jsx
        |-- pages
        |-- routes.jsx
        |-- shared.scss
        |-- store
        |-- utils
    |-- tailwind.config.js
    |-- vite.config.js

- lerna.json
- node_modules
- package-lock.json
- package.json
- rsl-redux/
    - dist
    - jest.config.js
    - node_modules
    - package.json
    - readme.md
    - rollup.config.js
    - src/
        |-- configureStore.js
        |-- createApi.js
        |-- createAsyncThunk.js
        |-- createSlice.js
        |-- index.js
        |-- store.js
        |-- useDispatch.js
        |-- useSelector.js
    - tsconfig.json
```

```jsx
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

```jsx
import postSlice from "./slices/postSlice";
import authSlice from "./slices/authSlice";
import configureStore from "./redux-driver/configureStore.js";

const store = configureStore({
    reducer: {
        [postSlice.name]: postSlice.reducer,
        [authSlice.name]: authSlice.reducer
    }
})

export default store

```

```jsx
import createSlice from "../redux-driver/createSlice.js";

const authSlice = createSlice({
    name: 'authState',
    initialState: {
        auth: null,
        testAuth: {}
    },
    reducers: {
        setAuth(state, action){
            state.auth = {
                ...action.payload
            }
        },
        logOut(state){
            state.auth = null
        }
    },
})

export const {setAuth, logOut} = authSlice.actions
export default authSlice
```

```jsx
import createSlice from "../redux-driver/createSlice.js";
import {deletePostAsync, fetchPostsAsync} from "../actions/postAction";

const postSlice = createSlice({
    name: 'postState',
    initialState: {
        posts: []
    },
    reducers: {
        deletePost(state, action){
            state.posts = state.posts.filter(p=>p.id !== action.payload)
        },
        fetchPosts(state, action){
            state.posts = action.payload
        }
    },

    extraReducers: (builder) => {

        builder.addCase(deletePostAsync.fulfilled, (state, action) => {
            return {
                ...state,
                posts: state.posts.filter(post=>post.id !== action.payload)
            }
        })

        builder.addCase(fetchPostsAsync.fulfilled, (state, action) => {
            // this function need to invoked after call dispatch
            return {
                ...state,
                posts:  action.payload
            }
        })
    }
})

export const { fetchPosts, deletePost } = postSlice.actions
export default postSlice
```

```jsx
import createAsyncAction from "../redux-driver/createAsyncThunk.js";

export const deletePostAsync = createAsyncAction(
    "delete-post-request",
    async function (payload, thunkAPI) {
        return payload
    })

export const fetchPostsAsync = createAsyncAction(
    "fetch-posts-request",
    async function (_, thunkAPI) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                let res = await fetch("https://jsonplaceholder.typicode.com/posts")
                resolve(await res.json())
            }, 1000)
        })
    })
```

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'

import Provider  from './store/redux-driver/Provider.jsx'
import store from "./store/store"

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    	<App />
  </Provider>

  ,
)
```

```jsx
import {useEffect} from "react";
import useSelector from "../store/redux-driver/useSelector";
import dispatch from "../store/redux-driver/dispatch";
import {logOut, setAuth} from "../store/slices/authSlice";
import {deletePostAsync, fetchPostsAsync} from "../store/actions/postAction";

function ReduxSlice() {
    const postState = useSelector(state => state.postState)
    const authState = useSelector(state => state.authState)

    function handleUpdate() {
        dispatch({
            users: [
                {name: "Karim", id: 1},
                {name: "alex 2", id: 2}
            ]
        })
    }

    useEffect(() => {
        dispatch(fetchPostsAsync())
    }, [])

    function handleDeletePost(postId) {
       dispatch(deletePostAsync(postId))
    }

    function handleLogin(e) {
        e.preventDefault()
        const email = e.target.email.value
        dispatch(setAuth({email: email}))
    }
    function handleLogout() {
        dispatch(logOut())
    }

    function handleFetchPosts(){
        dispatch(fetchPostsAsync())
    }

    return (
        <div>

            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleFetchPosts}>Fetch post</button>

            <div className="grid grid-cols-12 gap-x-10">
                <div className="col-span-8">
                    <h4>Posts ({postState?.posts.length}) {Date.now().toString()}</h4>
                    <div>
                        {postState?.posts?.map(post => (
                            <div key={post.id} style={{display: "flex", justifyContent: "space-between"}}>
                                <li>{post.title}</li>
                                <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-4">
                    <h1 className="font-semibold text-base">User info</h1>

                    { authState?.auth &&  <div>
                        <h4>Logged user:</h4>
                        <p>{authState?.auth?.email}</p>

                        <button type="button" onClick={handleLogout}>Log out</button>
                    </div> }

                    { !authState?.auth &&  (
                        <form onSubmit={handleLogin}>
                            <input type="email" name="email" placeholder="Enter email address" />
                            <button type="submit">Login</button>
                        </form>
                    )}

                </div>

            </div>

        </div>
    )
}

export default ReduxSlice
```

# এখন আমরা আমাদের নিজস্ব Redux ড্রাইভার কোড তৈরি করব।

```jsx
function Provider({store, children}){
	return children
}

export default Provider
```

এই ফাংশন multiple slice নিয়ে স্টোর create করে   । Parameter হিসেবে reducer গ্রহণ করে সেটা object as key value pair, state name, and reducer function, 

এক্ষণে আমরা slice আর এনিতিয়াল value store a store Kore রাখবো।

And এই ফাংশন রিটার্ন করে স্টোর।

```jsx
import {store} from "./rtk.js";

function configureStore({reducer}) {
    for (const reducerKey in reducer) {
        let a = reducer[reducerKey]?.["initialState"]
        store.state = {
            ...store.state,
            [reducerKey]: a  || undefined
        }
    }

    return store
}
export default configureStore
```

আমরা বানাবো createAsynfthink, যেটা 
async Redux অ্যাকশন dispatch করে।

 createAsyncThunk  তিনটা প্যারামিটার নেয়, - -

 typePrerix: define Kore অ্যাকশন টাইপ স্ট্রিং ভালু।

payloadCreator: A ফাংশন সেটা আমাদের জন্যে Network request/API call Kore or asychonous অপারেশন করে, and kisu return করে, সেটা আমরা upwrap এবং slice, extraReducer এর মধ্যে অ্যাকসেস পাই।

সেটা একটা ভারুয়াবল, রিটার্ন করে fn,

আবার এই ফাংশন অবজেক্ট রিটার্ন করে।  And source হিসেবে function রিটার্ন করে।

```jsx
function createAsyncThunk(
        typePrefix,
        payloadCreator,
        options
    ) {
        const fulfilled = {
            type: typePrefix + '/fulfilled',
            payloadCreator
        }

        function actionCreator(arg) {
            return (dispatch, getState, extra) => {
                const promise = payloadCreator(arg, {dispatch, getState, extra});
                return Object.assign(promise, {
                    type: typePrefix + '/fulfilled',
                    arg,
                    unwrap() {
                        return promise.then(unwrapResult);
                    },
                });
            };
        }

        return Object.assign(actionCreator, {
            fulfilled,
            typePrefix,
        });
    }

export default createAsyncThunk;
```

Certainly! Here's a blog post in Bengali about creating a slice of state in Redux:
## Redux-এ স্টেট স্লাইস তৈরি
Redux, মডার্ন ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্টে স্টেট ম্যানেজমেন্টের একটি শক্তিশালী উপায় হিসেবে পরিচিত, এটির সাথে ব্যবহারকারী ইন্টারফেস এবং ব্যবহারকারীর স্টেট ডাটা স্মৃতি সম্পর্কিত সমস্যা সমাধান করতে সাহায্য করে। Redux এর মুল ধারণা হলো, আপনার এপ্লিকেশনের স্টেট সমস্যা সমাধানের জন্য একটি সেন্ট্রালাইজড স্টেট ম্যানেজমেন্ট স্থাপন করা।
Redux-এ, স্টেট ডাটা বিভিন্ন বিভিন্ন স্লাইস হিসেবে সংরক্ষণ করা হয়, যা আপনার এপ্লিকেশনের বিশেষ অংশগুলির স্থানীয় স্টেট ডাটা কে মোকাবে করে। এই স্লাইস স্টেট সিলেক্ট করতে এবং একটি অ্যাকশন বা ডিসপ্যাচ করতে সাহায্য করে, এটি Redux-এর একটি প্রধান ধারণা।
### Redux-এ স্টেট স্লাইস কী?
Redux-এ একটি স্লাইস স্টেট হলো একটি ক্ষুদ্র স্টেট ডাটা সেট, যা একটি স্পেসিফিক পার্ট অফ আপনার এপ্লিকেশনের স্টেট নিয়ন্ত্রণ করে। উদাহরণস্বরূপ, একটি ব্লগ এপ্লিকেশনে, আপনি ব্লগ পোস্ট গুলি এবং কর্মচারীর তথ্যের দুটি আলাদা স্লাইস স্টেট সেট করতে পারেন।
### Redux-এ স্লাইস স্টেট তৈরি
Redux-এ একটি স্লাইস স্টেট তৈরি করতে, আপনার প্রয়োজনীয় স্টেট ডাটা, রিডিউসার ফাংশন এবং একটি স্লাইস নাম থাকতে হবে।
```javascriptconst initialState = {  // আপনার স্লাইসের আদি স্টেট ডাটা};
const mySliceReducer = (state = initialState, action) => {  // রিডিউসার লজিক};
const mySliceName = "mySlice";
const mySlice = {  name: mySliceName,  reducer: mySliceReducer,  initialState: initialState,};```
### Redux-এ স্লাইস অ্যাকশন
আপনি স্লাইস স্টেটের সাথে কাজ করতে সাহায্য করতে পারেন
 Redux-এর এক্সটেনশন হিসেবে স্লাইস অ্যাকশন তৈরি করে। এই অ্যাকশন একটি অ্যাকশন ক্রিয়েটর ফাংশন এবং একটি প্যায়ারামিটার হিসেবে প্যায়ারামিটার স্থাপন করে, এটি স্টেট রিডিউসারের মাধ্যমে স্টেট ডাটা সেট করতে সাহায্য করে।
```javascriptconst myAction = (payload) => ({  type: `${mySliceName}/myAction`,  payload: payload,});```
### Redux-এ স্লাইস স্টেট কাজে লাগানো
Redux-এ স্লাইস স্টেট ব্যবহার করার জন্য, আপনি `useSelector` হুক ব্যবহার করতে পারেন যা স্টেটের নির্দিষ্ট অংশ নির্বাচন করতে সাহায্য করে। এছাড়া, স্লাইস অ্যাকশন ক্রিয়েট করতে এবং ডিস্প্যাচ করতে পারেন আপনার কোডের ভিতরে।
```javascriptimport { useSelector, useDispatch } from "react-redux";
// স্লাইস স্টেট সিলেক্ট করুনconst selectedState = useSelector((state) => state[mySliceName]);
// ডিস্প্যাচ করুনconst dispatch = useDispatch();dispatch(myAction(payload));```
### সমাপন
Redux-এ স্লাইস স্টেট ব্যবহার করা একটি প্রাকৃতিক এবং স্বল্পক্ষম উপায় যা আপনার এপ্লিকেশনের স্টেট ডাটা কে সাজানো এবং সরলীকরণ করতে সাহায্য করে। স্লাইস স্টেট স্লাইস নাম, ইনিশিয়াল স্টেট এবং সেট রিডিউসারের সাথে একটি ক্ষুদ্র এবং স্পেসিফিক স্টেট ডাটা সেট করার জন্য একটি সমৃদ্ধ উপায় সরবরাহ করে। এই স্লাইস স্টেট ব্যবহার করে, আপনি Redux-এর প্রেক্ষিপ্ত এবং কাস্টমাইজড স্টেট ম্যানেজমেন্ট সমাধানের একটি শক্তিশালী উপায় স্থাপন করতে পারেন।

```jsx
import {store} from "./store"

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
```

Dispatch function, আমার আমাদের অ্যাকশন গুলো কল করতে পারি অ্যান্ড স্টেট আপডেট করার জন্যে dispatch function use করি।

Akhane dispatch fn, akta argument ney, seta either promise or actions object, 

Case:১

Arg, type function, and return this function as promise.

Then we call actionCreator. It take dispatch getState fn, an other, and return promise as source and object that has type, args and unwrap function.

Case ২:

আমরা slice ar state নিয়েছি, অ্যান্ড অ্যাকশন ফাংশন কল সেটা slicbe আর reducer অবজেক্ট আর মধ্যে ডিফাইন করেছিলাম। এই ফাংশন পারমিটের slice state, and action object ney, Ar slice state ke modify Kore।

After modification আমার স্টেট এ আপডেটেড ভালু স্টোর করেছি। Dispatch করার মাধ্যমে যাতে, স্টেট আপডেট হবার পরে all সাবস্ক্রাইব আপডেট স্টেট পায়।

```jsx
import {store} from "./store";

function dispatch(actionObj) {

    if (typeof actionObj === "function") {

        // handle asynchronous createAsyncThunk action.
        let actionCall = actionObj(dispatch, store.getState, {})

        if (actionCall instanceof Promise) {
            actionCall.then(payloadResponse => {
                const reducerActionInfo = store.reducerAction[actionCall.type]
                const updatedState = reducerActionInfo.reducerActionFn(store.state[reducerActionInfo.reducerName], {
                    payload: payloadResponse, action: actionCall.type
                })
                store.reducerDispatch(reducerActionInfo.reducerName, updatedState)
            }).catch(ex => {

            })
        }

    } else {
        const {
            actionFn,
            reducerName,
            payload
        } = actionObj

        let sliceState = store["state"][reducerName]
        actionFn(sliceState, {payload})
        store.reducerDispatch(reducerName, sliceState)
    }

}

export default dispatch
```

আমরা আমাদের রিডাক্সের স্টক রেট করেছি স্টোরেজ স্টোরে

আমার দোকান: একটি নতুন দিকে

store অবজেক্টটি আপনার দোকানের জন্য একটি প্রাসঙ্গিক সরঞ্জাম সরবরাহ করে যা আপনার ব্যবসায়ের প্রতিস্থাপন ব্যবস্থা স্থাপন করতে সাহায্য করতে পারে। এই store ব্যবহার করে আপনি আপনার স্থানীয় দোকানে একটি বেশি প্রস্থান তৈরি করতে সাহায্য পেতে পারেন, এবং এটি আপনার গ্রাহকদের সাথে সংযোগ স্থাপন করতে সাহায্য করতে পারে।

এই store অবজেক্টে কিছু মৌলিক ফাংশন আছে, যা আপনাকে আপনার দোকানের ব্যবসায়ের দিকে একটি নতুন দিক নিয়ে যেতে সাহায্য করে:

1. `dispatch`: এই ফাংশন store স্থিতি আপডেট করে এবং সব শ্রুতিগুলির সাথে সংযোগ স্থাপন করে।
2. `reducerDispatch`: এই ফাংশন store নির্দিষ্ট রিডিউসারের জন্য স্থিতি আপডেট করে এবং সব শ্রুতিগুলির সাথে সংযোগ স্থাপন করে।
3. `subscribe`: এই ফাংশন একটি নতুন শ্রুতি সংযোগ স্থাপন করে যদি তা আগে করা না হয়ে থাকে।
4. `notify`: এই ফাংশন সব শ্রুতিগুলিকে স্থিতি আপডেট করার সূচনা দেয়।
5. `removeListener`: এই ফাংশন একটি শ্রুতি সংযোগ স্থাপন করা লিস্ট থেকে সরায়।
6. `getState`: এই ফাংশন বর্তমান স্থিতি অবজেক্ট প্রদান করে।

এই store অবজেক্টের উপযুক্তি আপনার দোকানের নির্দিষ্ট প্রয়োজনে ব্যবহার করা যেতে পারে, এবং স্থিতি পরিবর্তন বা ডেটা আপডেট স্থাপনের সাথে সব সময় সময়ে সংযোগ স্থাপন করার মাধ্যমে আপনার দোকানের কাস্টমাইজড ব্যবসায়ের জন্য store ব্যবহার করা যেতে পারে। দোকানের সাথে এই store সাথে একটি বৃদ্ধি নতুন দিকে নেতে সাহায্য করতে পারে এবং আপনার গ্রাহকদের সংযোগ উন্নত করতে সাহায্য করতে পারে।

```jsx
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
    },
    getState(){
        return store.state
    }
}
```

এখন আমরা ইউজ সিলেক্টর মেথর তৈরি করব সেটা দেখ স্টেটকে অফচার করবে এবং যখন আমাদের স্ট্রেট চেঞ্জ হবে তখন আমাদের অ্যাপ্লিকেশন রেজাল্ট করা যায় ওকে । তাহলে কি ডাক্তার ইউজ সিলেক্টর বুক এরকম। রিডাক্স এর ইউ সি লক্ষ এর মত আমরা কাজ তৈরি করব।

।

এখানে আমরা একটা কাজ করেছি l কল ব্যাক সেই কলরব ফাংশনের স্টেট কে পাস করেছে যাতে আমরা শুধুমাত্র সেটার জন্যই আমাদের অ্যাপ্লিকেশন রেজাল্ট করে। দেন আমরা ইউজ ইফেক্ট হুকের ভিতরে আমাদের স্টকে সাবস্ক্রাইব করে দিয়েছি যাতে কোন বিজনেস হইলে আমরা আপডেটেড স্টেট কে এক্সেস করতে পারি এবং সেই আপডেটেড স্টেট কে আমরা আমাদের লোকাল স্টোরি স্টোর করে রেখেছি যাতে আমাদের আপনি কি আফ্রিকান রিরেন্ডার হয় l এবং শেষে আমরা আন সাবস্ক্রাইব করেছি যদি আমাদের কম্পনেন্টলি আনমন্ট হয় ডম থেকে।

## সুসংহত ব্যবহারের জন্য useSelector ফাংশন
React, ব্যবহারকারী ইন্টারফেস তৈরি করতে সরলতা এবং সজীবতা দিয়ে পরিচিত, তার দিকে আগ্রহী প্রোজেক্ট পর্যাপ্তভাবে স্থাপন করা যায়। তবে, আপনার অ্যাপ্লিকেশন বাড়তি হলে আপনার স্টেট দ্বারা দ্বারা কার্যকরীভাবে ব্যবস্থাপনা করা গুরুত্বপূর্ণ হয়। `useSelector` হুক রিয়েক্ট র

সুসংহত ব্যবহারের জন্য useSelector ফাংশন
React, ব্যবহারকারী ইন্টারফেস তৈরি করতে সরলতা এবং সজীবতা দিয়ে পরিচিত, তার দিকে আগ্রহী প্রোজেক্ট পর্যাপ্তভাবে স্থাপন করা যায়। তবে, আপনার অ্যাপ্লিকেশন বাড়তি হলে আপনার স্টেট দ্বারা দ্বারা কার্যকরীভাবে ব্যবস্থাপনা করা গুরুত্বপূর্ণ হয়। `useSelector` হুক React Redux এর একটি গুরুত্বপূর্ণ অংশ, এটির সাহায্যে আপনি আপনার অ্যাপ্লিকেশনের গ্লোবাল স্টেটের নির্দিষ্ট অংশে প্রবেশ করতে এবং সাবস্ক্রাইব করতে সহায়ক সরল এবং দক্ষ উপায় পেতে পারেন।
### useSelector এর প্রস্তাবনা
React এ স্টেট ব্যবস্থাপনা সময়ে যত্নশীল হতে পারে, সহজতর উপায়ে স্টেটে অ্যাক্সেস করা এবং পর্যাপ্তভাবে আপনার অ্যাপ্লিকেশনের গ্লোবাল স্টেট ট্রির নির্দিষ্ট অংশে সাবস্ক্রাইব করা গুরুত্বপূর্ণ হয়।
এটির কাজের সূচনা নিম্নলিখিত:
1. **লোকাল স্টেট শুরু করা**: আপনার কাস্টম `useSelector` ফাংশনে, আপনি লোকাল স্টেট ভেরিয়েবল শুরু করেন, `state` নামে। এই স্টেটটি গ্লোবাল স্টেটের আপনার কম্পোনেন্টের কোন নির্দিষ্ট অংশ থেকে যে দরকার তাও ধারণ করবে।
```javascriptconst [state, setState] = useState(initialValue); // নির্দিষ্ট অংশের সাথে স্থিতি শুরু করুন```
2. **গ্লোবাল স্টেটের সাথে সাবস্ক্রাইব**: পরবর্তীতে, আপনি গ্লোবাল স্টেট পরিবর্তনের সময় যেসব লিস্টেনার কল করা হবে তা নির্ধারণ করেন, যা `listener` নামে আছে। এই ফাংশন গ্লোবাল স্টেট থেকে আপনি প্রয়োজনীয় অংশ বের করে নেয় এবং লোকাল স্টেট আপডেট করে।
```javascriptconst listener = (globalState) => {  const selectedState = cb(globalState); // স্টেটের নির্দিষ্ট অংশ বের করুন  setState(selectedState); // লোকাল স্টেট আপডেট করুন};```
3. **সাবস্ক্রাইব করার জন্য useEffect ব্যবহার**: `useEffect` হুকের মধ্যে, আ
পনি গ্লোবাল স্টেটের পরিবর্তনে সাবস্ক্রাইব করেন, `store.subscribe(listener)` কল করেন। এটি নিশ্চিত করে যে আপনার কম্পোনেন্টটি গ্লোবাল স্টেটের প্রয়োজনীয় অংশে হাল রাখে।
```javascriptuseEffect(() => {  // কম্পোনেন্ট মাউন্ট হলে স্টোরে সাবস্ক্রাইব করুন  store.subscribe(listener);
  // কম্পোনেন্ট আনমাউন্ট হলে সাবস্ক্রাইব বন্ধ করুন  return () => {    store.removeListener(listener);  };}, [/* ডিপেন্ডেন্সি */]);```
4. **নির্দিষ্ট স্টেট রিটার্ন করা**: শেষে, আপনার `useSelector` ফাংশন নির্দিষ্ট স্টেট রিটার্ন করে, যা আপনার কম্পোনেন্ট প্রদর্শন বা আরও লজিকের জন্য ব্যবহার করতে পারে।
```javascriptreturn state;```
### useSelector এর সুবিধা
- **কর্মক্ষমতা**: `useSelector` এর ব্যবহার করে আপনার কম্পোনেন্ট শুধুমাত্র সেই সংক্ষিপ্ত গ্লোবাল স্টেটের পরিবর্তনের সময় পুনরায় রে-রেন্ডার হয়, এটি পারফর্মেন্স উন্নত করে।
- **পরিষ্কার কোড**: এটি ব্যবহারকারীদের জন্য স্পষ্ট এবং পঠিতযোগ্য কোড সাজানোয়, ব্যাপারের ব্যবস্থা ছিড়িয়ে দেওয়া এবং প্রোপ বৈদ্যুতিনভাবে প্রেরণা না করার জন্য প্রয়োজনীয়তা কমেয়ে দেয়।
- **রে-রেন্ডার অপ্টিমাইজেশন**: শুধুমাত্র প্রয়োজনীয় স্টেট নির্বাচন করে, আপনি আপনার কম্পোনেন্টগুলির অপ্টিমাইজেশন অপ্টিমাইজেশন না করে এবং একটি আরও অপটিমাইজেট অ্যাপ্লিকেশনে পৌঁছানোর জন্য স্টেট নির্বাচন করার মাধ্যমে নির্দিষ্ট রে-রেন্ডার নিরুপণ করতে পারেন।
### সমাপন
`useSelector` রিয়েক্ট অ্যাপ্লিকেশনে গ্লোবাল স্টেট ম্যানেজমেন্টে একটি গুরুত্বপূর্ণ টুল। এটি স্টেট অ্যাক্সেস এবং আপডেট প্রস্তুত করতে সাহায্য করে, এটি আরো কর্মক্ষম এবং মেইনটেইনেবল কোড তৈরি করে। `useSelector` ব্যবহার করে, আপনি আপনার অ্যাপ্লিকেশনের স্টেট ম্যানেজম

```jsx
import { useEffect, useState } from "react";
import store from "../store";

function useSelector(cb) {
    let ini;
    const selectedState = cb(store.state);
    if(Array.isArray(selectedState)){
        ini = [...selectedState]
    }else if(typeof selectedState === "object") {
        ini = {...selectedState}
    } else {
        ini = undefined
    }
    const [state, setState] = useState(ini); // Initialize state with the specific part

    const listener = (gState) => {
        const selectedState = cb(gState);
        setState(selectedState)
    };

    useEffect(() => {
        // Subscribe to the store when the component mounts
        store.subscribe(listener);

        // Clean up the subscription when the component unmounts
        return () => {
            store.removeListener(listener);
        };

    }, [selectedState]); // Only resubscribe if the callback function changes

    // Return the selected state
    return state;
}

export default useSelector;
```

## Conclusion <a id="conclusion"></a>

In conclusion, we explored...


celscope: ki?