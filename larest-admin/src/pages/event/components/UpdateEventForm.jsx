import { Button, DialogContent, DialogTitle, FormControl, FormLabel, IconButton, Input, Modal, ModalDialog, Option, Select, Textarea } from '@mui/joy';
import { useState } from 'react';
import { MdOutlineCloudUpload } from 'react-icons/md';
import FloatCircularProgress from '../../../components/Elements/Indicator/FloatProgressIndicator';
import { VisuallyHiddenInput } from '../../../components/Elements/Input/VisuallyHiddenInput';
import { actionPost, useCrudContext } from '../../../context/CrudContextProvider';
import ImageUploader from '../../../components/Elements/Image/ImageUploader';
import { getMinDateTime } from '../../../utils/helper';
import { ACTION } from '../../../utils/action';


function UpdateEventForm({ open, onClose, data }) {
  const { state, dispatch } = useCrudContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    formJson.active = formJson.active ? 1 : 0;
    await actionPost(`/admin/events/${data.id}`, formJson, dispatch, "multipart/form-data");
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
                    onChange={(e) => handleChange(e)}
                    value={data.title}
                    required
                    name='title'
                    placeholder="Event title"
                    autoFocus />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={data.description}
                    required
                    placeholder="Type in here…"
                    minRows={2}
                    maxRows={4}
                    name='description'
                  />
                </FormControl>
                <div className="grid grid-cols-2 gap-4">
                  <FormControl>
                    <FormLabel>Type</FormLabel>
                    <Select value={data.type} onChange={(e) => handleChange(e)} required name='type' placeholder="Select event type">
                      <Option value='Promo'>Promo</Option>
                      <Option value='Concert'>Concert</Option>
                      <Option value='Workshop'>Workshop</Option>
                      <Option value='Festival'>Festival</Option>
                      <Option value='Flash Sale'>Flash Sale</Option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Active</FormLabel>
                    <Select value={data.active} required name='active' placeholder="Active status">
                      <Option value={true}>Active</Option>
                      <Option value={false}>Inactive</Option>
                    </Select>
                  </FormControl>
                </div>
                <FormControl>
                  <FormLabel>Event Start</FormLabel>
                  <Input
                    value={data.event_start}
                    onChange={(e) => handleChange(e)}
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
                  <Input onChange={(e) => handleChange(e)}
                    value={data.event_end}
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

                {/* <img src={image == null ? data.image : image} class="border border-zinc-300 w-[175px] h-[175px] object-cover mx-auto " />

                <Button
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                  variant="outlined"
                  color="neutral"
                  startDecorator={<MdOutlineCloudUpload />}
                >
                  Upload a file
                  <VisuallyHiddenInput  accept="image/*" onChange={(event) => { setImage(URL.createObjectURL(event.target.files[0])) }} name='image' type="file" />
                </Button> */}
                <ImageUploader src={data.image} />
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