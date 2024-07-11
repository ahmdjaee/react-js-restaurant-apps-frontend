import EmptyState from "../../../../components/Elements/Indicator/EmptyState"
import CardCart from "../../../../components/Fragments/Card/CardCart"
import { useCartContext } from "../../../../context/CartContext"

function CartSection({ setId }) {
    const { state, setOpenDialog, setQuantity } = useCartContext()

    if (state.loading) {
        return Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="w-full mb-2" >
                <div className="bg-white flex-grow rounded-lg h-40 p-5 flex ">
                    <div className="w-36 bg-zinc-200 animate-pulse" />
                    <div className="h-4 bg-zinc-200 flex-grow mx-5" />
                </div>
            </div>
        ))
    } else if (Array.isArray(state.carts) && state.carts.length === 0 || state.carts === null) {
        return <EmptyState />
    } else {
        return Array.isArray(state.carts) && state.carts.map((cart) => (
            <CardCart
                key={cart.id}
                cart={cart}
                onChangeQuantity={(e) => {
                    setQuantity(e)
                    setId(cart.id)
                }}
                onDelete={() => {
                    setOpenDialog(true)
                    setId(cart.id)
                }}
            />
        ))
    }
}

export default CartSection