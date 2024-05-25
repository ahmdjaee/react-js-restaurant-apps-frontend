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

async function addCartItem(data, controller) {
    try {
        const response = await fetch(BASE_URL + "/carts", {
            method: "POST",
            signal: controller.signal,
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(data)
        });

        if (response.status === 404) {
            throw new Error("Error " + response.status + " " + response.statusText);
        }

        return response;
    } catch (error) {
        console.log(error.message)
    }
}

export { getCartItem, addCartItem }