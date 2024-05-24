import { BASE_URL } from "./Api.js";

async function getMenu(controller) {
    try {
        const response = await fetch(BASE_URL + "/menus", {
            signal: controller.signal,
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.status === 404) {
            throw new Error(response.json());
        }

        return response.json();
    } catch (error) {
        console.log(error.message)
    }

}

export { getMenu }