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
import { actionPost, useCrudContext } from "../../../context/CrudContextProvider";

function UpdateUserForm({ open, onClose }) {
  const { state, dispatch } = useCrudContext();
  const { data, action } = state;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    formJson.is_admin = formJson.is_admin === "true" ? 1 : 0;
    const success = await actionPost(
      `/admin/users/${data.id}/update`,
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
            Update user
            <IconButton variant="plain" onClick={onClose}>
              ✕
            </IconButton>
          </DialogTitle>
          <DialogContent>Fill in the information of the user.</DialogContent>
          <form onSubmit={handleSubmit} className="w-full grid gap-2">
            <FormControl error={action?.error?.name}>
              <FormLabel>Number table</FormLabel>
              <Input
                defaultValue={data.name}
                required
                name="name"
                placeholder="username"
                autoFocus
              />
              <FormHelperText>{action?.error?.name}</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Capacity</FormLabel>
              <Input
                defaultValue={data.email}
                required
                type="email"
                name="email"
                placeholder="example@gmail.com"
                endDecorator={
                  <Chip variant="outlined" color="primary">
                    Person
                  </Chip>
                }
              />
              <FormHelperText>{action?.error?.email}</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Select
                defaultValue={data.is_admin ?? false}
                required
                name="is_admin"
                placeholder="Select role"
              >
                <Option value={false}>User</Option>
                <Option value={true}>Admin</Option>
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

export default UpdateUserForm;
