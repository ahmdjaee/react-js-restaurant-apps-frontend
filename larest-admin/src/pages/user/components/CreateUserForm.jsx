import InputForm from "@/components/Elements/Input/InputForm";
import {
  Button,
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
  Select
} from "@mui/joy";
import {
  actionCreate,
  useCrudContext
} from "../../../context/CrudContextProvider";

function CreateUserForm({ open, onClose }) {
  const { state, dispatch } = useCrudContext();
  const { data, action } = state;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    formJson.is_admin = formJson.is_admin === "true" ? 1 : 0;    
    await actionCreate(`/admin/users/create`,formJson, dispatch);
  };

  return (
    <Modal sx={{ filter: "blur(0)" }} open={open} onClose={onClose}>
      <ModalDialog sx={{ width: "500px  " }}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Create user
          <IconButton variant="plain" onClick={onClose}>
            ✕
          </IconButton>
        </DialogTitle>
        <DialogContent>Fill in the information of the user.</DialogContent>
        <form onSubmit={handleSubmit} className="w-full grid gap-2">
          <FormControl error={action?.error?.name}>
            <FormLabel>Name</FormLabel>
            <Input required name="name" placeholder="username" autoFocus />
            <FormHelperText>{action?.error?.name}</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              required
              type="email"
              name="email"
              placeholder="example@gmail.com"
            />
            <FormHelperText>{action?.error?.email}</FormHelperText>
          </FormControl>
          <InputForm
            title="Password"
            type="password"
            name="password"
            placeholder="password"
            errorsText={action?.error?.password}
            required
          />
          <FormControl>
            <FormLabel>Role</FormLabel>
            <Select required name="is_admin" placeholder="Select role">
              <Option value={false}>user</Option>
              <Option value={true}>admin</Option>
            </Select>
          </FormControl>
          <Button type="submit" sx={{ mt: 2, width: "100%" }}>
            Create
          </Button>
        </form>
      </ModalDialog>
    </Modal>
  );
}

export default CreateUserForm;
