import axios from "axios";

const BASE_URL = "https://larest.xyz/api"; // for production
// const BASE_URL = "http://restaurants.food/api"; // for development
const token = localStorage.getItem("token");

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Authorization'] = token;

export {
    BASE_URL,
    token
}