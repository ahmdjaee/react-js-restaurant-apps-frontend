import { Button, DialogContent, DialogTitle, FormControl, FormHelperText, FormLabel, IconButton, Input, Modal, ModalDialog } from '@mui/joy';
import ImageUploader from '../../../components/Elements/Image/ImageUploader';
import { actionPost, useCrudContext } from '../../../context/CrudContextProvider';
function UpdateCategoryForm({ open, onClose }) {
  const { state, dispatch } = useCrudContext();
  const { data, action } = state;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const success = await actionPost(`/admin/categories/${data.id}`, formJson, dispatch, "multipart/form-data")
    if (success) onClose()
  }

  console.log(state);
  
  return (
    <>
      <Modal sx={{ filter: 'blur(0)' }} open={open} onClose={onClose}>
        <ModalDialog sx={{ width: '500px  ' }}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Update category
            <IconButton
              variant="plain"
              onClick={onClose}
            >
              ✕
            </IconButton>
          </DialogTitle>
          <DialogContent>Fill in the information of the table.</DialogContent>
          <form
            onSubmit={handleSubmit}
            className="w-full grid gap-2"
          >
            <FormControl error={action?.error?.name}>
              <FormLabel>Category Name</FormLabel>
              <Input
                type="text"
                defaultValue={data.name}
                required
                name='name'
                placeholder="Insert category name"
                autoFocus
              />
              {action?.error?.name && <FormHelperText >{action?.error?.name}</FormHelperText>}
            </FormControl>
            <ImageUploader src={data.image} name={"image"} />
            <Button type='submit' sx={{ mt: 2, width: '100%' }}>Update</Button>
          </form>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default UpdateCategoryForm