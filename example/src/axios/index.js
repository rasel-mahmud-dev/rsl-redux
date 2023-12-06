import axios from "axios";

export const api = axios.create({
    // baseURL: "http://localhost:1000/api/v1/rs-redux",
    baseURL: "http://192.168.169.203:1000/api/v1/rs-redux",
    headers: {

    }
})

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    config.headers["authorization"] = localStorage.getItem("token")
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
// });