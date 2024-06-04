import { Box, Button, Modal, ModalDialog, Textarea, Typography } from "@mui/joy";
import { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import useCarts from "../../hooks/carts/useCartItem";
import TextCurrency from "../../components/Elements/Text/TextCurrency";
import TextBetween from "../../components/Elements/Text/TextBetween";
import useReservation from "../../hooks/reservation/useReservation";
import { postReducer } from "../../reducer/postReducer";
import { ACTION } from "../../utils/action";

export default function Order() {

    const [reservation, loadingReservation, error] = useReservation();
    const [showModal, setShowModal] = useState(false);
    const [carts, loadingCarts] = useCarts();
    const totalPayment = carts.reduce((accumulator, cart) => accumulator + cart.total_price, 0);
    const totalItem = carts.reduce((accumulator, cart) => accumulator + cart.quantity, 0);

    const [state, dispatch] = useReducer(postReducer, {
        loading: false,
        success: false,
        errors: null
    })

    const handleOrder = () => {
        dispatch({ type: ACTION.START });
        try {
            dispatch({ type: ACTION.SUCCESS })
        } catch (error) {
            dispatch({ type: ACTION.ERROR })
        }
    }
    return (
        <>
            <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                <Link to={"/"} className="text-2xl font-bold text-gray-800" >restaurants</Link>
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
                                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">2</a>
                                <span className="font-semibold text-gray-900">Order</span>
                            </li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
                                <span className="font-semibold text-gray-500">Payment</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 mb-8">
                <div className="px-4 pt-8">
                    <p className="text-xl font-medium">Order Summary</p>
                    <p className="text-gray-400">Check your items. And select a suitable payment method.</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 ">
                        {loadingCarts
                            ? Array.from({ length: 2 }, (_, i) => (
                                <div key={i} className="flex flex-col rounded-lg bg-white sm:flex-row" >
                                    <div className="m-2 h-24 w-28 rounded-md border object-cover object-center bg-gray-200 animate-pulse" alt="" />
                                    <div className="flex gap-2 flex-grow flex-col px-4 py-4">
                                        <span className="h-4 w-40 rounded-md bg-gray-200 animate-pulse" />
                                        <span className="h-4 w-40 rounded-md bg-gray-200 animate-pulse" />
                                    </div>
                                </div>
                            ))
                            : carts.map(cart => (
                                <div key={cart.id} className="flex flex-col rounded-lg bg-white sm:flex-row">
                                    <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={cart.menu.image} alt="" />
                                    <div className="flex flex-grow flex-col px-4 py-4">
                                        <span className="font-semibold">{cart.menu.name}</span>
                                        <span className="float-right text-gray-400">x{cart.quantity}</span>
                                        {/* <p className="text-lg font-bold">$138.99</p> */}
                                        <TextCurrency color="text-black" className={"text-lg font-bold"} text={cart.menu.price} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <p className="mt-8 text-lg font-medium">Payment Methods</p>
                    <form className="mt-5 grid gap-6">
                        <div className="relative">
                            <input className="peer hidden" id="radio_1" type="radio" name="radio" defaultChecked />
                            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                            <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                                <img className="w-14 object-contain max-h-12" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_QRIS.svg/2560px-Logo_QRIS.svg.png" alt="" />
                                <div className="ml-5">
                                    <span className="mt-2 font-semibold">QRIS</span>
                                    <p className="text-slate-500 text-sm leading-6">Scan qr code to pay</p>
                                </div>
                            </label>
                        </div>
                        <div className="relative">
                            <input className="peer hidden" id="radio_2" type="radio" name="radio" defaultChecked />
                            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                            <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
                                <img className="w-14 object-contain max-h-12" src="https://aalfiann.thedev.id/images/portfolio/bca-va.png" alt="" />
                                <div className="ml-5">
                                    <span className="mt-2 font-semibold">BCA Virtual Account</span>
                                    <p className="text-slate-500 text-sm leading-6">Pay using bca virtual account</p>
                                </div>
                            </label>
                        </div>
                    </form>
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Reservation Details</p>
                    <p className="text-gray-400">Double check that your reservation is correct</p>
                    <div className="">
                        <div className="mt-6 border-t border-b px-5 py-2">
                            {loadingReservation
                                ? Array.from({ length: 6 }, (_, i) => (
                                    <TextBetween
                                        key={i}
                                        leftStyle={"h-4 bg-gray-200 w-24 rounded-md  animate-pulse"}
                                        rightStyle={"h-4 bg-gray-200 w-40 rounded-md animate-pulse"}
                                    />
                                ))
                                : <>
                                    <TextBetween leftText="Name" rightText={reservation.user.name} />
                                    <TextBetween leftText="Table Number" rightText={reservation.table.no} />
                                    <TextBetween leftText="Ordered For" rightText={reservation.persons + " Person"} />
                                    <TextBetween leftText="Date" rightText={reservation.date} />
                                    <TextBetween leftText="Time" rightText={reservation.time} />
                                    <TextBetween leftText="Note" />
                                    <Textarea value={reservation.notes} minRows={3} maxRows={3} readOnly sx={{ boxShadow: "none" }} />
                                </>
                            }
                        </div>
                        <div className="mt-6 border-t border-b py-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Total Item</p>
                                <p className="font-semibold text-gray-900">x{totalItem}</p>
                            </div>
                            {/* <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Shipping</p>
                                <p className="font-semibold text-gray-900">$8.00</p>
                            </div> */}
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Total payment</p>
                            <TextCurrency className="text-2xl" fontWeight="font-semibold" color="text-gray-900" text={totalPayment} />
                            {/* <p className="text-2xl font-semibold text-gray-900">{totalPayment}</p> */}
                        </div>
                    </div>
                    {/* <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button> */}
                    <Button color="dark" onClick={() => setShowModal(true)} size="lg" sx={{ my: 2, }} fullWidth>Place Older</Button>
                </div>
            </div>

            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <ModalDialog
                    aria-labelledby="nested-modal-title"
                    aria-describedby="nested-modal-description"
                    sx={(theme) => ({
                        [theme.breakpoints.only('xs')]: {
                            top: 'unset',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            borderRadius: 0,
                            transform: 'none',
                            maxWidth: 'unset',
                        },
                    })}
                >
                    <Typography id="nested-modal-title" level="h2">
                        Are you absolutely sure?
                    </Typography>
                    <Typography id="nested-modal-description" textColor="text.tertiary">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, animi.
                    </Typography>
                    <Box
                        sx={{
                            mt: 1,
                            display: 'flex',
                            gap: 1,
                            flexDirection: { xs: 'column', sm: 'row-reverse' },
                        }}
                    >
                        <Button variant="solid" color="success" onClick={() =>window.location.href = "/payment"}>
                            Continue
                        </Button>
                        <Button
                            variant="outlined"
                            color="neutral"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </>
    )
}

