import axios from "axios";

async function getCartItem() {
    try {
        const res = await axios.get('/carts');
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

async function updateCartItem(id, quantity) {
    try {
        const response = await axios.patch('/carts/' + id, {
            quantity: quantity
        }, {});
        return response.data;
    } catch (error) {
        throw error.response;
    }
}

async function deleteCartItem(id) {
    try {
        const response = await axios.delete('/carts/' + id, {});
        return response.data;
    } catch (error) {
        console.log(error.response);
        throw error.response;
    }
}

async function addCartItem({ menu_id, quantity }) {
    try {
        const response = await axios.post('/carts', {
            menu_id,
            quantity
        }, {});
        return response.data;
    } catch (error) {
        console.log(error.response);
        throw error.response;
    }
}

export { getCartItem, updateCartItem, deleteCartItem, addCartItem }