import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    if (error.response.status === 401) {
        localStorage.removeItem("token");
    }
    console.log(error);
    throw error;
});

export default axiosClient