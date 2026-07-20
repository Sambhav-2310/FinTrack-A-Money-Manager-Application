import axios from 'axios'
import {BASE_URL} from "./ApiEndpoint.js";

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "content-type": "application/json",
        Accept: "application/json",
    }
});

//list of endpoints that do not required authorization header
const excludeEndpoints = ["/login","/register","/status","/activate","/health"];

//request interceptor
axiosConfig.interceptors.request.use((config) => {
    const shouldSkipToken = excludeEndpoints.some(endpoint => {
        return config.url?.includes(endpoint)
    });

    if(!shouldSkipToken){
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

//response interceptor
axiosConfig.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if(error.response) {
        if (error.response.status === 401) {
            window.location.href = "/login";
        } else if (error.response.status === 500) {
            console.error("Server Error");
        }
    }else if(error.code === "ECONNREFUSED"){
        console.error("Request Timeout");
    }

    return Promise.reject(error);
});

export default axiosConfig;