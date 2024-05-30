import { BASE_URL, token } from "./config.js";

async function getTable(controller) {
    try {
        const response = await fetch(BASE_URL + "/tables",
            {
                method: "GET",
                signal: controller.signal,
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