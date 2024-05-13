import { React, useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import TextCurrency from "../Elements/Text/TextCurrency";


function Detail() {
    const [quantity, setQuantity] = useState(1);
    const onChange = ({ target }) => setQuantity(target.value);
    const subTotal = quantity * 15_000

    if (quantity < 1) setQuantity(1)

    return (
        <div className="container flex items-center">
            <img className="w-1/2" src="https://d2vuyvo9qdtgo9.cloudfront.net/foods/February2024/Ds1IINpwAliKBeubG3QM.webp" alt="" />
            <div className="w-1/2">
                <h1 className="text-5xl font-semibold">Lorem ipsum dolor sit amet</h1>
                <p className="text-base my-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <TextCurrency fontWeight={"font-bold"} text={15_000} />
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
                        disabled={!quantity}
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