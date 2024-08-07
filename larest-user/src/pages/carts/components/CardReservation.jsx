import Text from "@/components/Elements/Text/Text";
import TextCurrency from "@/components/Elements/Text/TextCurrency";
import useFetchData from "@/hooks/useFetch";
import { Box, Button, Modal, ModalDialog, Typography } from "@mui/joy";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function CardReservation({ item, total }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [loading, error, response] = useFetchData('/reservations')

  return (
    <div className="w-full sticky bottom-[-1px] sm:w-[22rem] sm:static bg-white rounded-lg h-min px-5 py-3 sm:py-7">
      <Text className={"text-center font-bold"}>Detail Orders</Text>
      <div className="flex justify-between border-b sm:mt-5 py-1 sm:py-2">
        <Text>Items</Text>
        <Text className={"font-semibold"}>x{item}</Text>
      </div>
      <div className="flex items-center justify-between sm:mb-5 py-2">
        <Text>Total</Text>
        <TextCurrency
          color="text-black"
          fontWeight="font-bold"
          className={"text-base"}
          text={total}
        />
      </div>


      <Button onClick={() => {
        response?.data
          ? navigate('/order')
          : setOpen(true)
      }} className="bg-primary my-5 w-full"
      >CHECKOUT ({item})
      </Button>


      <Modal open={open} onClose={() => setOpen(false)}>
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
            Oops..
          </Typography>
          <Typography id="nested-modal-description" textColor="text.tertiary">
            You haven't completed the reservation, complete your reservation now!
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
            <Button variant="solid" color="primary" onClick={() => navigate('/reservation')}>
              Sure
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Later
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </div>
  )
}
