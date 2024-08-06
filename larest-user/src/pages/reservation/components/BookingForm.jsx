import useFetchData from "@/hooks/useFetch";
import { Box, Button, Chip, CircularProgress, Input, Option, Select, Textarea, Typography } from "@mui/joy";
import { useReducer } from "react";
import { useStateContext } from "../../../context/ContextProvider";
import { postReducer } from "../../../reducer/postReducer";
import { createReservation } from "../../../services/ReservationService";
import { ACTION } from "../../../utils/action";
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



export default function BookingForm({ onCancel, onSuccess, reservation }) {
  const { user } = useStateContext();
  const [loading, error, response] = useFetchData("/tables");
  const [state, dispatch] = useReducer(postReducer, {
    loading: false,
    errors: null,
    success: false
  })
  async function onSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTION.START });

    try {
      const formData = new FormData(e.target);
      const formJson = Object.fromEntries(formData.entries());
      const response = await createReservation({ ...formJson });
      dispatch({ type: ACTION.SUCCESS, payload: { data: response.data } });
      onSuccess();
    } catch (error) {
      dispatch({ type: ACTION.ERROR, payload: { errors: error.data } });
    }

  }

  return (
    <>
      {state.loading && <CircularProgress />}
      <form className="sm:w-[50rem] " onSubmit={(e) => onSubmit(e)}>
        <div className="sm:grid sm:grid-cols-2 gap-x-5">
          <div className="flex flex-col">
            <Typography variant="h6">Your name</Typography>
            <Input name="name" value={user?.name} readOnly={true} />
            <Typography variant="h6" className="mt-3">How many people will you order for?</Typography>

            <Select
              placeholder="Select options"
              name="persons"
              slotProps={{
                listbox: {
                  placement: 'bottom-start',
                  sx: { minWidth: 160 },
                },
              }}
              defaultValue={reservation?.persons}
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
            <Typography variant="h6" className="mt-3">Select an available table </Typography>
            <Select 
            name="table_id"
             placeholder="Select table"
              slotProps={{
                listbox: {
                  placement: 'bottom-start',
                  sx: { minWidth: 160 },
                },
              }}
              defaultValue={reservation?.table?.id}
              >
              {loading
                ? <CircularProgress />
                : <ListItemTable tables={response?.data} />
              }
            </Select>
            <div className="flex">
              <div className="w-full">
                <Typography variant="h6" className="mt-3">Date</Typography>
                <input defaultValue={reservation?.date} className="border border-gray-300 rounded-md px-3 py-2" type="date" name="date" id="date" />
              </div>
              <div className="w-full">
                <Typography variant="h6" className="mt-3">Time</Typography>
                <input defaultValue={reservation?.time} className="w-full border border-gray-300 rounded-md px-3 py-2" type="time" name="time" id="time" />
              </div>
            </div>
            <Typography variant="h6" className="mt-3">Leave us your notes</Typography>
            <Textarea defaultValue={reservation?.notes} minRows={3} placeholder="Notes" name="notes" />
          </div>
          <div >
            <Typography variant="h6" className="">Restaurant Plan</Typography>
            <ul className="flex gap-3 text-sm my-3">
              <li className="text-green-500">&#11200; <span className="text-black">Available</span></li>
              <li className="text-yellow-500">&#11200; <span className="text-black">Booked</span></li>
              <li className="text-deep-purple-600">&#11200; <span className="text-black">Used</span></li>
            </ul>
            <p className="mt-3 text-ellipsis text-sm font-serif font-medium bg-gray-100 p-2 rounded ">Below is the floor plan of our restaurant, please select the available table on the select menu on the left 😊.</p>
            <img className="mt-2 border" src="https://restaurant.eatapp.co/hs-fs/hubfs/image6%20(4)-1.webp?width=669&height=350&name=image6%20(4)-1.webp" alt="" />
          </div>
        </div>
        <footer className="mt-5 sm:mt-0 flex justify-end gap-5 item-center">
          <Button
            variant="outlined"
            color="red"
            onClick={onCancel}
          >CANCEL</Button>

          <Button
            className="bg-primary w-40"
            disabled={false}
            type="submit"
          >RESERVE</Button>
        </footer>
      </form>
    </>
  );
}

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