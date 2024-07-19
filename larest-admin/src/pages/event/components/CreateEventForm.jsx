import { Button, DialogContent, DialogTitle, FormControl, FormLabel, IconButton, Input, Modal, ModalDialog, Option, Select, Textarea } from '@mui/joy';
import ImageUploader from '../../../components/Elements/Image/ImageUploader';
import FloatCircularProgress from '../../../components/Elements/Indicator/FloatProgressIndicator';
import { actionCreate, useCrudContext } from '../../../context/CrudContextProvider';
import { getMinDateTime } from '../../../utils/helper';

function CreateEventForm({ open, onClose }) {
  const { state, dispatch } = useCrudContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    await actionCreate("/admin/events", formJson, dispatch, "multipart/form-data");
  }

  return (
    <>
      {state.loading && <FloatCircularProgress />}
      <Modal sx={{ filter: 'blur(0)' }} open={open} onClose={onClose}>
        <ModalDialog sx={{ width: '750px' }}>
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
                    minRows={3}
                    maxRows={3}
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

                <ImageUploader required name={"image"}/>
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