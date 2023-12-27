import {useEffect, useState} from "react";
import store from "./store";

function createApi(payload) {
    const {baseURL, reducerPath, endpoints} = payload

    let cacheKey;

    const builder = {
        query: function (params) {
            cacheKey = params.cacheKey
            return function (pay, cb) {
                let fullURL = baseURL + params.query(pay)

                cb({isLoading: true, data: null})
                fetch(fullURL).then(res => res.json()).then(data => {
                    cb({isLoading: false, data: data})
                }).catch(ex => {
                    cb({isLoading: false, data: null, error: ex})
                })
            }
        },
        mutation: function (mutationParams) {
            cacheKey = mutationParams.cacheKey

            return function (mutationUserPayload, cb) {
                let fullURL = baseURL + mutationParams.query(mutationUserPayload)

                console.log(mutationUserPayload, fullURL)

                // cb({isLoading: true, data: null})
                // fetch(fullURL).then(res => res.json()).then(data => {
                //     cb({isLoading: false, data: data})
                // }).catch(ex=>{
                //     cb({isLoading: false, data: null, error: ex})
                // })
            }
        }
    }


    // e return all endpoints hook function
    let e = endpoints(builder)

    // store all endpoint function to call action
    let returnData = {}

    for (const endKey in e) {
        returnData[endKey] = (hookPayload) => {

            if (endKey.includes("Mutation")) {
                return mutationFn(hookPayload, reducerPath, cacheKey, e, endKey)
            } else {
                return queryFn(hookPayload, reducerPath, cacheKey, e, endKey)
            }

        }
    }

    return returnData
}

function queryFn(hookPayload, reducerPath, cacheKey, e, endKey) {

    // this is hooks

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, setState] = useState({isLoading: false, data: null})

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {

        const cacheName = JSON.stringify(cacheKey) + (hookPayload ? "-" + JSON.stringify(hookPayload) : "")

        if (store.state[reducerPath]) {
            if (store.state[reducerPath][cacheName]) {
                setState(p => ({...p, data: store.state[reducerPath][cacheName]}))
            } else {

                e[endKey](hookPayload, function (apiData) {
                    setState(p => ({...p, ...apiData}))
                    store.state = {
                        ...store.state,
                        [reducerPath]: {
                            [cacheName]: apiData.data
                        }
                    }
                })


            }
        } else {
            e[endKey](hookPayload, function (apiData) {
                setState(p => ({...p, ...apiData}))
                store.state = {
                    ...store.state,
                    [reducerPath]: {
                        [cacheName]: apiData.data
                    }
                }
            })
        }

    }, [])

    return state

}

// handle builder.mutation method.
function mutationFn(payload, reducerPath, cacheKey, e, endKey) {


    // this is hooks

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, setState] = useState({isLoading: false, data: null})

    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect(() => {
    //
    //     const cacheName = JSON.stringify(cacheKey) + (payload ? "-" + JSON.stringify(payload) : "")
    //
    //     if (store.state[reducerPath]) {
    //         if (store.state[reducerPath][cacheName]) {
    //             setState(p => ({...p, data: store.state[reducerPath][cacheName]}))
    //         } else {
    //
    //             e[endKey](payload, function (apiData) {
    //                 setState(p => ({...p, ...apiData}))
    //                 store.state = {
    //                     ...store.state,
    //                     [reducerPath]: {
    //                         [cacheName]: apiData.data
    //                     }
    //                 }
    //             })
    //
    //
    //         }
    //     } else {
    //         e[endKey](payload, function (apiData) {
    //             setState(p => ({...p, ...apiData}))
    //             store.state = {
    //                 ...store.state,
    //                 [reducerPath]: {
    //                     [cacheName]: apiData.data
    //                 }
    //             }
    //         })
    //     }
    //
    // }, [])


    return [(userPayload) => mutatedFn(userPayload, state, setState), state]
}


// this function use for mutated cache or state.
function mutatedFn(userPayload, state, setState) {
    return userPayload
}

export default createApi