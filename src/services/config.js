import axios from "axios";

const token = localStorage.getItem("token");
const BASE_URL = "https://larest.xyz/api";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Authorization'] = token;

export {
    BASE_URL,
    token
}