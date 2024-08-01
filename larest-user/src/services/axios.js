import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + "/api",
    // baseURL: "https://larest.xyz/api",
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("USER-TOKEN");
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        localStorage.removeItem("USER-TOKEN");
    }
    return Promise.reject(error);
});

export default axiosClient;