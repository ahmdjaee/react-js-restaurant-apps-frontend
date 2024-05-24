import { Button } from "@material-tailwind/react"
export default function CardReservation() {
    const reservation = JSON.parse(sessionStorage.getItem("reservation"))
    return (
        <div className="w-[32rem] bg-white rounded-lg h-min px-5 py-7">
            {reservation
                ? <>
                    {AfterReservation(reservation)}
                    <Button className="bg-primary my-5 w-full">Checkout</Button>
                </>
                : <>
                    <p className="text-center">No reservation</p>
                    <Button className="bg-primary my-5 w-full">Book Table</Button>
                </>
            }

        </div>
    )
}

function AfterReservation(reservation) {
    return (
        <div>
            <p className="text-center font-bold">Reservation</p>
            <div className="flex justify-between text-sm border-b py-2">
                <p>Name</p>
                <p className="font-semibold">{reservation.name}</p>
            </div>
            <div className="flex justify-between text-sm border-b py-2">
                <p>Table number</p>
                <p className="font-semibold">{reservation.table}</p>
            </div>
            <div className="flex justify-between text-sm border-b py-2">
                <p>Ordered for</p>
                <p className="font-semibold">{reservation.person} persons</p>
            </div>
            <div className="flex justify-between text-sm border-b py-2">
                <p>Date</p>
                <p className="font-semibold">{reservation.date}</p>
            </div>
            <div className="flex justify-between text-sm border-b py-2">
                <p>Time</p>
                <p className="font-semibold">{reservation.time}</p>
            </div>
            <div className="text-sm border-b py-2">
                <p>Note:</p>
                <p className="border p-2 mt-2 border-gray-400 rounded-sm">{reservation.notes}</p>
            </div>
        </div>
    )
}
