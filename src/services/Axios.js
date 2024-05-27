import axios from "axios";
import { token } from "./Api";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common['Authorization'] = token;

async function getCartItem() {
    try {
        const res = await axios.get('/carts');
        return res.data;
    } catch (err) {
        throw err.response;
    }

}

async function updateCartItem(id, quantity) {
    try {
        const response = await axios.patch('/carts/' + id, {
            quantity: quantity
        }, {
            headers: {
                "Authorization": token
            }
        });
        return response.data;
    } catch (error) {
        throw err.response;
    }
}

export { getCartItem, updateCartItem }