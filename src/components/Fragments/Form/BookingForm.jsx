import { Button, Typography, Textarea, Input } from "@material-tailwind/react";
import { Select, Option, Chip, Box } from "@mui/joy";
import FloorPlan from './../../../assets/images/floor-plan.png';
function getChipColor(text) {
    switch (text) {
        case "available":
            return "success";
        case "booked":
            return "warning";
        default:
            return "danger";
    }
}
export default function BookingForm({ onCancel, tables }) {

    const listTable = tables
        .map(item =>
        (
            <Option disabled={item.status !== "available"} sx={{ fontWeight: "700" }} value={item.id} key={item.id} label={item.no}>
                <Box component="span" sx={{ display: 'block' }}>
                    <p className="font-semibold">{item.no}</p>
                </Box>
                <Chip
                    color={getChipColor(item.status)}
                    onClick={function () { }}
                    variant="outlined"
                    sx={{
                        ml: 'auto',
                        fontSize: "12px",
                        paddingX: "10px",
                    }}
                >
                    {item.status}
                </Chip>
            </Option>)
        );


    function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        sessionStorage.setItem("reservation", JSON.stringify(formJson));
        alert(JSON.stringify(formJson));

        if (formJson === undefined) {
            window.location.href = "/";
        }
    }

    return (
        <form className="w-[50rem]" onSubmit={(e) => onSubmit(e)}>
            <div className="grid grid-cols-2 gap-x-5">
                <div className="flex flex-col">
                    <Typography variant="h6">Your name</Typography>
                    <Input name="name" value={"Ahmad Jaelani"} readOnly={true} className=" !border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{
                        className: "before:content-none after:content-none",
                    }} />
                    <Typography variant="h6" className="mt-3">How many people will you order for?</Typography>
                    <Select name="person" placeholder="Select options">
                        {Array.from({ length: 6 }, (_, i) => (
                            <Option value={i + 1} key={i} label={i + 1}>{i + 1}
                                <Chip
                                    color={"primary"}
                                    onClick={function () { }}
                                    variant="outlined"
                                    sx={{
                                        ml: 'auto',
                                        fontSize: "12px",
                                        paddingX: "10px",
                                    }}
                                >
                                    person
                                </Chip>
                            </Option>
                        ))}
                    </Select>
                    <Typography variant="h6" className="mt-3">Select an available table </Typography>
                    <Select name="table" placeholder="Select table">
                        {listTable}
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
                    <Textarea label="Notes" name="notes" />
                </div>
                <div>
                    <Typography variant="h6" className="">Restaurant Plan</Typography>
                    <ul className="flex gap-3 text-sm my-3">
                        <li className="text-green-500">&#11200; <span className="text-black">Available</span></li>
                        <li className="text-yellow-500">&#11200; <span className="text-black">Booked</span></li>
                        <li className="text-deep-purple-600">&#11200; <span className="text-black">Used</span></li>
                    </ul>
                    <p className="mt-5 text-sm  bg-blue-gray-50 p-2 rounded text-blue-900   ">Below is the floor plan of our restaurant, please select the available table on the select menu on the left 😊.</p>
                    <img className="mt-2" src={FloorPlan} alt="" />
                </div>

            </div>
            <footer className="flex justify-end gap-5 item-center">
                <Button
                    variant="outlined"
                    color="red"
                    onClick={onCancel}
                >Cancel</Button>

                <Button
                    className="bg-primary w-40"
                    type="submit"
                    disabled={false}
                >Reserve</Button>
            </footer>
        </form>
    );
}