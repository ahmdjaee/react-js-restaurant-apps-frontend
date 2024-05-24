import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import TextCurrency from "../Elements/Text/TextCurrency";
import { getMenuDetail } from "../../services/MenuService";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
    const controller = new AbortController();
    const menu = await getMenuDetail(params.id, controller);
    const data = menu.data
    return { data };
}

function Detail() {
    const { data } = useLoaderData();

    const [quantity, setQuantity] = useState(1);
    const onChange = ({ target }) => setQuantity(target.value);
    const subTotal = quantity * data.price

    if (quantity < 1) setQuantity(1)

    return (
        <div className="container flex items-center pt-14">
            <a className="absolute top-28 left-56 cursor-pointer text-orange-900 font-semibold" href="/menus">&#x2B9C; Menu</a>
            <img className="w-1/2 max-h-96" src={data.image} alt="" />
            <div className="w-1/2">
                <h1 className="text-5xl font-semibold">{data.name}</h1>
                <p className="text-base my-4">{data.description}</p>
                <TextCurrency fontWeight={"font-bold"} text={data.price} />
                <div className="relative flex w-full gap-5 max-w-[30rem] mt-5">
                    <Input
                        type="number"
                        typeof="number"
                        label="Select Quantity"
                        value={quantity}
                        onChange={onChange}
                        containerProps={{
                            className: "w-20",
                        }}
                    />
                    <TextCurrency color={"text-gray-900"} style="absolute text-sm right-[17rem] top-[0.6rem]" text={subTotal} />
                    <Button
                        size="sm"
                        disabled={false}
                        className=" rounded bg-dark w-96"
                    >
                        Add To Cart
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Detail