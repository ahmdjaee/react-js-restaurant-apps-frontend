import { Button, IconButton, Typography } from "@mui/joy";

export default function BookingDetail({ reservation, onEdit }) {

  return (
    <div className="flex flex-col  mx-2">
      <div className="mb-2 flex justify-between items-center">
        <Typography level="h4" >Reservation Detail</Typography>
      </div>
      <div className="shadow-md p-5">
        <Typography textColor={"neutral.400"} sx={{ letterSpacing: "1px" }} level="title-sm" >NAME</Typography>
        <Typography fontWeight={"bold"} level="body-md">{reservation.user.name}</Typography>
      </div>
      <div className="shadow-md p-5">
        <Typography textColor={"neutral.400"} sx={{ letterSpacing: "1px" }} level="title-sm" >ORDERED FOR</Typography>
        <Typography fontWeight={"bold"} level="body-md">{reservation.persons} Person</Typography>
      </div>
      <div className="shadow-md p-5">
        <Typography textColor={"neutral.400"} sx={{ letterSpacing: "1px" }} level="title-sm" >NUMBER TABLE</Typography>
        <Typography fontWeight={"bold"} level="body-md">{reservation.table.no}</Typography>
      </div>
      <div className="shadow-md p-5">
        <Typography textColor={"neutral.400"} sx={{ letterSpacing: "1px" }} level="title-sm" >DATE</Typography>
        <Typography fontWeight={"bold"} level="body-md">{reservation.date}</Typography>
      </div>
      <div className="shadow-md p-5">
        <Typography textColor={"neutral.400"} sx={{ letterSpacing: "1px" }} level="title-sm" >TIME</Typography>
        <Typography fontWeight={"bold"} level="body-md">{reservation.time}</Typography>
      </div>
      <div className="shadow-md p-5">
        <Typography textColor={"neutral.400"} sx={{ letterSpacing: "1px" }} level="title-sm" >NOTES</Typography>
        <Typography fontWeight={"bold"} level="body-md">{reservation.notes}</Typography>
      </div>
      <footer className="flex justify-end gap-5 item-center mt-8">
        <Button
          color="primary"
          onClick={onEdit}
        >Edit Reservation</Button>
      </footer>
    </div>
  )
}