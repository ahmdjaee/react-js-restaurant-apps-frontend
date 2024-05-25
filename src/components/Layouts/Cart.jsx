import { useState, useEffect } from "react"
import Spacer from "../Elements/Spacer/Spacer"
import CardCart from "../Fragments/Card/CardCart"
import CardReservation from "../Fragments/Card/CardReservation"
import { getCartItem } from "../../services/CartService"
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Modal,
    ModalDialog
} from "@mui/joy"

function Cart() {

    const [carts, setCarts] = useState([])
    const [loading, setLoading] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)

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
        <section className="bg-gray-200 flex-grow py-5">
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
                                    onDelete={() => setOpenDialog(true)}
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
                        <Button variant="solid" color="danger" onClick={() => { }}>
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


