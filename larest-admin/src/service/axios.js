import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + "/api",
    headers: {
        Accept: "application/json",
    }
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("access-token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error?.response?.status === 401) {
        localStorage.removeItem("access-token");
        window.location.href = "/login";
    }
    return Promise.reject(error);
});

export default axiosClient