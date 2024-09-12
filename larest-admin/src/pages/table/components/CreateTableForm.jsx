import {
  Button,
  Chip,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalDialog,
  Option,
  Select,
} from "@mui/joy";
import { actionCreate, useCrudContext } from "../../../context/CrudContextProvider";

function CreateTableForm({ open, onClose }) {
  const { dispatch } = useCrudContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    formJson.active = formJson.active === "true" ? 1 : 0;

    await actionCreate("/admin/tables", formJson, dispatch);
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
            Create new table
            <IconButton variant="plain" onClick={onClose}>
              ✕
            </IconButton>
          </DialogTitle>
          <DialogContent>Fill in the information of the table.</DialogContent>
          <form onSubmit={handleSubmit} className="w-full grid gap-2">
            <FormControl>
              <FormLabel>Number table</FormLabel>
              <Input
                required
                name="no"
                placeholder="Insert number table"
                autoFocus
              />
            </FormControl>
            <FormControl>
              <FormLabel>Capacity</FormLabel>
              <Input
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
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select required name="status" placeholder="Select status">
                <Option value="available">available</Option>
                <Option value="booked">booked</Option>
                <Option value="used">used</Option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Active</FormLabel>
              <Select
                required
                name="active"
                defaultValue={true}
                placeholder="Active status"
              >
                <Option value={true}>Active</Option>
                <Option value={false}>Inactive</Option>
              </Select>
            </FormControl>
            <Button type="submit" sx={{ mt: 2, width: "100%" }}>
              Create
            </Button>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default CreateTableForm;
