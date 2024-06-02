import { Link } from "react-router-dom";
import Text from "../../components/Elements/Text/Text";
import { Button, Card } from "@mui/joy";
import TextCurrency from "../../components/Elements/Text/TextCurrency";

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
            <div className="flex flex-col items-center container py-12 gap-5">
                <div className="flex flex-col shadow-md p-8 w-full md:w-10/12 lg:w-3/4 xl:w-[60%]">
                    <Text className={"font-semibold text-sm text-gray-400 tracking-wider"}>PAYMENT CODE</Text>
                    <Text className={"tracking-widest font-semibold"}>1567265665</Text>
                    <Text className={"font-semibold text-sm text-gray-400 tracking-wider"}>RECAP ITEM</Text>
                    <div className="flex justify-between items-center">
                        <Text className={"text-sm font-medium"}>Total Item</Text>
                        <Text className={"font-semibold"}>x10</Text>
                    </div>
                    <div className="flex justify-between items-center">
                        <Text className={"text-sm font-medium"}>Total Payment</Text>
                        <Text className={"font-semibold"}>Rp 100.000</Text>
                    </div>
                </div> 
                <div className="flex flex-col gap-3 shadow-md py-12 px-8 w-full md:w-10/12 lg:w-3/4 xl:w-[60%]">
                    <Text>QRIS</Text>
                    <div className="flex items-center gap-5">
                        <img className="max-h-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_QRIS.svg/2560px-Logo_QRIS.svg.png" alt="" srcset="" />
                        <div className="flex-grow">
                            <Text className={"text-xs leading-4 max-w-40"}>QR Code Standard National Payment</Text>
                        </div>
                        <img className="max-h-10" src="https://upload.wikimedia.org/wikipedia/commons/8/83/Gerbang_Pembayaran_Nasional_logo.svg" alt="" />
                    </div>
                    <Text className={"text-center text-lg font-medium text-gray-900"}>RESTAURANST</Text>
                    <img className="mx-10 max-h-[500px] object-contain flex-grow" src="https://static.vecteezy.com/system/resources/previews/013/722/213/non_2x/sample-qr-code-icon-png.png" alt="" />
                    <TextCurrency text={1000000} className={"text-center"}></TextCurrency>
                    <Button color="warning" sx={{mt: 2}} variant="solid" >DOWNLOAD QRIS</Button>
                </div>
                <div role="card" className="shadow-md p-8 text-sm w-full md:w-10/12 lg:w-3/4 xl:w-[60%]">
                    <Card color="warning" size="sm" sx={{ mb: 2 }} >How to pay QRIS</Card>
                    <li>Select the Pay Button</li>
                    <li>The QR Code for payment using QRIS will be displayed</li>
                    <li>Select the Download QRIS button to save the QR Code</li>
                    <li>Open the E-Wallet application that you have and supports QRIS</li>
                    <li>Enter the QR Code from QRIS that you downloaded earlier</li>
                    <li>Review your payment details</li>
                    <li>If everything is correct, confirm and pay using your E-Wallet application</li>
                    <li>If the payment process is successful, the E-Ticket will be sent to your email</li>
                </div>
            </div >
        </>
    );
}