import { Link } from "react-router-dom";


export default function Payment() {
    return (
        <>
            <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                <Link to={"/"}><a className="text-2xl font-bold text-gray-800">restaurants</a></Link>
                <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                    <div className="relative">
                        <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-xs font-semibold text-emerald-700" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </a>
                                <span className="font-semibold text-gray-900">Shop</span>
                            </li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-xs font-semibold text-emerald-700" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </a>
                                <span className="font-semibold text-gray-900">Order</span>
                            </li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">3</a>
                                <span className="font-semibold text-gray-900">Payment</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="m-auto flex gap-5">
                <img className="h-[30rem]" src="https://beasiswa.kamajaya.id/wp-content/uploads/2021/04/qris-yayasan-bakti-kamajaya-pf.jpg" alt="" />
                <div role="card" className="shadow-md p-5">
                    <ol className="list-decimal">
                        <li>Pilih Tombol Bayar</li>
                        <li>Kemudian akan terlihat QR Code dari pembayaran menggunakan QRIS</li>
                        <li>Pilih tombol Unduh QRIS untuk menyimpan QR Code nya</li>
                        <li>Buka Aplikasi Dompet Elektronik yang dimiliki dan mendukung fasilitas QRIS</li>
                        <li>Masukan QR Code dari QRIS yang sudah diunduh sebelumnya</li>
                        <li>Periksa kembali detail pembayaran anda</li>
                        <li>Jika sudah sesuai konfirmasi dan bayar pada Aplikasi Dompet Elektronik Anda</li>
                        <li>Jika proses pembayaran sudah berhasil, E-Ticket akan dikirim ke Email Anda</li>
                    </ol>
                </div>
            </div>
        </>
    );
}