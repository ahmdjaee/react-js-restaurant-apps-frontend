import axios from "axios";

async function makeOrder(data) {

    try {
        const response = await axios.post('/orders',
            {
                items: data.items,
                reservation_id: data.reservation_id,
                status: data.status,
                total_payment: data.total_payment
            });
            
        return response.data
    } catch (error) {
        throw error.response;
    }
}

export { makeOrder }