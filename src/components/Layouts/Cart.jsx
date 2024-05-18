
import Spacer from "../Elements/Spacer/Spacer"
import CardCart from "../Fragments/Card/CardCart"
import CardReservation from "../Fragments/Card/CardReservation"
function Cart() {
    return (
        <section className="overflow-auto bg-gray-200 py-5">
            <div className="container flex gap-10">
                <div>
                    {Array.from({ length: 5 }, (_, i) => (
                        <>
                            <CardCart key={i} />
                            <Spacer modifier={"h-2"} />
                        </>
                    ))}
                </div>
                <CardReservation />
            </div>
        </section>
    )
}

export default Cart


