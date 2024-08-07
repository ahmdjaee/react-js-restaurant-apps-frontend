import React, { useState } from 'react';
import { Box, Typography, Button, Modal, Card } from '@mui/joy';
import QRCode from 'qrcode.react';
import SearchInput from '../../components/Elements/Input/SearchInput';

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
    <div className="container mx-auto sm:my-4">
      <Card variant="plain" className="shadow-md" sx={(theme) => ({
        [theme.breakpoints.up('xs')]: {
          padding: '32px',
        },
        [theme.breakpoints.only('xs')]: {
          padding: '16px',
        },
      })}>
        <Typography level="h4" className="mb-4 text-center">Reservation History</Typography>
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
          <button className="text-blue-500">All Reservations (50)</button>
          <button className="text-gray-500">Pending (10)</button>
          <button className="text-gray-500">Completed (8)</button>
          <button className="text-gray-500">Cancelled (22)</button>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-4 sm:space-y-0">
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} className="w-full sm:w-auto" />
          <div className="flex space-x-2 items-center">
            <input type="date" className="p-2 border border-gray-300 rounded" />
            <span>To</span>
            <input type="date" className="p-2 border border-gray-300 rounded" />
          </div>
          <button className="p-2 bg-gray-200 rounded">Sort By</button>
        </div>
        <div className="space-y-4">
          {filteredReservations.map((reservation, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <QRCode value={reservation.id} size={64} />
                <p className={`ml-2 ${reservation.status === 'Pending' ? 'text-orange-500' : reservation.status === 'Cancelled' ? 'text-red-500' : 'text-green-500'}`}>{reservation.status}</p>
              </div>
              <Typography><strong>Guest Name:</strong> {reservation.guestName}</Typography>
              <Typography><strong>Table Number:</strong> {reservation.tableNumber}</Typography>
              <Typography><strong>Reservation Time:</strong> {reservation.time}</Typography>
              <Typography><strong>Total:</strong> {reservation.total}</Typography>
              {reservation.invoice && (
                <Button onClick={() => handleOpenModal(reservation)} variant="outlined">View Invoice</Button>
              )}
            </div>
          ))}
        </div>
      </Card>
      <InvoiceModal open={openModal} onClose={handleCloseModal} reservation={selectedReservation} />
    </div>
  );
};

const InvoiceModal = ({ open, onClose, reservation }) => {
  if (!reservation) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="p-4 bg-white rounded-lg shadow-lg w-11/12 max-w-md mx-auto">
        <Typography level="h4" className="mb-4 text-center">Reservation Details</Typography>
        <Typography><strong>Reservation ID:</strong> {reservation.id}</Typography>
        <Typography><strong>Guest Name:</strong> {reservation.guestName}</Typography>
        <Typography><strong>Table Number:</strong> {reservation.tableNumber}</Typography>
        <Typography><strong>Reservation Time:</strong> {reservation.time}</Typography>
        <Typography><strong>Status:</strong> {reservation.status}</Typography>
        <Typography><strong>Total:</strong> {reservation.total}</Typography>
        <Button onClick={onClose} className="mt-4 block mx-auto">Close</Button>
      </Box>
    </Modal>
  );
};

export default ReservationHistory;

