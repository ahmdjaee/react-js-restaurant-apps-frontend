import { Button, DialogContent, DialogTitle, FormControl, FormHelperText, FormLabel, IconButton, Input, Modal, ModalDialog } from '@mui/joy';
import ImageUploader from '../../../components/Elements/Image/ImageUploader';
import FloatCircularProgress from '../../../components/Elements/Indicator/FloatProgressIndicator';
import { actionPost, useCrudContext } from '../../../context/CrudContextProvider';
function UpdateCategoryForm({ open, onClose }) {
  const { state, dispatch } = useCrudContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    await actionPost(`/admin/categories/${state.id}`, formJson, dispatch, "multipart/form-data")
  }

  return (
    <>
      {state.loading && <FloatCircularProgress />}
      <Modal sx={{ filter: 'blur(0)' }} open={open} onClose={onClose}>
        <ModalDialog sx={{ width: '500px  ' }}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Update table
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
            <FormControl error={state?.error?.name}>
              <FormLabel>Category Name</FormLabel>
              <Input
                type="text"
                defaultValue={state.name}
                required
                name='name'
                placeholder="Insert category name"
                autoFocus
              />
              {state?.error?.name && <FormHelperText >{state?.error?.name}</FormHelperText>}
            </FormControl>
            <ImageUploader src={state.image} name={"image"} />
            <Button type='submit' sx={{ mt: 2, width: '100%' }}>Update</Button>
          </form>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default UpdateCategoryForm