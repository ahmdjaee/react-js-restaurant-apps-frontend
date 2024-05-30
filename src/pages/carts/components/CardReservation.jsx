import { Button } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import TextCurrency from "../../../components/Elements/Text/TextCurrency"
import Text from "../../../components/Elements/Text/Text"
export default function CardReservation({ item, total }) {

    return (
        <div className="w-[22rem] bg-white rounded-lg h-min px-5 py-7">
            <CartSummary item={item} total={total} />
            <Link to={"/order"} ><Button className="bg-primary my-5 w-full">Checkout ({25})</Button></Link>
        </div>
    )
}

function CartSummary({ item, total }) {
    return (
        <div className="">
            <Text className={"text-center font-bold"}>Detail Orders</Text>
            <div className="flex justify-between border-b mt-5 py-2">
                <Text>Items</Text>
                <Text className={"font-semibold"}>x{item}</Text>
            </div>
            <div className="flex items-center justify-between mb-5 py-2">
                <Text>Total</Text>
                <TextCurrency
                    color="text-black"
                    fontWeight="font-bold"
                    className={"text-base"}
                    text={total}
                />
            </div>
        </div>
    )
}
