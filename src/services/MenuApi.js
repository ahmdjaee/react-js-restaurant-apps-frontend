import Api from "./Api.js";

async function getMenu(controller) {
    try {
        const response = await fetch(Api.BASE_URL + "/menus",{
            signal : controller.signal
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