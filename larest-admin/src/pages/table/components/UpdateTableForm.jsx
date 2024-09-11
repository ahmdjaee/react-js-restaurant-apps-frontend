import {
  Button,
  Chip,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalDialog,
  Option,
  Select,
} from "@mui/joy";
import { actionUpdate, useCrudContext } from "../../../context/CrudContextProvider";

function UpdateTableForm({ open, onClose }) {
  const { state, dispatch } = useCrudContext();
  const { data, action } = state;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    formJson.active = formJson.active === "true" ? 1 : 0;
    const success = await actionUpdate(
      `/admin/tables/${data.id}`,
      formJson,
      dispatch
    );
    if (success) onClose();
  };

  return (
    <>
      <Modal sx={{ filter: "blur(0)" }} open={open} onClose={onClose}>
        <ModalDialog sx={{ width: "500px  " }}>
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Update table
            <IconButton variant="plain" onClick={onClose}>
              ✕
            </IconButton>
          </DialogTitle>
          <DialogContent>Fill in the information of the table.</DialogContent>
          <form onSubmit={handleSubmit} className="w-full grid gap-2">
            <FormControl error={action?.error?.name}>
              <FormLabel>Number table</FormLabel>
              <Input
                defaultValue={data.no}
                required
                name="no"
                placeholder="Insert number table"
                autoFocus
              />
              <FormHelperText>{action?.error?.no}</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Capacity</FormLabel>
              <Input
                defaultValue={data.capacity}
                required
                type="number"
                name="capacity"
                placeholder="Insert capacity table"
                slotProps={{
                  input: {
                    min: 1,
                  },
                }}
                endDecorator={
                  <Chip variant="outlined" color="primary">
                    Person
                  </Chip>
                }
              />
              <FormHelperText>{action?.error?.capacity}</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                defaultValue={data.status}
                required
                name="status"
                placeholder="Select status"
              >
                <Option value="available">available</Option>
                <Option value="booked">booked</Option>
                <Option value="used">used</Option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Active</FormLabel>
              <Select
                defaultValue={data?.active}
                required
                name="active"
                placeholder="Active status"
              >
                <Option value={true}>Active</Option>
                <Option value={false}>Inactive</Option>
              </Select>
            </FormControl>
            <Button type="submit" sx={{ mt: 2, width: "100%" }}>
              Update
            </Button>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default UpdateTableForm;
