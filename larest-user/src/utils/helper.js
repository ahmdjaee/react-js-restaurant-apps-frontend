function formatDate(dateString = '') {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Check if time component is present
    if (dateString?.includes('T') || dateString?.includes(' ')) {
        return `${day} ${month} ${year} ${hours}:${minutes}`;
    }

    return `${day} ${month} ${year}`;
}

function formatTime(timeString = '') {
    // Split the input string to extract hours, minutes, and seconds
    const [hours, minutes, seconds] = timeString?.split(':').map(part => part.padStart(2, '0'));

    // Return the formatted time string
    return `${hours}:${minutes}:${seconds}`;
}

const getMinDateTime = (type = 'datetime') => {
    const date = new Date();
    if (type === 'datetime') {
        return date.toISOString().slice(0, 16); // format YYYY-MM-DDTHH:mm
    } else if (type === 'date') {
        return date.toISOString().slice(0, 10); // format YYYY-MM-DD
    } else if (type === 'time') {
        return date.toISOString().slice(11, 16); // format HH:mm
    } else {
        throw new Error('Invalid type. Use "datetime", "date", or "time".');
    }
};

const formatCurrency = (value) => {
    return new Intl.NumberFormat('in-ID', { style: 'currency', currency: 'IDR' }).format(value);
}

export { formatDate, formatTime , getMinDateTime, formatCurrency} 