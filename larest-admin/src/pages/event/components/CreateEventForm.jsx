import { Button, DialogContent, DialogTitle, FormControl, FormLabel, IconButton, Input, Modal, ModalDialog, Option, Select, Textarea } from '@mui/joy';
import { useState } from 'react';
import FloatCircularProgress from '../../../components/Elements/Indicator/FloatProgressIndicator';
import { actionCreate, useCrudContext } from '../../../context/CrudContextProvider';
import useFetchData from '../../../hooks/useFetch';
import { getMinDateTime } from '../../../utils/helper';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { VisuallyHiddenInput } from '../../../components/Elements/Input/VisuallyHiddenInput';

function CreateEventForm({ open, onClose, onSuccess }) {
  const [image, setImage] = useState(null);
  const { state, dispatch } = useCrudContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    await actionCreate("/admin/events", formJson, dispatch, "multipart/form-data");
    state.success && onSuccess();
  }

  return (
    <>
      {state.loading && <FloatCircularProgress />}
      <Modal sx={{ filter: 'blur(0)' }} open={open} onClose={onClose}>
        <ModalDialog sx={{ width: '500px' }}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Create new event
            <IconButton
              variant="plain"
              onClick={onClose}
            >
              ✕
            </IconButton>
          </DialogTitle>
          <DialogContent>Fill in the information of the event.</DialogContent>
          <form
            onSubmit={handleSubmit}
            className="w-full grid gap-2"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input required name='title' placeholder="Event title" autoFocus />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    required
                    placeholder="Type in here…"
                    minRows={2}
                    maxRows={4}
                    name='description'
                  />
                  <FormControl>
                    <FormLabel>Type</FormLabel>
                    <Select required name='type' placeholder="Select event type">
                      <Option value='Promo'>Promo</Option>
                      <Option value='Concert'>Concert</Option>
                      <Option value='Workshop'>Workshop</Option>
                      <Option value='Festival'>Festival</Option>
                      <Option value='Flash Sale'>Flash Sale</Option>
                    </Select>
                  </FormControl>
                </FormControl>
                <FormControl>
                  <FormLabel>Event Start</FormLabel>
                  <Input
                    required
                    type="datetime-local"
                    name='event_start'
                    slotProps={{
                      input: {
                        min: getMinDateTime(),
                        // max: '2018-06-14',
                      },
                    }}
                  />
                </FormControl>
              </div>

              <div className="flex flex-col gap-2 justify-between">

                <FormControl>
                  <FormLabel>Event End</FormLabel>
                  <Input
                    required
                    name='event_end'
                    type="datetime-local"
                    slotProps={{
                      input: {
                        min: getMinDateTime(),
                        // max: '2018-06-14',
                      },
                    }}
                  />
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

export default CreateEventForm