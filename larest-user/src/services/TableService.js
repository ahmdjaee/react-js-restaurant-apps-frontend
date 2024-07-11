import axiosClient from "./axios.js";
import { BASE_URL, token } from "./config.js";

async function getTable() {
    try {
        const response = await axiosClient.get("/tables" );

        return response;
    } catch (error) {
        console.log(error);
    }
}


export { getTable }