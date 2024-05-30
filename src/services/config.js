import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";
const token = localStorage.getItem("token");

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Authorization'] = token;

export {
    BASE_URL,
    token
}