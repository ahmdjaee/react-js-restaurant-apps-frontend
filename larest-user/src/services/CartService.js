import axiosClient from "./axios";

async function getCartItem() {
    try {
        const res = await axiosClient.get('/carts');
        return res;
    } catch (error) {
        throw error.response;
    }
}

async function updateCartItem(id, quantity) {
    try {
        const response = await axiosClient.patch('/carts/' + id, {
            quantity: quantity
        }, {});
        return response;
    } catch (error) {
        throw error.response;
    }
}

async function deleteCartItem(id) {
    try {
        const response = await axiosClient.delete('/carts/' + id, {});
        return response;
    } catch (error) {
        console.log(error.response);
        throw error.response;
    }
}

async function addCartItem({ menu_id, quantity }) {
    try {
        const response = await axiosClient.post('/carts', {
            menu_id,
            quantity
        }, {});
        return response;
    } catch (error) {
        console.log(error.response);
        throw error.response;
    }
}

export { getCartItem, updateCartItem, deleteCartItem, addCartItem }