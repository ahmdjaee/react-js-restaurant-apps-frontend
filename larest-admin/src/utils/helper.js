function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    if (hours === '00' && minutes === '00') {
        return `${year}-${month}-${day}`;
    }

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function formateTime(timeString) {
    const time = new Date(timeString);
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

const getMinDateTime = () => {
    return new Date().toISOString().slice(0, 16);
};

export { formatDate, formateTime , getMinDateTime }