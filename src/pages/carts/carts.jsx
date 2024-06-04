import { useState, useEffect, createContext, useReducer } from "react"
import CardCart from "../../components/Fragments/Card/CardCart"
import CardReservation from "./components/CardReservation"
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Modal,
    ModalDialog
} from "@mui/joy"
import CustomSnackbar from "../../components/Elements/Indicator/CustomSnackbar"
import useCarts from "../../hooks/carts/useCartItem"
import { updateCartItem, deleteCartItem } from "../../services/CartService"

export const CartContext = createContext(null);

export default function Cart() {

    const [carts, loading, setCarts] = useCarts();
    const [openDialog, setOpenDialog] = useState(false)
    const [success, setSuccess] = useState(false)
    const [id, setId] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [delayedQuantity, setDelayedQuantity] = useState(quantity)

    const [state, dispatch] = useReducer(cartReducer, carts);

    useEffect(() => {
        const timer = setTimeout(() => {
            setQuantity(delayedQuantity)
        }, 300);

        return () => clearTimeout(timer)
    }, [delayedQuantity])


    async function onDelete() {
        deleteCartItem(id).then(() => {
            setSuccess(true);
            setOpenDialog(false)
            setCarts(carts.filter(cart => cart.id !== id))
            setTimeout(() => {
                setSuccess(false)
            }, 1500);
        }).catch((err) => {
            console.log(err);
        })
    }

    async function handleDelete(id) {

    }

    useEffect(() => {
        if (id !== null) {
            updateCartItem(id, quantity).then(() => {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false)
                }, 1500);
            }).catch((err) => {
                console.log(err);
            })
        }

    }, [quantity])

    

    return (
        <section className="bg-zinc-100 flex-grow py-5">
            {success && <CustomSnackbar text="Successfully update cart item" />}
            <div className="container h-full pb-5 flex gap-10">
                <div className="flex-grow h-min">
                    {loading
                        ? Array.from({ length: 4 }, (_, i) => (
                            <div key={i} className="w-full mb-2" >
                                <div className="bg-white flex-grow rounded-lg h-40 p-5 flex ">
                                    <div className="w-36 bg-gray-200 animate-pulse" />
                                    <div className="h-4 bg-gray-200 flex-grow mx-5" />
                                </div>
                            </div>
                        ))
                        : carts.map((cart) => (
                            <CardCart
                                key={cart.id}
                                cart={cart}
                                onChangeQuantity={(e) => {
                                    setDelayedQuantity(e)
                                    setId(cart.id)
                                }}
                                onDelete={() => {
                                    setOpenDialog(true)
                                    setId(cart.id)
                                }}
                            />
                        ))}
                </div>
                <CardReservation item={2} total={232323}  />
            </div>
            <DeleteDialog openDialog={openDialog} setOpenDialog={setOpenDialog} onDelete={onDelete} />
        </section>
    )
}


function cartReducer(state, action) {
    switch (action.type) {
        case "add": {

        }

        case "update": {

        }
        case "delete":
            return {
                success: true,
                carts: state.carts.filter(cart => cart.id !== action.id)
            }

        default:
            throw new Error()
    }
}


function DeleteDialog({ openDialog, setOpenDialog, onDelete }) {
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
