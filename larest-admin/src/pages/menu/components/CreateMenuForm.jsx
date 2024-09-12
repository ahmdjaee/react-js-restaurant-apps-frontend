import {
  Box,
  Button,
  Chip,
  CircularProgress,
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
  Textarea,
} from "@mui/joy";
import ImageUploader from "../../../components/Elements/Image/ImageUploader";
import { actionCreate, useCrudContext } from "../../../context/CrudContextProvider";
import useFetchData from "../../../hooks/useFetch";

function CreateMenuForm({ open, onClose, tags }) {
  const { dispatch } = useCrudContext();
  const [loading, _, response] = useFetchData("/categories");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    formJson.tags = JSON.parse(formJson.tags || "[]");
    formJson.active = formJson.active === "true" ? 1 : 0;

    await actionCreate("/admin/menus", formJson, dispatch, "multipart/form-data");
  };

  return (
    <Modal sx={{ filter: "blur(0)" }} open={open} onClose={onClose}>
      <ModalDialog sx={{ width: "750px" }}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Create new menu
          <IconButton variant="plain" onClick={onClose}>
            ✕
          </IconButton>
        </DialogTitle>
        <DialogContent>Fill in the information of the menu.</DialogContent>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input name="name" placeholder="Menu name" autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Type in here…"
                  minRows={4}
                  maxRows={4}
                  name="description"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  name="price"
                  placeholder="00"
                  type="number"
                  min={0}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Stock</FormLabel>
                <Input
                  name="stock"
                  placeholder="00"
                  type="number"
                  min={0}
                  required
                />
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
            </div>

            <div className="flex flex-col gap-2 justify-between">
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select name="category_id" placeholder="Select a category" required>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    response?.data.map((category) => (
                      <Option key={category.id} value={category.id}>
                        {category.name}
                      </Option>
                    ))
                  )}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Tags</FormLabel>
                <Select
                  multiple
                  name="tags"
                  placeholder="None"
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", gap: "0.25rem" }}>
                      {selected.map((selectedOption) => (
                        <Chip key={selectedOption.value} variant="soft" color="primary">
                          {selectedOption.label}
                        </Chip>
                      ))}
                    </Box>
                  )}
                >
                  {tags.map((tag) => (
                    <Option key={tag} value={tag}>
                      {tag}
                    </Option>
                  ))}
                </Select>
              </FormControl>
              <ImageUploader props={{ required: true }} />
            </div>
          </div>
          <Button type="submit" sx={{ mt: 2, width: "100%" }}>
            Create
          </Button>
        </form>
      </ModalDialog>
    </Modal>
  );
}

export default CreateMenuForm;
