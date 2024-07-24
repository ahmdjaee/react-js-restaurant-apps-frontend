import { Button, DialogContent, DialogTitle, FormControl, FormLabel, IconButton, Input, Modal, ModalDialog, Option, Select, Textarea } from '@mui/joy';
import ImageUploader from '../../../components/Elements/Image/ImageUploader';
import FloatCircularProgress from '../../../components/Elements/Indicator/FloatProgressIndicator';
import { actionPost, useCrudContext } from '../../../context/CrudContextProvider';
import { ACTION } from '../../../utils/action';
import { getMinDateTime } from '../../../utils/helper';


function UpdateEventForm({ open, onClose }) {
  const { state, dispatch } = useCrudContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    formJson.active = formJson.active === 'true' ? 1 : 0;
    await actionPost(`/admin/events/${state.id}`, formJson, dispatch, "multipart/form-data")
      .then(() => onClose()); 
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: ACTION.CHANGE, name: name, value: value });
  }

  return (
    <>
      {state.loading && <FloatCircularProgress />}
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
                    onChange={handleChange}
                    value={state.title}
                    required
                    name='title'
                    placeholder="Event title"
                    autoFocus />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    onChange={handleChange}
                    value={state.description}
                    required
                    placeholder="Type in here…"
                    minRows={3}
                    maxRows={3}
                    name='description'
                  />
                </FormControl>
                <div className="grid grid-cols-2 gap-4">
                  <FormControl>
                    <FormLabel>Type</FormLabel>
                    <Select
                      value={state.type}
                      onChange={(_, value) => handleChange({ target: { name: 'type', value } })}
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
                      value={state.active}
                      onChange={(_, value) => handleChange({ target: { name: 'active', value } })}
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
                    value={state.event_start}
                    onChange={handleChange}
                    required
                    type="datetime-local"
                    name='event_start'
                    slotProps={{
                      input: {
                        min: state.event_start ? state.event_start : getMinDateTime(),
                      },
                    }}
                  />
                </FormControl>
              </div>

              <div className="flex flex-col gap-2 justify-between">
                <FormControl>
                  <FormLabel>Event End</FormLabel>
                  <Input onChange={handleChange}
                    value={state.event_end}
                    required
                    name='event_end'
                    type="datetime-local"
                    slotProps={{
                      input: {
                        min: state.event_end ? state.event_end : getMinDateTime(),
                      },
                    }}
                  />
                </FormControl>
                <ImageUploader  name={"image"} src={state.image} />
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