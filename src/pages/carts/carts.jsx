import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Modal,
    ModalDialog
} from "@mui/joy"
import { useEffect, useState } from "react"
import CustomSnackbar from "../../components/Elements/Indicator/CustomSnackbar"
import CardCart from "../../components/Fragments/Card/CardCart"
import { deleteCartItem, getCartItem, updateCartItem } from "../../services/CartService"
import CardReservation from "./components/CardReservation"
import { useCartContext } from "../../context/CartContext"
import EmptyState from "../../components/Elements/Indicator/EmptyState"

export default function Cart() {

    const [id, setId] = useState(null)
    const { state, dispatch, quantity, setOpenDialog, item, setItem } = useCartContext()

    const fetchCarts = async () => {
        dispatch({ type: "START" })
        try {
            const response = await getCartItem();
            dispatch({ type: "SET_CART", payload: response.data })
        } catch (error) {
            dispatch({ type: "ERROR", payload: error })
        }
    };

    useEffect(() => {
        fetchCarts();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            async function handleUpdate() {
                try {
                    const response = await updateCartItem(id, quantity)
                    if (response) {
                        dispatch({ type: "UPDATE", payload: response.data })
                    }
                } catch (error) {
                    dispatch({ type: "ERROR", payload: error })
                }
            }
            id && handleUpdate()
        }, 250);

        return () => clearTimeout(timer)
    }, [quantity, id])

    useEffect(() => {
        setItem({
            qty: state.carts?.reduce((prev, cart) => prev + cart.quantity, 0),
            totalPrice: state.carts?.reduce((prev, cart) => prev + cart.total_price, 0)
        })
    }, [state.carts])

    async function onDelete() {
        deleteCartItem(id).then(() => {
            setOpenDialog(false)
            dispatch({ type: "DELETE", payload: id })
            setTimeout(() => {
                dispatch({ type: "RESET" })
            }, 1500);
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <section id="cartSection" className="overflow-x-clip bg-zinc-100 flex-grow sm:py-5">
            {state.success && <CustomSnackbar text="Successfully delete item" />}
            <div className="container h-full sm:pb-5 flex flex-col md:flex-row gap-10">
                <div className="flex-grow h-min">
                    <CartSection setId={setId} />
                </div>
                {(Array.isArray(state.carts) && state.carts.length > 0) && <CardReservation item={item.qty && item.qty} total={item.totalPrice} />}
            </div>
            <DeleteDialog onDelete={onDelete} />
        </section>
    )
}

function CartSection({ setId }) {
    const { state, setOpenDialog, setQuantity } = useCartContext()

    if (Array.isArray(state.carts) && state.carts.length === 0 || state.carts === null) {
        return <EmptyState />
    }

    if (state.loading) {
        return Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="w-full mb-2" >
                <div className="bg-white flex-grow rounded-lg h-40 p-5 flex ">
                    <div className="w-36 bg-zinc-200 animate-pulse" />
                    <div className="h-4 bg-zinc-200 flex-grow mx-5" />
                </div>
            </div>
        ))
    } else {
        return state.carts.map((cart) => (
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

function DeleteDialog({ onDelete }) {
    const { setOpenDialog, openDialog } = useCartContext()

    return <Modal open={openDialog} onClose={() => setOpenDialog(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
            <DialogTitle>
                Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>
                Are you sure want to delete this data?
            </DialogContent>
            <DialogActions>
                <Button variant="solid" color="danger" onClick={onDelete}>
                    Delete
                </Button>
                <Button variant="text" color="black" onClick={() => setOpenDialog(false)}>
                    Cancel
                </Button>
            </DialogActions>
        </ModalDialog>
    </Modal>
}


