import { useState, useEffect } from "react"
import Spacer from "../Elements/Spacer/Spacer"
import CardCart from "../Fragments/Card/CardCart"
import CardReservation from "../Fragments/Card/CardReservation"
import { getCartItem } from "../../services/CartService"
function Cart() {

    const [carts, setCarts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            setLoading(true)
            const response = await getCartItem(controller);

            if (response.data !== undefined) {
                setCarts(response.data)
                setLoading(false)
            }
        }

        fetchData();
        return () => controller.abort();
    }, [])

    return (
        <section className="h-full bg-gray-200 py-5">
            <div className="container pb-5 flex gap-10">
                <div className="w-full h-screen ">
                    {loading
                        ? Array.from({ length: 4 }, (_, i) => (
                            <div className="w-full " >
                                <div className="bg-white flex-grow rounded-lg h-40 p-5 flex ">
                                    <div className="w-36 bg-gray-200 animate-pulse" />
                                    <div className="h-4 bg-gray-200 flex-grow mx-5"></div>
                                </div>
                                <Spacer modifier={"h-2"} />
                            </div>
                        ))
                        : carts.map((cart) => (
                            <div className="w-full" key={cart.id}>
                                <CardCart image={cart.menu.image} title={cart.menu.name} description={cart.menu.description} quantity={cart.quantity} />
                                <Spacer modifier={"h-2"} />
                            </div>
                        ))}
                </div>
                <CardReservation />
            </div>
        </section>
    )
}

export default Cart


