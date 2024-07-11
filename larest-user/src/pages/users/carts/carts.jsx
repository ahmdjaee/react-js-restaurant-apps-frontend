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
import CustomSnackbar from "../../../components/Elements/Indicator/CustomSnackbar"
import CardCart from "../../../components/Fragments/Card/CardCart"
import { deleteCartItem, getCartItem, updateCartItem } from "../../../services/CartService"
import CardReservation from "./components/CardReservation"
import { useCartContext } from "../../../context/CartContext"
import EmptyState from "../../../components/Elements/Indicator/EmptyState"
import CartSection from "./components/CartSection"
import DeleteDialogModal from "../../../components/Fragments/Modal/DeleteDialogModal"

export default function Cart() {

    const [id, setId] = useState(null)
    const { state, dispatch, quantity, openDialog, setOpenDialog, item, setItem } = useCartContext()



    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const response = await getCartItem();
                dispatch({ type: "SET_CART", payload: response.data })
            } catch (error) {
                dispatch({ type: "ERROR", payload: error })
            }
        };

        fetchCarts();
        return () => dispatch({ type: "RESET" })
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
                dispatch({ type: "SUCCESS" })
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
            <DeleteDialogModal
                dialog={openDialog}
                onClose={() => setOpenDialog(false)}
                onCancel={() => setOpenDialog(false)}
                onDelete={onDelete}
            />
        </section>
    )
}
