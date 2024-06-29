import axios from "axios";

const token = localStorage.getItem("token");
const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Authorization'] = token;

export {
    BASE_URL,
    token
}