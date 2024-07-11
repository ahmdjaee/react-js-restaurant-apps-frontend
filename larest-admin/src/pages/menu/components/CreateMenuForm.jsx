import { Button, DialogContent, DialogTitle, FormControl, FormLabel, Input, Modal, ModalDialog, Option, Select, Textarea } from '@mui/joy';
import { useState } from 'react';
import { MdOutlineCloudUpload } from 'react-icons/md';
import CircularProgress from '../../../components/Elements/Indicator/FloatProgressIndicator';
import { VisuallyHiddenInput } from '../../../components/Elements/Input/VisuallyHiddenInput';
import { actionCreate, useCrudContext } from '../../../context/CrudContextProvider';
import FloatCircularProgress from '../../../components/Elements/Indicator/FloatProgressIndicator';

function CreateMenuForm({ open, onClose, onSuccess }) {
  const [image, setImage] = useState(null);
  const { state, dispatch } = useCrudContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    await actionCreate("/admin/menus", formJson, dispatch, "multipart/form-data");
    state.success && onSuccess();
  }
  return (
    <>
      {state.loading && <FloatCircularProgress />}
      <Modal sx={{ filter: 'blur(0)' }} open={open} onClose={onClose}>
        <ModalDialog sx={{ width: '500px' }}>
          <DialogTitle>Create new project</DialogTitle>
          <DialogContent>Fill in the information of the project.</DialogContent>
          <form
            onSubmit={handleSubmit}
            className="w-full"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input name='name' placeholder="Menu name" autoFocus required />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder="Type in here…"
                    minRows={2}
                    maxRows={4}
                    name='description'
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <Input name='price' placeholder="00" type="number" min={0} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Stock</FormLabel>
                  <Input name='stock' placeholder="00" type="number" min={0} required />
                </FormControl>
              </div>

              <div className="flex flex-col gap-2 justify-between">
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Select name='category_id' defaultValue="dog">
                    <Option value="5">Dog</Option>
                    <Option value="6">Cat</Option>
                    <Option value="7">Fish</Option>
                  </Select>
                </FormControl>

                <img src={image} class="border border-zinc-300 w-[175px] h-[175px] object-cover mx-auto " />

                <Button
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                  variant="outlined"
                  color="neutral"
                  startDecorator={<MdOutlineCloudUpload />}
                >
                  Upload a file
                  <VisuallyHiddenInput accept="image/*" onChange={(event) => { setImage(URL.createObjectURL(event.target.files[0])) }} name='image' type="file" />
                </Button>
              </div>
            </div>
            <Button type='submit' sx={{ mt: 2, width: '100%' }}>Create</Button>
          </form>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default CreateMenuForm