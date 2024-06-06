import { Button } from "@material-tailwind/react";
import { useState } from "react";
import TextCurrency from "../../components/Elements/Text/TextCurrency";
import { getMenuDetail } from "../../services/MenuService";
import { addCartItem } from "../../services/CartService";
import { Link, useLoaderData } from "react-router-dom";
import CounterInput from "../../components/Elements/Input/CounterInput";
import CustomSnackbar from "../../components/Elements/Indicator/CustomSnackbar";

export async function loader({ params }) {
    const menu = await getMenuDetail(params.id);
    const data = menu.data
    return { data };
}

function Detail() {
    const { data } = useLoaderData();   

    const [quantity, setQuantity] = useState(1);
    const [success, setSuccess] = useState(false);

    const addToCart = () => {
        addCartItem({
            menu_id: data.id,
            quantity: quantity
        }).then(() => {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false)
            }, 1500);
        }).catch((err) => {
            console.log(err.body);
        });
    }

    return (
        <div className="container flex justify-center items-center gap-10 pt-14">
            {success && <CustomSnackbar text="Successfully add item to cart" />}
            <Link
                to={"/menus"}
                className="absolute top-28 left-56 cursor-pointer text-orange-900 font-semibold" >
                &#x2B9C; Menu
            </Link>
            <img className="w-5/12 xl:h-[26rem] rounded-lg object-cover" src={data.image} alt="" />
            <div className="flex-grow-0">
                <h1 className="text-5xl font-semibold">{data.name}</h1>
                <p className="text-base my-4">{data.description}</p>
                <TextCurrency fontWeight={"font-bold"} style="mb-12" text={data.price} />
                <div className="flex gap-5 mt-5">
                    <CounterInput onChange={(e) => setQuantity(e)}></CounterInput>
                    <Button
                        size="sm"
                        disabled={false}
                        className="rounded bg-dark flex-grow"
                        onClick={addToCart}
                    >
                        Add To Cart
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Detail