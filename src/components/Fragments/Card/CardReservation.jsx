import { Button } from "@material-tailwind/react"
export default function CardReservation() {
    return <div className="w-[28rem] bg-white rounded-lg h-min px-5 py-7">
        <p className="text-center font-bold">Reservation</p>
        <div className="flex justify-between text-sm border-b py-2">
            <p>Name</p>
            <p className="font-semibold">John Doe</p>
        </div>
        <div className="flex justify-between text-sm border-b py-2">
            <p>Table number</p>
            <p className="font-semibold">5</p>
        </div>
        <div className="flex justify-between text-sm border-b py-2">
            <p>Ordered for</p>
            <p className="font-semibold">2 persons</p>
        </div>
        <div className="flex justify-between text-sm border-b py-2">
            <p>Date</p>
            <p className="font-semibold">2022-01-01</p>
        </div>
        <div className="flex justify-between text-sm border-b py-2">
            <p>Time</p>
            <p className="font-semibold">12:00</p>
        </div>
        <div className="text-sm border-b py-2">
            <p>Note:</p>
            <p className="border p-2 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, voluptatem odit! Voluptates aliquid vel perferendis?</p>
        </div>
        <Button className="bg-primary my-5 w-full">Checkout</Button>
    </div>
}