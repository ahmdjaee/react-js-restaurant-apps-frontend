import { useCrudContext } from '@/context/CrudContextProvider';
import useFetchData from '@/hooks/useFetch';
import { Button, Chip, IconButton, Input, Option, Select, Skeleton, Textarea, Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import { MdOutlineClose } from 'react-icons/md';

function getChipColor(text) {
  switch (text) {
    case "available":
      return "success";
    case "booked":
      return "warning";
    default:
      return "danger";
  }
}

function UpdateReservationForm({ open, onClose }) {
  const [loading, error, response] = useFetchData('/tables');
  const { state } = useCrudContext();
  const { data } = state;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData?.entries());
    console.log(formJson);
    
    // const success = await actionPost(`/admin/orders/${data?.id}`, formJson, dispatch, "multipart/form-data")
    // if (success) onClose()
  }
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
          <Typography level="title-md">Update Reservation</Typography>
        </div>
        <form onSubmit={(e) => onSubmit(e)} className='mt-3 flex flex-col gap-2'>
          <Typography level='title-sm'>Your name</Typography>
          <Input name="name" value={data?.user?.name} readOnly={true} />
          <Typography level='title-sm' className="mt-3">How many people will you order for?</Typography>
          <Select
            placeholder="Select options"
            name="persons"
            defaultValue={data?.persons}
            key={data?.persons}
            slotProps={{
              listbox: {
                placement: 'bottom-start',
                sx: { minWidth: 160 },
              },
            }}
            endDecorator={
              <Chip
                color="primary"
                variant="outlined"
                sx={{
                  ml: 'auto',
                  fontSize: "12px",
                  paddingX: "10px"
                }}
              >
                Person
              </Chip>
            }>
            {Array.from({ length: 6 }, (_, i) => (
              <Option value={i + 1} key={i} label={`${i + 1}`} >
                {i + 1}
                <Chip
                  color={"primary"}
                  onClick={function () { }}
                  variant="outlined"
                  sx={{
                    ml: 'auto',
                    fontSize: "12px",
                    paddingX: "10px",
                  }}
                >
                  Person
                </Chip>
              </Option>
            ))}
          </Select>
          <Typography level='title-sm' className="mt-3">Select an available table </Typography>
          <Select
            name="table_id"
            placeholder="Select table"
            defaultValue={data?.table?.id}
            key={data?.table?.id}
            slotProps={{
              listbox: {
                placement: 'bottom-start',
                sx: { minWidth: 160 },
                disablePortal: true
              },
            }}
          >
            <Skeleton loading={loading}>
              <ListItemTable tables={response?.data} />
            </Skeleton>
          </Select>
          <div className="flex items-center gap-3">
            <div className="w-full">
              <Typography level='title-sm' className="mt-3">Date</Typography>
              <input
                defaultValue={data?.date}
                className="border w-full border-gray-300 rounded-md px-3 py-2"
                type="date"
                name="date"
                id="date"
              />
            </div>
            <div className="w-full">
              <Typography level='title-sm' className="mt-3">Time</Typography>
              <input
                defaultValue={data?.time}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="time"
                name="time"
                id="time"
              />
            </div>
          </div>
          <Typography level='title-sm' className="mt-3">Leave us your notes</Typography>
          <Textarea defaultValue={data?.notes} minRows={3} placeholder="Notes" name="notes" />
          <Typography level='title-sm' className="">Restaurant Plan</Typography>
          {/* <ul className="flex gap-3 text-sm ">
              <li className="text-green-500">&#11200; <span className="text-black">Available</span></li>
              <li className="text-yellow-500">&#11200; <span className="text-black">Booked</span></li>
              <li className="text-deep-purple-600">&#11200; <span className="text-black">Used</span></li>
            </ul> */}
          <p className="mt-3 text-ellipsis text-sm font-serif font-medium bg-gray-100 p-2 rounded ">Below is the floor plan of our restaurant, please select the available table on the select menu on the left 😊.</p>
          <img className="mt-2 border" src="https://restaurant.eatapp.co/hs-fs/hubfs/image6%20(4)-1.webp?width=669&height=350&name=image6%20(4)-1.webp" alt="" />
          <Button
            disabled={false}
            type="submit"
          >
            Update
          </Button>
        </form>

      </Box>
    </Drawer>
  )
}

export default UpdateReservationForm

function ListItemTable({ tables }) {
  return tables && tables.map(item => (
    <Option disabled={item.status !== "available"} sx={{ fontWeight: "700" }} value={item.id} key={item.id} label={item.no}>
      <Box component="span" sx={{ display: 'block' }}>
        <p className="font-semibold">{item.no}</p>
      </Box>
      <Chip
        color={getChipColor(item.status)}
        onClick={function () { }}
        variant="outlined"
        sx={{
          ml: 'auto',
          fontSize: "12px",
          paddingX: "10px",
        }}
      >
        {item.status}
      </Chip>
    </Option>)
  );
}