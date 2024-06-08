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
import useCarts from "../../hooks/carts/useCartItem"
import { deleteCartItem, updateCartItem } from "../../services/CartService"
import CardReservation from "./components/CardReservation"
import { useOutletContext } from "react-router-dom"

export default function Cart() {

    const [carts, loading, setCarts, setDependency] = useCarts();
    const [openDialog, setOpenDialog] = useState(false)
    const [success, setSuccess] = useState(false)
    const [id, setId] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [item, setItem] = useState({})
    const [loadingUpdate, setloadingUpdate] = useState(false)
    const { setOutletItem } = useOutletContext()

    useEffect(() => {
        setOutletItem(item)
        console.log(item);
        return () => setOutletItem(null)
    }, [item])

    useEffect(() => {
        const timer = setTimeout(() => {
            async function handleUpdate() {
                setloadingUpdate(true);
                try {
                    const response = await updateCartItem(id, quantity)
                    if (response) {
                        setDependency(response)
                        setloadingUpdate(false);
                    }
                } catch (error) {
                    console.log(error.data);
                    setloadingUpdate(false)
                }
            }
            id && handleUpdate()
        }, 250);

        return () => clearTimeout(timer)
    }, [quantity, id])

    useEffect(() => {
        setItem({
            qty: carts?.reduce((prev, cart) => prev + cart.quantity, 0),
            totalPrice: carts?.reduce((prev, cart) => prev + cart.total_price, 0)
        })
        console.log(item.qty);
    }, [carts])

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

    return (
        <section className="bg-zinc-100 flex-grow py-5">
            {success && <CustomSnackbar text="Successfully delete item" />}
            <div className="container h-full pb-5 flex flex-col md:flex-row gap-10">
                <div className="flex-grow h-min">
                    {carts === null
                        ? Array.from({ length: 4 }, (_, i) => (
                            <div key={i} className="w-full mb-2" >
                                <div className="bg-white flex-grow rounded-lg h-40 p-5 flex ">
                                    <div className="w-36 bg-zinc-200 animate-pulse" />
                                    <div className="h-4 bg-zinc-200 flex-grow mx-5" />
                                </div>
                            </div>
                        ))
                        : carts.map((cart) => (
                            <CardCart
                                key={cart.id}
                                cart={cart}
                                loading={loading}
                                onChangeQuantity={(e) => {
                                    setQuantity(e)
                                    setId(cart.id)
                                }}
                                onDelete={() => {
                                    setOpenDialog(true)
                                    setId(cart.id)
                                }}
                            />
                        ))}
                </div>
                <CardReservation item={item.qty && item.qty} total={item.totalPrice} />
            </div>
            <DeleteDialog openDialog={openDialog} setOpenDialog={setOpenDialog} onDelete={onDelete} />
        </section>
    )
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
