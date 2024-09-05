import FloatProgressIndicator from "@/components/Elements/Indicator/FloatProgressIndicator";
import {
  actionCreate,
  actionReset,
  useCrudContext,
} from "@/context/CrudContextProvider";
import useFetchData from "@/hooks/useFetch";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Input,
  Option,
  Select,
  Snackbar,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { useStateContext } from "../../../context/AuthContextProvider";
import { getMinDateTime } from "@/utils/helper";
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

export default function BookingForm({ onCancel, reservation }) {
  const { user } = useStateContext();
  const { state, dispatch } = useCrudContext();
  const [loading, error, response] = useFetchData("/tables");
  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());

    await actionCreate("/reservations", formJson, dispatch);
  }

  return (
    <>
      <FloatProgressIndicator loading={state.loading} />
      <form className="sm:w-[50rem] mx-auto sm:mt-14" onSubmit={(e) => onSubmit(e)}>
        <div className="sm:grid sm:grid-cols-2 gap-x-5">
          <div className="flex flex-col gap-2">
            <Typography level="title-md">Your name</Typography>
            <Input name="name" value={user?.name} readOnly={true} />
            <Typography level="title-md" className="mt-3">
              How many people will you order for?
            </Typography>
            <Select
              placeholder="Select options"
              name="persons"
              slotProps={{
                listbox: {
                  placement: "bottom-start",
                  sx: { minWidth: 160 },
                },
              }}
              defaultValue={reservation?.persons}
              endDecorator={
                <Chip
                  color="primary"
                  variant="outlined"
                  sx={{
                    ml: "auto",
                    fontSize: "12px",
                    paddingX: "10px",
                  }}
                >
                  Person
                </Chip>
              }
            >
              {Array.from({ length: 6 }, (_, i) => (
                <Option value={i + 1} key={i} label={`${i + 1}`}>
                  {i + 1}
                  <Chip
                    color={"primary"}
                    onClick={function () {}}
                    variant="outlined"
                    sx={{
                      ml: "auto",
                      fontSize: "12px",
                      paddingX: "10px",
                    }}
                  >
                    Person
                  </Chip>
                </Option>
              ))}
            </Select>
            <Typography level="title-md" className="mt-3">
              Select an available table{" "}
            </Typography>
            <Select
              name="table_id"
              placeholder="Select table"
              slotProps={{
                listbox: {
                  placement: "bottom-start",
                  sx: { minWidth: 160 },
                },
              }}
              defaultValue={reservation?.table?.id}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                <ListItemTable tables={response?.data} />
              )}
            </Select>
            <div className="flex gap-2">
              <div className="w-full">
                <Typography level="title-md" sx={{mb: 1}}>
                  Date
                </Typography>
                <Input
                  defaultValue={reservation?.date}
                  required
                  type="date"
                  name="date"
                  slotProps={{
                    input: {
                      min: reservation?.date
                        ? reservation.date
                        : getMinDateTime("date"),
                    },
                  }}
                />
              </div>
              <div className="w-full">
                <Typography level="title-md" sx={{mb: 1}}>
                  Time
                </Typography>
                <Input
                  defaultValue={reservation?.time}
                  required
                  type="time"
                  name="time"
                />
              </div>
            </div>
            <Typography level="title-md" className="mt-3">
              Leave us your notes
            </Typography>
            <Textarea
              defaultValue={reservation?.notes}
              minRows={3}
              maxRows={4}
              placeholder="Notes"
              name="notes"
            />
          </div>
          <div>
            <Typography level="title-md" className="">
              Restaurant Plan
            </Typography>
            <ul className="flex gap-3 text-sm my-3">
              <li className="text-green-500">
                &#11200; <span className="text-black">Available</span>
              </li>
              <li className="text-yellow-500">
                &#11200; <span className="text-black">Booked</span>
              </li>
              <li className="text-deep-purple-600">
                &#11200; <span className="text-black">Used</span>
              </li>
            </ul>
            <p className="mt-3 text-ellipsis text-sm font-serif font-medium bg-gray-100 p-2 rounded ">
              Below is the floor plan of our restaurant, please select the available
              table on the select menu on the left 😊.
            </p>
            <img
              className="mt-2 border"
              src="https://restaurant.eatapp.co/hs-fs/hubfs/image6%20(4)-1.webp?width=669&height=350&name=image6%20(4)-1.webp"
              alt=""
            />
          </div>
        </div>
        <footer className="mt-5 sm:mt-0 flex justify-end gap-5 item-center">
          <Button variant="plain" onClick={onCancel}>
            Cancel
          </Button>

          <Button className="bg-primary w-40" disabled={false} type="submit">
            Reserve
          </Button>
        </footer>
      </form>
      <Snackbar
        open={state.failed}
        color={"danger"}
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch(actionReset())}
      >
        {state.message}
      </Snackbar>
      <Snackbar
        autoHideDuration={5000}
        variant="outlined"
        color="neutral"
        size="lg"
        invertedColors
        open={state.success}
        onClose={() => {
          dispatch(actionReset());
          location.reload();
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={(theme) => ({
          maxWidth: 360,
        })}
      >
        <div>
          <Typography level="title-md">
            {state.message},
          </Typography>
          <Typography sx={{mb: 3 }}>Now you can continue your order</Typography>
          <Stack direction="row" alignItems="center" justifyContent={"space-between"} spacing={1}>
            <p className="text-sm">Automatically close in 5 seconds</p>
            <Button
              size="sm"
              onClick={() => {
                dispatch(actionReset());
                location.reload();
              }}
            >
              Close
            </Button>
          </Stack>
        </div>
      </Snackbar>
    </>
  );
}

function ListItemTable({ tables }) {
  return (
    tables &&
    tables.map((item) => (
      <Option
        disabled={item.status !== "available"}
        sx={{ fontWeight: "700" }}
        value={item.id}
        key={item.id}
        label={item.no}
      >
        <Box component="span" sx={{ display: "block" }}>
          <p className="font-semibold">{item.no}</p>
        </Box>
        <Chip
          color={getChipColor(item.status)}
          onClick={function () {}}
          variant="outlined"
          sx={{
            ml: "auto",
            fontSize: "12px",
            paddingX: "10px",
          }}
        >
          {item.status}
        </Chip>
      </Option>
    ))
  );
}
