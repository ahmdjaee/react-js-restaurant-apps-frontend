import { BASE_URL } from "./Api.js";

async function register(data) {
    try {
        const response = await fetch(BASE_URL + "/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (response.status === 404) {
            throw new Error("Error " + response.status + " " + response.statusText);
        }

        return {
            data: await response.json(),
            code: response.status
        };
    } catch (error) {
        console.log(error.message);
    }

}

async function login(data) {
    try {
        const response = await fetch(BASE_URL + "/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (response.status === 404) {
            throw new Error("Error " + response.status + " " + response.statusText);
        }

        return response.json();
    } catch (error) {
        console.log(error.message);
    }

}

export { register, login }


