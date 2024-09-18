import { Button, DialogContent, DialogTitle, FormControl, FormLabel, IconButton, Input, Modal, ModalDialog, Option, Select, Textarea } from '@mui/joy';
import ImageUploader from '../../../components/Elements/Image/ImageUploader';
import { actionPost, useCrudContext } from '../../../context/CrudContextProvider';
import { getMinDateTime } from '../../../utils/helper';


function UpdateEventForm({ open, onClose }) {
  const { state, dispatch } = useCrudContext();
  const { data } = state;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData?.entries());
    formJson.active = formJson.active === 'true' ? 1 : 0;
    const success = await actionPost(`/admin/events/${data?.id}`, formJson, dispatch, "multipart/form-data")
    if (success) onClose()
  }

  return (
    <>
      <Modal sx={{ filter: 'blur(0)' }} open={open} onClose={onClose}>
        <ModalDialog sx={{ width: '750px' }}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Update event
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
                  <Input
                    defaultValue={data?.title}
                    required
                    name='title'
                    placeholder="Event title"
                    autoFocus />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    defaultValue={data?.description}
                    required
                    placeholder="Type in here…"
                    minRows={4}
                    maxRows={4}
                    name='description'
                  />
                </FormControl>
                <div className="grid grid-cols-2 gap-4">
                  <FormControl>
                    <FormLabel>Type</FormLabel>
                    <Select
                      defaultValue={data?.type}
                      required
                      name='type'
                      placeholder="Select event type"
                    >
                      <Option value='Promo'>Promo</Option>
                      <Option value='Concert'>Concert</Option>
                      <Option value='Workshop'>Workshop</Option>
                      <Option value='Festival'>Festival</Option>
                      <Option value='Flash Sale'>Flash Sale</Option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Active</FormLabel>
                    <Select
                      defaultValue={data?.active}
                      required
                      name='active'
                      placeholder="Active status"
                    >
                      <Option value={true}>Active</Option>
                      <Option value={false}>Inactive</Option>
                    </Select>
                  </FormControl>
                </div>
                <FormControl>
                  <FormLabel>Event Start</FormLabel>
                  <Input
                    defaultValue={data?.event_start}
                    required
                    type="datetime-local"
                    name='event_start'
                    slotProps={{
                      input: {
                        min: data?.event_start ? data?.event_start : getMinDateTime(),
                      },
                    }}
                  />
                </FormControl>
              </div>

              <div className="flex flex-col gap-2 justify-between">
                <FormControl>
                  <FormLabel>Event End</FormLabel>
                  <Input
                    defaultValue={data?.event_end}
                    required
                    name='event_end'
                    type="datetime-local"
                    slotProps={{
                      input: {
                        min: data?.event_end ? data?.event_end : getMinDateTime(),
                      },
                    }}
                  />
                </FormControl>
                <ImageUploader name={"image"} src={data?.image} />
              </div>
            </div>
            <Button type='submit' sx={{ mt: 2, width: '100%' }}>Update</Button>
          </form>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default UpdateEventForm