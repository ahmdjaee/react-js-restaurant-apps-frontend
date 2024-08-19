import FloatProgressIndicator from "@/components/Elements/Indicator/FloatProgressIndicator";
import TextBetween from "@/components/Elements/Text/TextBetween";
import TextCurrency from "@/components/Elements/Text/TextCurrency";
import { actionCreate, useCrudContext } from "@/context/CrudContextProvider";
import useFetchData from "@/hooks/useFetch";
import { Box, Button, Modal, ModalDialog, Textarea, Typography } from "@mui/joy";
import { useEffect, useState } from "react";

export default function Order() {
  const [showModal, setShowModal] = useState(false);
  const { state, dispatch } = useCrudContext();
  const [loadingCarts, errorCarts, carts] = useFetchData("/carts");
  const [loadingReservation, errorReservation, reservation] = useFetchData("/reservations");

  useEffect(() => {
    // You can also change below url value to any script url you wish to load, 
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl = import.meta.env.VITE_MIDTRANS_SCRIPT_URL;

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;

    // Optional: set script attribute, for example snap.js have data-client-key attribute 
    // (change the value according to your client-key)
    const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    }
  }, []);

  async function handleOrder() {

    const items = carts?.data?.items.map((cart) => {
      return cart;
    })

    console.log(items);
    

    const { data } = await actionCreate("/orders", {
      items: items,
      reservation_id: reservation.data.id,
      total_payment: 20000
    }, dispatch)

    if (data) {
      window.snap.pay(data.token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          alert("waiting your payment!"); console.log(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */
          alert("payment failed!"); console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert('you closed the popup without finishing the payment');
        }
      });
    }
  }

  return (
    <>
      <FloatProgressIndicator loading={state.loading} />
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 mb-8">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items. And select a suitable payment method.</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 ">
            {loadingCarts
              ? Array.from({ length: 2 }, (_, i) => (
                <div key={i} className="flex rounded-lg bg-white sm:flex-row" >
                  <div className="m-2 h-24 w-28 rounded-md border object-cover object-center bg-gray-200 animate-pulse" alt="" />
                  <div className="flex gap-2 flex-grow flex-col px-4 py-4">
                    <span className="h-4 w-40 rounded-md bg-gray-200 animate-pulse" />
                    <span className="h-4 w-40 rounded-md bg-gray-200 animate-pulse" />
                  </div>
                </div>
              ))
              : carts?.data?.items.map(cart => (
                <div key={cart.id} className="flex  rounded-lg bg-white sm:flex-row">
                  <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={cart.menu.image} alt="" />
                  <div className="flex flex-grow flex-col px-4 py-4">
                    <span className="font-semibold">{cart.menu.name}</span>
                    <span className="float-right text-gray-400">x{cart.quantity}</span>

                    <TextCurrency color="text-black" className={"text-lg font-bold"} text={cart.menu.price} />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Reservation Details</p>
          <p className="text-gray-400">Double check that your reservation is correct</p>
          <div className="">
            <div className="mt-6 border-t border-b px-5 py-2">
              {loadingReservation
                ? Array.from({ length: 6 }, (_, i) => (
                  <TextBetween
                    key={i}
                    leftStyle={"h-4 bg-gray-200 w-24 rounded-md  animate-pulse"}
                    rightStyle={"h-4 bg-gray-200 w-40 rounded-md animate-pulse"}
                  />
                ))
                : <>
                  <TextBetween leftText="Name" rightText={reservation.data.user.name} />
                  <TextBetween leftText="Table Number" rightText={reservation.data.table.no} />
                  <TextBetween leftText="Ordered For" rightText={reservation.data.persons + " Person"} />
                  <TextBetween leftText="Date" rightText={reservation.data.date} />
                  <TextBetween leftText="Time" rightText={reservation.data.time} />
                  <TextBetween leftText="Note" />
                  <Textarea value={reservation?.data?.notes} minRows={3} maxRows={3} readOnly sx={{ boxShadow: "none" }} />
                </>
              }
            </div>
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total Item</p>
                {/* <p className="font-semibold text-gray-900">x{totalItem}</p> */}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total payment</p>
              {/* <TextCurrency className="text-2xl" fontWeight="font-semibold" color="text-gray-900" text={totalPayment} /> */}
            </div>
          </div>
          <Button color="dark" onClick={handleOrder} size="lg" sx={{ my: 2, }} fullWidth>Place Older</Button>
        </div>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only('xs')]: {
              top: 'unset',
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: 'none',
              maxWidth: 'unset',
            },
          })}
        >
          <Typography id="nested-modal-title" level="h2">
            Are you absolutely sure?
          </Typography>
          <Typography id="nested-modal-description" textColor="text.tertiary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, animi.
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
            <Button variant="solid" color="success" onClick={() => window.location.href = "/payment"}>
              Continue
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  )
}

