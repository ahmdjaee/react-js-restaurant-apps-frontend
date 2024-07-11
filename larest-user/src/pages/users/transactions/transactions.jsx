import React, { useState } from 'react';
import { Box, Typography, Button, Modal, Card } from '@mui/joy';
import QRCode from 'qrcode.react';
import SearchInput from '../../../components/Elements/Input/SearchInput';

const ReservationHistory = () => {
    const reservations = [
        { id: '#R12526', guestName: 'John Doe', tableNumber: 5, time: '2024-06-10 19:00', status: 'Pending', total: '$50', invoice: true },
        { id: '#R52689', guestName: 'Jane Smith', tableNumber: 3, time: '2024-06-11 20:00', status: 'Cancelled', total: '$75', invoice: true },
        { id: '#R52648', guestName: 'Alice Johnson', tableNumber: 2, time: '2024-06-12 18:00', status: 'Cancelled', total: '$60', invoice: true },
        { id: '#R23845', guestName: 'Bob Brown', tableNumber: 8, time: '2024-06-13 21:00', status: 'Completed', total: '$90', invoice: true },
        { id: '#R23845', guestName: 'Bob Brown', tableNumber: 8, time: '2024-06-13 21:00', status: 'Completed', total: '$90', invoice: true },
    ];

    const [openModal, setOpenModal] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReservations = reservations.filter((reservation) => {
        return reservation.guestName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleOpenModal = (reservation) => {
        setSelectedReservation(reservation);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedReservation(null);
    };

    return (
        <div className="container ">
            <Card variant='plain'>
                <h2 className="text-xl font-semibold mb-4">Reservation History</h2>
                <div className="flex space-x-4 mb-4">
                    <button className="text-blue-500">All Reservations(50)</button>
                    <button className="text-gray-500">Pending(10)</button>
                    <button className="text-gray-500">Completed(8)</button>
                    <button className="text-gray-500">Cancelled(22)</button>
                </div>
                <div className="flex justify-between mb-4">
                    <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <div className="flex space-x-2 items-center">
                        <input type="date" className="p-2 border border-gray-300 rounded" />
                        <span>To</span>
                        <input type="date" className="p-2 border border-gray-300 rounded" />
                    </div>
                    <button className="p-2 bg-gray-200 rounded">Sort By</button>
                </div>
                <table className="min-w-full bg-white">
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className="text-left py-2">QR Code</th>
                            <th className="text-left py-2">Guest Name</th>
                            <th className="text-left py-2">Table Number</th>
                            <th className="text-left py-2">Reservation Time</th>
                            <th className="text-left py-2">Status</th>
                            <th className="text-left py-2">Total</th>
                            <th className="text-left py-2">Invoice</th>
                        </tr>
                    </thead>
                    <tbody className='px-2'>
                        {filteredReservations.map((reservation, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2">
                                    <QRCode value={reservation.id} size={64} />
                                </td>
                                <td className="py-2">{reservation.guestName}</td>
                                <td className="py-2">{reservation.tableNumber}</td>
                                <td className="py-2">{reservation.time}</td>
                                <td className={`py-2 ${reservation.status === 'Pending' ? 'text-orange-500' : reservation.status === 'Cancelled' ? 'text-red-500' : 'text-green-500'}`}>{reservation.status}</td>
                                <td className="py-2">{reservation.total}</td>
                                <td className="py-2 text-blue-500">
                                    {reservation.invoice && <button className="p-2 bg-gray-200 rounded" onClick={() => handleOpenModal(reservation)}>Invoice</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
            <InvoiceModal open={openModal} onClose={handleCloseModal} reservation={selectedReservation} />
        </div>
    );
};

const InvoiceModal = ({ open, onClose, reservation }) => {
    if (!reservation) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 1, width: '400px', margin: 'auto' }}>
                <Typography level="h4" sx={{ mb: 2, textAlign: 'center' }}>Reservation Details</Typography>
                <Typography><strong>Reservation ID:</strong> {reservation.id}</Typography>
                <Typography><strong>Guest Name:</strong> {reservation.guestName}</Typography>
                <Typography><strong>Table Number:</strong> {reservation.tableNumber}</Typography>
                <Typography><strong>Reservation Time:</strong> {reservation.time}</Typography>
                <Typography><strong>Status:</strong> {reservation.status}</Typography>
                <Typography><strong>Total:</strong> {reservation.total}</Typography>
                <Button onClick={onClose} sx={{ mt: 2, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>Close</Button>
            </Box>
        </Modal>
    );
};

export default ReservationHistory;
