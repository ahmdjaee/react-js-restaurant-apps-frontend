import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + "/api",
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
        window.location.reload();
    }
    return Promise.reject(error);
});

export default axiosClient