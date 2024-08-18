import { useCrudContext } from '@/context/CrudContextProvider';
import useFetchData from '@/hooks/useFetch';
import { Button, Chip, IconButton, Input, Option, Select, Skeleton, Textarea, Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import { MdOutlineClose } from 'react-icons/md';

function DetailReservation({ open, onClose }) {

  const { state } = useCrudContext();
  const { data } = state;
  return (
    <Drawer open={open} onClose={onClose} anchor='right' sx={{ filter: 'blur(0)' }}>
      <Box
        role="presentation"
        sx={{ padding: '1rem' }}
      >
        <div className='flex items-center gap-2'>
          <IconButton onClick={onClose}>
            <MdOutlineClose className='size-5' />
          </IconButton>
          <Typography level="title-md">Detail Reservation</Typography>
        </div>
        <div className="flex flex-col mx-2 mt-3">
          <div className="shadow-md p-5">
            <Typography textColor={"neutral.400"} sx={{ letterSpacing: "1px" }} level="title-sm" >NAME</Typography>
            <Typography fontWeight={"bold"} level="body-md">{data.user?.name}</Typography>
          </div>
          <div className="shadow-md p-5">
            <Typography textColor={"neutral.400"} sx={{ letterSpacing: "1px" }} level="title-sm" >ORDERED FOR</Typography>
            <Typography fontWeight={"bold"} level="body-md">{data.persons} Person</Typography>
          </div>
          <div className="shadow-md p-5">
            <Typography textColor={"neutral.400"} sx={{ letterSpacing: "1px" }} level="title-sm" >NUMBER TABLE</Typography>
            <Typography fontWeight={"bold"} level="body-md">{data.table?.no}</Typography>
          </div>
          <div className="shadow-md p-5">
            <Typography textColor={"neutral.400"} sx={{ letterSpacing: "1px" }} level="title-sm" >DATE</Typography>
            <Typography fontWeight={"bold"} level="body-md">{data.date}</Typography>
          </div>
          <div className="shadow-md p-5">
            <Typography textColor={"neutral.400"} sx={{ letterSpacing: "1px" }} level="title-sm" >TIME</Typography>
            <Typography fontWeight={"bold"} level="body-md">{data.time}</Typography>
          </div>
          <div className="shadow-md p-5">
            <Typography textColor={"neutral.400"} sx={{ letterSpacing: "1px" }} level="title-sm" >NOTES</Typography>
            <Typography fontWeight={"bold"} level="body-md">{data.notes}</Typography>
          </div>
        </div>
      </Box>
    </Drawer>
  )
}

export default DetailReservation