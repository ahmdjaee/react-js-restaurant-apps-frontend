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
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        setOutletItem(item)
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
        <section id="cartSection" className="overflow-x-clip bg-zinc-100 flex-grow py-5">
            {success && <CustomSnackbar text="Successfully delete item" />}
            <div className="container h-full pb-5 flex flex-col md:flex-row gap-10">
                <div className="flex-grow h-min">
                    <CartSection carts={carts} setQuantity={setQuantity} setId={setId} setOpenDialog={setOpenDialog} />
                </div>
                <CardReservation item={item.qty && item.qty} total={item.totalPrice} />
            </div>
            <DeleteDialog openDialog={openDialog} setOpenDialog={setOpenDialog} onDelete={onDelete} />
        </section>
    )
}

function CartSection({ carts, setQuantity, setId, setOpenDialog }) {
    if (Array.isArray(carts) && carts.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center pt-10">
                <svg className="size-52" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="475px" height="512px" version="1.1" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd"
                    viewBox="0 0 475 512.24"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
                    <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer" />
                        <path fill="#C28F60" d="M0 417.58l202.44 26.17c-5.92,-16.29 -9.15,-33.86 -9.15,-52.19 0,-42.23 17.12,-80.46 44.79,-108.13 27.67,-27.66 65.9,-44.78 108.12,-44.78 42.22,0 80.46,17.12 108.13,44.78 5.83,5.84 11.19,12.15 16.02,18.85l1.39 -261.39 -299.87 -40.89 -171.87 77.98 0 339.6z" />
                        <polygon fill="#AA7950" points="471.74,40.89 459.77,48.69 338.97,124.05 0,77.98 171.87,0 " />
                        <path fill="#D2A06D" d="M340.21 238.76l0 -112.76 131.53 -85.11 3.26 268.21c-5.96,-9.29 -12.9,-17.9 -20.67,-25.67 -27.67,-27.66 -65.91,-44.78 -108.13,-44.78 -2,0 -4,0.04 -5.99,0.11z" />
                        <polygon fill="#65472F" points="232.12,8.21 330.35,21.61 189.75,105.62 189.66,251.05 139.63,216.97 89.59,245.25 95.84,92.57 " />
                        <path fill="#EF4136" d="M346.2 270.87c66.66,0 120.69,54.03 120.69,120.69 0,66.65 -54.03,120.68 -120.69,120.68 -66.65,0 -120.68,-54.03 -120.68,-120.68 0,-66.66 54.03,-120.69 120.68,-120.69l0 0z" />
                        <path fill="#D13327" d="M293.97 369.34c-1.71,-1.67 -3.29,-3.12 -4.29,-4.56l0.17 0.16 24.42 24.42 -0.15 0.14 -20.15 -20.16zm107.8 -16.56l1.88 1.92c5.84,5.77 5.54,9.15 0.04,14.53l-24.39 24.38 -4.26 -4.25 24.53 -24.54c4.66,-4.55 5.59,-7.68 2.2,-12.04zm0.3 63.89l1.62 1.62c5.5,5.37 5.8,8.75 -0.04,14.53l-17.78 18.21c-5.47,5.64 -8.26,2.02 -12.7,-2.49l-24.4 -24.4 -24.55 24.55c-5.37,5.51 -8.76,5.81 -14.53,-0.03l-18.21 -17.78c-0.83,-0.81 -1.45,-1.55 -1.91,-2.25l16 15.62c5.78,5.84 9.16,5.54 14.54,0.04l24.54 -24.55 24.4 24.4c4.44,4.51 7.23,8.12 12.7,2.48l17.78 -18.21c4.77,-4.71 5.45,-7.83 2.54,-11.74z" />
                        <path fill="white" d="M289.85 364.94c-4.51,-4.44 -8.13,-7.23 -2.49,-12.71l18.21 -17.77c5.78,-5.84 9.16,-5.55 14.53,-0.04l24.55 24.55 24.4 -24.4c4.44,-4.51 7.23,-8.13 12.7,-2.49l17.78 18.21c5.84,5.78 5.54,9.16 0.04,14.54l-24.53 24.52 24.53 24.53c5.5,5.38 5.8,8.76 -0.04,14.53l-17.78 18.21c-5.47,5.64 -8.26,2.03 -12.7,-2.48l-24.4 -24.4 -24.55 24.55c-5.37,5.5 -8.75,5.8 -14.53,-0.04l-18.21 -17.78c-5.64,-5.47 -2.02,-8.26 2.49,-12.7l24.42 -24.42 -24.42 -24.41z" />
                    </g>
                </svg>
                <p className="text-3xl font-medium">Your cart is empty</p>

            </div>
        )
    }
    switch (carts) {
        case null:
            return Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="w-full mb-2" >
                    <div className="bg-white flex-grow rounded-lg h-40 p-5 flex ">
                        <div className="w-36 bg-zinc-200 animate-pulse" />
                        <div className="h-4 bg-zinc-200 flex-grow mx-5" />
                    </div>
                </div>
            ))
        default:
            return carts.map((cart) => (
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
