import { BASE_URL, token } from "./config.js";

async function getTable() {
    try {
        const response = await fetch(BASE_URL + "/tables",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            }
        );

        return response.json();
    } catch (error) {
        console.log(error);
    }
}


export { getTable }