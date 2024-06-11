import React, { useRef } from 'react';
import QRCode from 'qrcode.react';
import { toPng } from 'html-to-image';
import { Button } from '@mui/joy';

const Success = () => {
    const orderDetails = {
        orderNumber: '123456',
        date: '10 Juni 2024',
        paymentMethod: 'BCA Virtual Account',
        reservation: {
            name: 'Nabila Firdausa',
            date: '10 June 2024',
            time: '10.00 - 11.00',
            table: 'Table 1',
            persons: 4,
        },
        items: [
            { name: 'Nasi Goreng', quantity: 2, price: 25000 },
            { name: 'Ayam Bakar', quantity: 1, price: 30000 },
            { name: 'Es Teh Manis', quantity: 3, price: 5000 },
        ],
        total: 95000,
    };

    const ref = useRef(null);

    const handleDownload = () => {
        if (ref.current === null) {
            return;
        }

        toPng(ref.current, { cacheBust: true, backgroundColor: '#FFFFFF' })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'proof-of-payment.png';
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error('oops, something went wrong!', err);
            });
    };

    return (
        <div className=" bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
            <div ref={ref} className="relative w-full max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-6 pb-6 pt-4">
                    <div className=" flex items-center gap-2 mb-5">
                        <img className='h-10 absolute' src='/assets/images/logo.svg' />
                        <h1 className="font-semibold text-xl mt-3 mx-auto tracking-wide">RECEIPTS</h1>
                    </div>
                    <div className="mb-4 text-sm">
                        <p><span className="font-medium">Order ID:</span> {orderDetails.orderNumber}</p>
                        <p><span className="font-medium">Order Date:</span> {orderDetails.date}</p>
                        <p><span className="font-medium">Payment Method:</span> {orderDetails.paymentMethod}</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="font-bold border-b pb-2">Detail Reservation</h2>
                        <ul className="list-disc list-inside mt-2 text-sm ">
                            <li className=" text-gray-700">
                                Name : {orderDetails.reservation.name}
                            </li>
                            <li className=" text-gray-700">
                                Date : {orderDetails.reservation.date}
                            </li>
                            <li className=" text-gray-700">
                                Time : {orderDetails.reservation.time}
                            </li>
                            <li className=" text-gray-700">
                                Table : {orderDetails.reservation.table}
                            </li>
                            <li className=" text-gray-700">
                                Person : {orderDetails.reservation.persons}
                            </li>
                        </ul>
                    </div>
                    <div className="mb-4">
                        <h2 className="font-bold border-b pb-2">Detail Menu</h2>
                        <ul className="list-disc list-inside mt-2 text-sm">
                            {orderDetails.items.map((item, index) => (
                                <li key={index} className="text-gray-700">
                                    {item.name} - {item.quantity} x Rp {item.price.toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <QRCode value={`Order No: ${orderDetails.orderNumber}, Total: Rp ${orderDetails.total}`} />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <h2 className="font-semibold text-lg">Total</h2>
                        <h2 className="font-semibold text-lg text-gray-800">Rp {orderDetails.total.toLocaleString()}</h2>
                    </div>
                </div>
            </div>
            <Button className="w-full max-w-sm" sx={{ mt: 2 }} onClick={handleDownload}>DOWNLOAD RECEIPTS</Button>
        </div>
    );
};

export default Success
