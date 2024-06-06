import { IconButton, Textarea } from "@mui/joy";
import TextCurrency from "../../Elements/Text/TextCurrency";
import CounterInput from "../../Elements/Input/CounterInput";
import { useEffect, useState } from "react";
export default function CardCart({ cart, onDelete, onChangeQuantity }) {

    const [showNotes, setShowNotes] = useState(false)
    const [notes, setNotes] = useState("")
    const [quantity, setQuantity] = useState(cart.quantity)

    useEffect(() => {
        setQuantity(cart.quantity)
    }, [cart])

    const Notes = () => {
        if (notes === "" && showNotes === false) {
            return <a className="text-xs mt-3 max-w-xl cursor-pointer text-blue-500 hover:text-blue-600 font-medium" onClick={() => setShowNotes(!showNotes)}>Add notes</a>
        } else if (notes !== "" && showNotes === false) {
            return <p className="text-xs my-3 max-w-xl"><b>Notes : </b>{notes}<i onClick={() => setShowNotes(!showNotes)} className="ml-2 fa-solid fa-pen text-gray-600 cursor-pointer"></i></p>
        } else {
            return null;
        }
    };

    return (

        <div className="mb-2 bg-white rounded-lg h-40 p-5 flex">
            <img className="w-36 max-w-36 object-cover rounded-md" src={cart.menu.image} alt="" />
            <div className="px-5 flex-grow">
                <p className=" font-semibold">{cart.menu.name}</p>
                <p className="text-sm ">{cart.menu.description}</p>
                <Notes />
                {showNotes &&
                    <Textarea
                        autoFocus
                        onBlur={() => setShowNotes(false)}
                        placeholder="notes.."
                        size="sm" maxRows={1}
                        value={notes}
                        onKeyDown={(e) => e.key === "Enter" && setShowNotes(false)}
                        onChange={(e) => setNotes(e.target.value)}
                        sx={{
                            boxShadow: "none",
                            marginY: "8px",
                            flexGrow: 1
                        }} />
                }
                <div className="flex justify-end items-center gap-3">
                    <TextCurrency text={cart.menu.price} className="flex-grow text-base"></TextCurrency>
                    <CounterInput value={quantity} onChange={(e) => {
                        setQuantity(e);
                        onChangeQuantity(e)
                    }} />

                    <IconButton onClick={onDelete}>
                        <i className="text-gray-700 fa-solid fa-trash"></i>
                    </IconButton>
                </div>
            </div>
        </div>

    )
}
