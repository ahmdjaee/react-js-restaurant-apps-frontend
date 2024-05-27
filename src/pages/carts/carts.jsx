import { useState, useEffect, useDeferredValue, useCallback } from "react"
import Spacer from "../../components/Elements/Spacer/Spacer"
import CardCart from "../../components/Fragments/Card/CardCart"
import CardReservation from "../../components/Fragments/Card/CardReservation"
import { deleteCartItem } from "../../services/CartService"
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
import { updateCartItem } from "../../services/Axios"

function Cart() {

    const [carts, loading] = useCarts();
    const [openDialog, setOpenDialog] = useState(false)
    const [success, setSuccess] = useState(false)
    const [id, setId] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [delayedQuantity, setDelayedQuantity] = useState(quantity)

    useEffect(() => {
        const timer = setTimeout(() => {
            setQuantity(delayedQuantity)
        }, 1000);

        return () => clearTimeout(timer)
    }, [delayedQuantity])


    async function onDelete() {
        const response = await deleteCartItem(id);

        if (response.errors) {
            console.log('errorrrr');
        }

        if (response.data) {
            setSuccess(true);
            setOpenDialog(false)
            carts.splice(carts.findIndex(cart => cart.id === id), 1)
            setTimeout(() => {
                setSuccess(false)
            }, 1500);
        }

    }

    useEffect(() => {
        updateCartItem(id, quantity).then(() => {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false)
            }, 1500);
        }).catch((err) => {
            console.log(err);
        })

    }, [quantity])



    return (
        <section className="bg-gray-200 flex-grow py-5">
            {success && <CustomSnackbar text="Successfully update item to cart" />}
            <div className="container h-full pb-5 flex gap-10">
                <div className="flex-grow h-min">
                    {loading 
                        ? Array.from({ length: 4 }, (_, i) => (
                            <div key={i} className="w-full " >
                                <div className="bg-white flex-grow rounded-lg h-40 p-5 flex ">
                                    <div className="w-36 bg-gray-200 animate-pulse" />
                                    <div className="h-4 bg-gray-200 flex-grow mx-5" />
                                </div>
                                <Spacer modifier={"h-2"} />
                            </div>
                        ))
                        : carts.map((cart) => (
                            <div className=" h-min" key={cart.id}>
                                <CardCart
                                    id={cart.menu.id}
                                    image={cart.menu.image}
                                    title={cart.menu.name}
                                    description={cart.menu.description}
                                    quantity={cart.quantity}
                                    price={cart.menu.price}
                                    onChangeQuantity={(e) => {
                                        setDelayedQuantity(e)
                                        setId(cart.id)
                                    }}
                                    onDelete={() => {
                                        setOpenDialog(true)
                                        setId(cart.id)
                                    }}
                                />
                                <Spacer modifier={"h-2"} />
                            </div>
                        ))}
                </div>
                <CardReservation />
            </div>

            <Modal open={openDialog} onClose={() => setOpenDialog(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent >
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
        </section>
    )
}

export default Cart


