import Api from "./Api.js";

async function register(data) {
    const response = await fetch(Api.BASE_URL + "/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        throw new Error("Error " + response.status + " " + response.statusText);
    }

    return response.json();
}

async function login(data) {
    const response = await fetch(Api.BASE_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error("Error " + response.status + " " + response.statusText);
    }

    return response.json();
}

const response = await login({
    email: "jae@gmail.com",
    password: "123456789"
});
console.log(response);
export default {
    register,
    login
}



