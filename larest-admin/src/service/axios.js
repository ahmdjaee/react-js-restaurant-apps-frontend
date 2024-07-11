import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://restaurants.food/api",
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("ADMIN-TOKEN");
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        localStorage.removeItem("ADMIN-TOKEN");
    }
    return Promise.reject(error);
});

export default axiosClient