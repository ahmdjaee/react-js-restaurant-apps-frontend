import { Button, DialogContent, DialogTitle, FormControl, FormLabel, IconButton, Input, Modal, ModalDialog } from '@mui/joy';
import ImageUploader from '../../../components/Elements/Image/ImageUploader';
import FloatCircularProgress from '../../../components/Elements/Indicator/FloatProgressIndicator';
import { actionCreate, useCrudContext } from '../../../context/CrudContextProvider';


function CreateCategoryForm({ open, onClose }) {
  const { state, dispatch } = useCrudContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    await actionCreate(`/admin/categories`, formJson, dispatch)
  }

  return (
    <>
      {state.loading && <FloatCircularProgress />}
      <Modal sx={{ filter: 'blur(0)' }} open={open} onClose={onClose}>
        <ModalDialog sx={{ width: '500px  ' }}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Create new category
            <IconButton
              variant="plain"
              onClick={onClose}
            >
              ✕
            </IconButton>
          </DialogTitle>
          <DialogContent>Fill in the information of the category.</DialogContent>
          <form
            onSubmit={handleSubmit}
            className="w-full grid gap-2"
          >
            <FormControl>
              <FormLabel>Category Name</FormLabel>
              <Input
                required
                name='name'
                placeholder="Insert category name"
                autoFocus
              />
            </FormControl>
            <ImageUploader props={{ required: true }} name={"image"} />
            <Button type='submit' sx={{ mt: 2, width: '100%' }}>Create</Button>
          </form>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default CreateCategoryForm