import CardCart from "@/components/Fragments/Card/CardCart"
import DeleteDialogModal from "@/components/Fragments/Modal/DeleteDialogModal"
import { useCartContext } from "@/context/CartContext"
import { Snackbar } from "@mui/joy"
import { useEffect, useState } from "react"
import useDebounced from "@/hooks/useDebounce"
import axiosClient from "@/services/axios"
import CardReservation from "./components/CardReservation"
import EmptyState from "@/components/Elements/Indicator/EmptyState"

export default function Cart() {

  const [id, setId] = useState(null)
  const { state, dispatch, openDialog, setOpenDialog, item, setItem } = useCartContext()

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axiosClient.get("/carts");
        dispatch({ type: "SET_CART", payload: response.data.data })
      } catch (error) {
        dispatch({ type: "ERROR", payload: error })
      }
    };

    fetchCarts();
    return () => dispatch({ type: "RESET" })
  }, []);

  async function handleUpdate(quantity, id) {
    dispatch({ type: "SUBMIT" })
    try {
      const response = await axiosClient.patch(`/carts/${id}`, { quantity })
      if (response.status === 200) {
        dispatch({ type: "UPDATE", payload: response?.data?.data, message: response?.data?.message })
      }
    } catch (error) {
      dispatch({ type: "ERROR", payload: error })
    }
  }

  const setDebounceQuantity = useDebounced((quantity, id) => {
    handleUpdate(quantity, id)
  }, 250)

  useEffect(() => {
    setItem({
      qty: state.carts?.reduce((prev, cart) => prev + cart.quantity, 0),
      totalPrice: state.carts?.reduce((prev, cart) => prev + cart.total_price, 0)
    })
  }, [state.carts])

  async function onDelete() {
    try {
      const response = await axiosClient.delete(`/carts/${id}`)
      if (response.status === 200) {
        dispatch({ type: "DELETE", payload: id, message: response?.data?.message })
      }
    } catch (error) {
      dispatch({ type: "ERROR", payload: error })
    }
  }

  useEffect(() => {
    state.success && setOpenDialog(false)
  }, [state])

  return (
    <section id="cartSection" className="overflow-x-clip bg-zinc-100 flex-grow sm:py-5">
      <Snackbar
        color="success"
        variant="solid"
        open={state.success}
        autoHideDuration={2000}
        onClose={() => dispatch({ type: "RESET" })}
      >
        {state.message}
      </Snackbar>
      <div className="container h-full sm:pb-5 flex flex-col md:flex-row gap-10">
        <div className="flex-grow h-min">
          {state.loading ? (
            Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="w-full mb-2" >
                <div className="bg-white flex-grow rounded-lg h-40 p-5 flex ">
                  <div className="w-36 bg-zinc-200 animate-pulse" />
                  <div className="h-4 bg-zinc-200 flex-grow mx-5" />
                </div>
              </div>
            ))
          ) : state?.carts?.length === 0 ? (
            <EmptyState />
          )
            : state?.carts?.map((cart) => (
              <CardCart
                key={cart.id}
                cart={cart}
                onChangeQuantity={(e) => setDebounceQuantity(e, cart.id)}
                onDelete={() => {
                  setOpenDialog(true)
                  setId(cart.id)
                }}
              />
            ))
          }
        </div>
        {(state?.carts?.length > 0) && <CardReservation item={item.qty && item.qty} total={item.totalPrice} />}
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
