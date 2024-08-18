function formatDate(dateString = '') {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Check if time component is present
    if (dateString?.includes('T') || dateString?.includes(' ')) {
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    return `${year}-${month}-${day}`;
}

function formatTime(timeString = '') {
    // Split the input string to extract hours, minutes, and seconds
    const [hours, minutes, seconds] = timeString?.split(':').map(part => part.padStart(2, '0'));

    // Return the formatted time string
    return `${hours}:${minutes}:${seconds}`;
}

const getMinDateTime = () => {
    return new Date().toISOString().slice(0, 16);
};

const formatCurrency = (value) => {
    return new Intl.NumberFormat('in-ID', { style: 'currency', currency: 'IDR' }).format(value);
}

export { formatDate, formatTime , getMinDateTime, formatCurrency} 