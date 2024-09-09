import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + "/api",
    headers: {
        Accept: "application/json",
    }
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("ADMIN-TOKEN");

    if (token) {
        // config.headers.Authorization = `Bearer ${token}`;
        config.headers.Authorization = token;
    }
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error?.response?.status === 401) {
        localStorage.removeItem("ADMIN-TOKEN");
        window.location.href = "/login";
    }
    return Promise.reject(error);
});

export default axiosClient