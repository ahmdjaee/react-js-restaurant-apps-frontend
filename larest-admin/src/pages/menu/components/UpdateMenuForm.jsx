import { Button, DialogContent, DialogTitle, FormControl, FormLabel, IconButton, Input, Modal, ModalDialog, Option, Select, Textarea } from '@mui/joy';
import ImageUploader from '../../../components/Elements/Image/ImageUploader';
import { default as CircularProgress, default as FloatCircularProgress } from '../../../components/Elements/Indicator/FloatProgressIndicator';
import { actionPost, useCrudContext } from '../../../context/CrudContextProvider';
import useFetchData from '../../../hooks/useFetch';

function UpdateMenuForm({ open, onClose }) {
  const { state, dispatch } = useCrudContext();
  const [loading, error, response] = useFetchData("/categories");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    await actionPost(`/admin/menus/${state.id}`, formJson, dispatch, "multipart/form-data")
      .then(() => onClose());
  }

  return (
    <>
      {state.loading && <FloatCircularProgress />}
      <Modal sx={{ filter: 'blur(0)' }} open={open} onClose={onClose}>
        <ModalDialog sx={{ width: '750px' }}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Update Menu
            <IconButton
              variant="plain"
              onClick={onClose}
            >
              ✕
            </IconButton>
          </DialogTitle>
          <DialogContent>Fill in the information of the menu.</DialogContent>
          <form
            onSubmit={handleSubmit}
            className="w-full"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    defaultValue={state.name}
                    name='name'
                    placeholder="Menu name"
                    autoFocus
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    defaultValue={state.description}
                    placeholder="Type in here…"
                    minRows={3}
                    maxRows={3}
                    name='description'
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <Input
                    defaultValue={state.price}
                    name='price'
                    placeholder="00"
                    type="number"
                    min={0}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Stock</FormLabel>
                  <Input
                    defaultValue={state.stock}
                    name='stock'
                    placeholder="00"
                    type="number"
                    min={0}
                    required
                  />
                </FormControl>
              </div>

              <div className="flex flex-col gap-2 justify-between">
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Select name='category_id' defaultValue={state.category?.id} placeholder="Select a category">
                    {loading
                      ? <CircularProgress />
                      : response?.data.map((category) => (
                        <Option
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </Option>
                      ))
                    }
                  </Select>
                </FormControl>

                <ImageUploader src={state.image} />
              </div>
            </div>
            <Button type='submit' sx={{ mt: 2, width: '100%' }}>Update</Button>
          </form>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default UpdateMenuForm