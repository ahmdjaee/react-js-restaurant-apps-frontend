import { BASE_URL, token } from "./Api.js";

async function getCartItem() {
    try {
        const response = await fetch(BASE_URL + "/carts", {
            headers: {
                "Authorization": token
            },

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

async function deleteCartItem(id) {
    try {
        const response = await fetch(BASE_URL + "/carts/" + id,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            }
        );
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}
async function updateCartItem(id, quantity) {
    try {
        const response = await fetch(BASE_URL + "/carts/" + id,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(quantity)
            }
        );
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export { getCartItem, addCartItem, deleteCartItem, updateCartItem }