import { IconButton } from "@mui/joy";
import TextCurrency from "../../Elements/Text/TextCurrency";
import CounterInput from "../../Elements/Input/CounterInput";
import { useEffect, useState } from "react";
import { addCartItem } from "../../../services/CartService";
export default function CardCart({ id, image, title, description, quantity, price, onDelete }) {
    const [success, setSuccess] = useState(false);
    const [quantityState, setQuantityState] = useState(quantity)

    return (
        <>
            {success && <CustomSnackbar text="Successfully update item to cart" />}
            <div className="bg-white flex-grow rounded-lg h-40 p-5 flex">
                <img className="w-36 object-cover" src={image} alt="" />
                <div className="mx-5 text-ellipsis flex-grow flex flex-col">
                    <p className=" font-semibold">{title}</p>
                    <p className="text-sm flex-grow">{description}</p>
                    <div className="flex justify-end items-center gap-3">
                        <TextCurrency text={price} style="flex-grow text-base"></TextCurrency>
                        <CounterInput value={quantityState} onChange={(e) => {
                            setQuantityState(e);
                        }} ></CounterInput>
                        <IconButton onClick={onDelete}>
                            <i className="text-gray-700 fa-solid fa-trash"></i>
                        </IconButton>
                    </div>
                </div>
            </div>
        </>
    )
}