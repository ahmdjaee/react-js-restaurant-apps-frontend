import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + "/api",
    headers: {
        Accept: "application/json",
    }
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("USER-TOKEN");
    
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error?.response?.status === 401) {
        localStorage.removeItem("USER-TOKEN");
        // window.location.reload();
    }
    return Promise.reject(error);
});

export default axiosClient;