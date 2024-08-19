import EmptyState from "@/components/Elements/Indicator/EmptyState"
import FloatProgressIndicator from "@/components/Elements/Indicator/FloatProgressIndicator"
import CardCart from "@/components/Fragments/Card/CardCart"
import DeleteDialogModal from "@/components/Fragments/Modal/DeleteDialogModal"
import { actionDeleteCart, actionUpdateCart, resetAction, useCartContext } from "@/context/CartContextProvider"
import useDebounced from "@/hooks/useDebounce"
import { Snackbar } from "@mui/joy"
import { useState } from "react"
import CardReservation from "./components/CardReservation"

export default function Cart() {
  const [id, setId] = useState(null)
  const { state, dispatch } = useCartContext()
  const { list, action, loading } = state
  const [deleteDialog, setDeleteDialog] = useState(false)

  const setDebounceQuantity = useDebounced((quantity, id) => {
    actionUpdateCart(`/carts/${id}`, { quantity, id }, dispatch)
  }, 500)

  const handleDelete = async () => {
    const success = await actionDeleteCart(`/carts/${id}`, dispatch)
    if (success) setDeleteDialog(false)
  }

  return (
    <section id="cartSection" className="overflow-x-clip h-full bg-gray-100 flex-grow sm:py-5">
      <FloatProgressIndicator loading={loading} />
      <Snackbar
        color="success"
        variant="solid"
        open={action.success}
        autoHideDuration={2000}
        onClose={() => dispatch(resetAction())}
      >
        {action.message}
      </Snackbar>
      <div className="container h-full sm:pb-5 flex flex-col md:flex-row gap-10">
        <div className="flex-grow h-min">
          {/* (
            Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="w-full mb-2" >
                <div className="bg-white flex-grow rounded-lg h-40 p-5 flex ">
                  <div className="w-36 bg-zinc-200 animate-pulse" />
                  <div className="h-4 bg-zinc-200 flex-grow mx-5" />
                </div>
              </div>
            ))
          ) :  */}
          {list?.data?.length === 0 ? (
            <EmptyState text={"Your cart is empty"} />
          ) : list?.data?.items?.map((cart) => (
            <CardCart
              key={cart.id}
              cart={cart}
              onChangeQuantity={(e) => setDebounceQuantity(e, cart.id)}
              onDelete={() => {
                setDeleteDialog(true)
                setId(cart.id)
              }}
            />
          ))
          }
        </div>
        {(list?.data?.items?.length > 0) && <CardReservation item={list?.data?.total_quantity} total={232323} />}
      </div>
      <DeleteDialogModal
        dialog={deleteDialog}
        loading={action.loading}
        onClose={() => setDeleteDialog(false)}
        onCancel={() => setDeleteDialog(false)}
        onDelete={handleDelete}
      />
    </section>
  )
}
