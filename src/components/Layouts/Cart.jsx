import CardCart from "../Fragments/Card/CardCart"
function Cart() {
    return (
        <section className="h-screen bg-gray-200 pt-5">
            <div className="container flex gap-10">
                <div>
                    <CardCart />
                    <CardCart />
                    <CardCart />
                    <CardCart />
                </div>
                <div className="w-[28rem] bg-white rounded-lg h-52"></div>
            </div>
        </section>
    )
}

export default Cart