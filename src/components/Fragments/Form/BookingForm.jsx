import { Select, Option, Button, Typography, Textarea, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function BookingForm({ onCancel }) {
    return (
        <div className="w-[50rem]">
            <div className="grid grid-cols-2 gap-x-5">
                <div className="flex flex-col">
                    <Typography variant="h6">Your name</Typography>
                    <Input value={"Ahmad Jaelani"} readOnly={true} className=" !border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{
                        className: "before:content-none after:content-none",
                    }} />
                    <Typography variant="h6" className="mt-3">How many people will you order for?</Typography>
                    <Select label="1 Person">
                        <Option>1 Person</Option>
                        <Option>2 Person</Option>
                    </Select>
                    <Typography variant="h6" className="mt-3">Select an available table </Typography>
                    <Select label="25">
                        <Option>1</Option>
                        <Option>2</Option>
                    </Select>
                    <div className="flex">
                        <div className="w-full">
                            <Typography variant="h6" className="mt-3">Date</Typography>
                            <input className="border border-gray-300 rounded-md px-3 py-2" type="date" name="date" id="date" />
                        </div>
                        <div className="w-full">
                            <Typography variant="h6" className="mt-3">Time</Typography>
                            <input className="w-full border border-gray-300 rounded-md px-3 py-2" type="time" name="time" id="time" />
                        </div>
                    </div>
                    <Typography variant="h6" className="mt-3">Leave us your notes</Typography>
                    <Textarea label="Notes" />
                </div>
                <div>
                    <Typography variant="h6" className="">Restaurant Plan</Typography>
                    <ul className="flex gap-3 text-sm my-3">
                        <li className="text-yellow-500">&#11200; <span className="text-black">Available</span></li>
                        <li className="text-green-500">&#11200; <span className="text-black">Booked</span></li>
                        <li className="text-deep-purple-600">&#11200; <span className="text-black">Used</span></li>
                    </ul>

                    <div className="card w-50 h-60 bg-gray-100">Denah table</div>
                </div>
            </div>
            <footer className="flex justify-end gap-5 item-center">
                <Button
                    variant="outlined"
                    color="red"
                    onClick={onCancel}
                >Cancel</Button>
                <Link to={"/carts"}>
                    <Button
                        color="text-primary"
                        className="bg-primary w-40"
                    >Reserve</Button>
                </Link>
            </footer>
        </div>
    );
}