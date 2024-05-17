import { Select, Option, Button } from "@material-tailwind/react";
import Spacer from "../../Elements/Spacer/Spacer";

export default function BookingForm({ onCancel }) {
    return (
        <>
            <div className="grid grid-cols-2 gap-x-5">
                <Select label="Select Version">
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                    <Option>Material Tailwind Vue</Option>
                    <Option>Material Tailwind Angular</Option>
                    <Option>Material Tailwind Svelte</Option>
                </Select>
                <Select label="Select Version">
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                    <Option>Material Tailwind Vue</Option>
                    <Option>Material Tailwind Angular</Option>
                    <Option>Material Tailwind Svelte</Option>
                </Select>
            </div>
            <Spacer modifier="h-[16.5rem]" />
            <footer className="flex justify-end gap-5 item-center">
                <Button
                    variant="outlined"
                    color="red"
                    onClick={onCancel}
                >Cancel</Button>
                <Button
                    color="text-primary"
                    className="bg-primary"
                >Save Changes</Button>
            </footer>
        </>
    );
}