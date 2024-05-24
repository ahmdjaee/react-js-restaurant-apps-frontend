import { BASE_URL, token } from "./Api.js";

async function getCartItem(controller) {
    try {
        const response = await fetch(BASE_URL + "/carts", {
            signal: controller.signal,
            headers: {
                "Authorization": token
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

export { getCartItem }