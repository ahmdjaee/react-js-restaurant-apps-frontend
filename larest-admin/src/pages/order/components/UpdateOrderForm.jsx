import { useCrudContext } from "@/context/CrudContextProvider";
import { FormControl, FormLabel, Input, Typography } from "@mui/joy";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";

function UpdateOrderForm({ open, onClose }) {
  const { state } = useCrudContext();
  const { data, action } = state;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData?.entries());
    // const success = await actionPost(`/admin/orders/${data?.id}`, formJson, dispatch, "multipart/form-data")
    // if (success) onClose()
  };
  return (
    <Drawer open={open} onClose={onClose} anchor="right" sx={{ filter: "blur(0)" }}>
      <Box
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
        sx={{ padding: "1rem" }}
      >
        <Typography level="title-md">Update Order</Typography>
        <form action="" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              defaultValue={data?.title}
              required
              name="title"
              placeholder="Event title"
              autoFocus
            />
          </FormControl>
        </form>
      </Box>
    </Drawer>
  );
}

export default UpdateOrderForm;
