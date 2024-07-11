import { BASE_URL } from "./config.js";

async function getMenu() {
    try {
        const response = await fetch(BASE_URL + "/menus", {
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
async function getMenuDetail(id) {
    try {
        const response = await fetch(BASE_URL + "/menus/" + id, {
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

export { getMenu, getMenuDetail }