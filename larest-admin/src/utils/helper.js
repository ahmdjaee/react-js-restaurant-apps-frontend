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
    if (!timeString) return ''; // or some default value

    // Split the input string to extract hours, minutes, and seconds
    const [hours, minutes, seconds] = timeString.split(':').map(part => part.padStart(2, '0'));

    // Return the formatted time string
    return `${hours}:${minutes}:${seconds}`;
}

const getMinDateTime = () => {
    return new Date().toISOString().slice(0, 16);
};

const formatCurrency = (value = 0) => {
    return new Intl.NumberFormat('in-ID', { style: 'currency', currency: 'IDR' }).format(value);
}

function getCurrentDateTime() {
    let currentDateTime = new Date();
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    let formatter = new Intl.DateTimeFormat('id-ID', options);
    let formatterDateTime = formatter.format(currentDateTime);
    return formatterDateTime;
  }

export { formatDate, formatTime , getMinDateTime, formatCurrency, getCurrentDateTime} 