import { Button, Typography, Input } from "@material-tailwind/react";
import { Select, Option, Chip, Box, Textarea } from "@mui/joy";
import FloorPlan from './../../../assets/images/floor-plan.png';
import { createReservation } from "../../../services/ReservationService";
import { useEffect, useReducer, useState } from "react";
import CircularProgress from "../../Elements/Indicator/CircularProgress";
import { postReducer } from "../../../reducer/postReducer";
import { ACTION } from "../../../utils/action";
import { getTable } from "../../../services/TableService";
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
export default function BookingForm({ onCancel, success }) {
    const user = JSON.parse(localStorage.getItem("user"))
    const [state, dispatch] = useReducer(postReducer, {
        loading: false,
        errors: null,
        success: false
    })

    const [tables, setTables] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getTable();
                setTables(response.data);
            } catch (error) {
                console.log(error.data);
            }
        })();
    }, []);

    async function onSubmit(e) {
        e.preventDefault();
        dispatch({ type: ACTION.START });

        try {
            const formData = new FormData(e.target);
            const formJson = Object.fromEntries(formData.entries());
            const response = await createReservation({ ...formJson });
            dispatch({ type: ACTION.SUCCESS, payload: { data: response.data } });
            success();
        } catch (error) {
            dispatch({ type: ACTION.ERROR, payload: { errors: error.data } });
            console.log(error.data);
        }
    }

    return (
        <>
            {state.loading && <CircularProgress />}
            <form className="w-[50rem]" onSubmit={(e) => onSubmit(e)}>
                <div className="grid grid-cols-2 gap-x-5">
                    <div className="flex flex-col">
                        <Typography variant="h6">Your name</Typography>
                        <Input name="name" value={user.name} readOnly={true} className=" !border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{
                            className: "before:content-none after:content-none",
                        }} />
                        <Typography variant="h6" className="mt-3">How many people will you order for?</Typography>
                        <Select
                            name="persons"
                            placeholder="Select options"
                            endDecorator={
                                <Chip
                                    color="primary"
                                    variant="outlined"
                                    sx={{
                                        ml: 'auto',
                                        fontSize: "12px",
                                        paddingX: "10px"
                                    }}
                                >
                                    Person
                                </Chip>
                            }>
                            {Array.from({ length: 6 }, (_, i) => (
                                <Option value={i + 1} key={i} label={`${i + 1}`} >
                                    {i + 1}
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
                                        Person
                                    </Chip>
                                </Option>
                            ))}
                        </Select>
                        <Typography variant="h6" className="mt-3">Select an available table </Typography>
                        <Select name="table_id" placeholder="Select table">
                            <ListItemTable tables={tables} />
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
                        <Textarea minRows={3} placeholder="Notes" name="notes" />
                    </div>
                    <div>
                        <Typography variant="h6" className="">Restaurant Plan</Typography>
                        <ul className="flex gap-3 text-sm my-3">
                            <li className="text-green-500">&#11200; <span className="text-black">Available</span></li>
                            <li className="text-yellow-500">&#11200; <span className="text-black">Booked</span></li>
                            <li className="text-deep-purple-600">&#11200; <span className="text-black">Used</span></li>
                        </ul>
                        <p className="mt-3 text-sm font-serif font-medium bg-gray-100 p-2 rounded ">Below is the floor plan of our restaurant, please select the available table on the select menu on the left 😊.</p>
                        <img className="mt-2 border" src="https://restaurant.eatapp.co/hs-fs/hubfs/image6%20(4)-1.webp?width=669&height=350&name=image6%20(4)-1.webp" alt="" />
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
                        disabled={false}
                        type="submit"
                    >Reserve</Button>
                </footer>
            </form>
        </>
    );
}

function ListItemTable({ tables }) {
    return tables
        .map(item => (
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
}
