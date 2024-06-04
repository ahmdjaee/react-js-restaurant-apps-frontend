import axios from "axios";

async function createReservation(data) {
    try {
        const response = await axios.post('/reservations', {
            table_id: data.table_id,
            status: data.status,
            date: data.date,
            persons: data.persons,
            time: data.time,
            notes: data.notes,
            status: 'pending'
        });
        return response.data;
    } catch (error) {
        throw error.response;
    }
}

async function getReservation() {
    try {
        const response = await axios.get('/reservations');
        return response.data;
    } catch (error) {
        throw error.response;
    }
}

async function updateReservation() {
    try {
        const response = await axios.patch('/reservations', {});
        return response.data;
    } catch (error) {
        throw error.response;
    }
}

export { createReservation, getReservation, updateReservation }