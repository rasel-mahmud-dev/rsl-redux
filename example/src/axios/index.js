import axios from "axios";


const backend = import.meta.env.DEV ? "http://localhost:9000" : "https://rsl-app-api.vercel.app"
// const backend = import.meta.env.DEV ? "http://192.168.174.57:9000" : "https://rsl-app-api.vercel.app"

export const api = axios.create({
    withCredentials: true,
    baseURL: backend + "/api/v1/rs-redux",
    // baseURL: "http://192.168.169.203:1000/api/v1/rs-redux"
})

api.interceptors.request.use(function (config){
    const token = window.localStorage.getItem("token") || ""
    config.headers["Authorization"] =  token
    return config;
})

api.interceptors.response.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error

    let message = error.message;

    if(error.response?.data){
        if(error.response.data.message){
            message = error.response.data.message
        } else if(typeof error.response.data === "string"){
            message = error.response.data
        }
    }
    error.message = message
    return Promise.reject(error);
})