import OptionWithState from "@/components/Elements/Input/Option";
import { ListItemTable } from "@/components/Elements/List/ListItem";
import { actionCreate, useCrudContext } from "@/context/CrudContextProvider";
import useFetchData from "@/hooks/useFetch";
import { getMinDateTime } from "@/utils/helper";
import {
  Button,
  Chip,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@mui/joy";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import PropTypes from "prop-types";
import { MdOutlineClose } from "react-icons/md";

function CreateReservationForm({ open, onClose }) {
  const [userLoading, userError, userResponse] = useFetchData("/admin/users");
  const [loading, error, response] = useFetchData("/tables");
  const { dispatch } = useCrudContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData?.entries());

    const success = await actionCreate(
      `/admin/reservations`,
      formJson,
      dispatch
    );
    if (success) onClose();
  };

  const handleOnClose = () => {
    onClose();
  };
  return (
    <Drawer
      open={open}
      onClose={handleOnClose}
      anchor="right"
      sx={{ filter: "blur(0)" }}
    >
      <Box role="presentation" sx={{ padding: "1rem" }}>
        <div className="flex items-center gap-2">
          <IconButton onClick={onClose}>
            <MdOutlineClose className="size-5" />
          </IconButton>
          <Typography level="title-md">Create Reservation</Typography>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="mt-3 flex flex-col gap-2">
          <FormControl>
            <FormLabel required>Customer</FormLabel>
            <Select required name="user_id" placeholder="Select customer">
              <OptionWithState
                loading={userLoading}
                error={userError}
                data={userResponse?.data}
              />
            </Select>
          </FormControl>
          <FormControl required>
            <FormLabel>How many people will you order for?</FormLabel>
            <Select
              placeholder="Select options"
              name="persons"
              slotProps={{
                listbox: {
                  placement: "bottom-start",
                  sx: { minWidth: 160 },
                },
              }}
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
          </FormControl>
          <FormControl required>
            <FormLabel>Select an available table </FormLabel>
            <Select
              name="table_id"
              placeholder="Select table"
              slotProps={{
                listbox: {
                  placement: "bottom-start",
                  sx: { minWidth: 160 },
                },
              }}
            >
              <OptionWithState
                loading={loading}
                error={error}
                data={response?.data}
                renderOption={(item) => <ListItemTable item={item} />}
              />
            </Select>
          </FormControl>
          <FormControl required>
            <FormLabel>Status</FormLabel>
            <Select required name="status" placeholder="Select status">
              <Option value="pending">pending</Option>
              <Option value="confirmed">confirmed</Option>
              <Option value="cancelled">cancelled</Option>
              <Option value="completed">completed</Option>
            </Select>
          </FormControl>
          <div className="flex items-center gap-3">
            <div className="w-full">
              <FormControl required>
                <FormLabel>Date</FormLabel>
                <Input
                  required
                  type="date"
                  name="date"
                  slotProps={{
                    input: {
                      min: getMinDateTime(),
                    },
                  }}
                />
              </FormControl>
            </div>
            <div className="w-full">
              <FormControl required>
                <FormLabel>Time</FormLabel>
                <Input
                  required
                  type="time"
                  name="time"
                  slotProps={{
                    input: {
                      min: getMinDateTime(),
                    },
                  }}
                />
              </FormControl>
            </div>
          </div>
          <FormControl required>
            <FormLabel>Leave us your notes</FormLabel>
            <Textarea minRows={3} placeholder="Notes" name="notes" />
          </FormControl>
          <Typography level="title-sm">Restaurant Plan</Typography>
          <p className="mt-3 text-ellipsis text-sm font-serif font-medium bg-gray-100 p-2 rounded ">
            Below is the floor plan of our restaurant, please select the available
            table on the select menu on the left 😊.
          </p>
          <img
            className="mt-2 border"
            src="https://restaurant.eatapp.co/hs-fs/hubfs/image6%20(4)-1.webp?width=669&height=350&name=image6%20(4)-1.webp"
            alt=""
          />
          <Button disabled={false} type="submit">
            Create
          </Button>
        </form>
      </Box>
    </Drawer>
  );
}

CreateReservationForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateReservationForm;
