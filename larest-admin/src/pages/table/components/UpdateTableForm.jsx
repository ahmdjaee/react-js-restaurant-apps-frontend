import { Button, Chip, DialogContent, DialogTitle, FormControl, FormLabel, IconButton, Input, Modal, ModalDialog, Option, Select } from '@mui/joy';
import FloatCircularProgress from '../../../components/Elements/Indicator/FloatProgressIndicator';
import { actionUpdate, useCrudContext } from '../../../context/CrudContextProvider';

function UpdateTableForm({ open, onClose }) {
  const { state, dispatch } = useCrudContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    await actionUpdate(`/admin/tables/${state.id}`, formJson, dispatch)
      .then(() => onClose());
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
            <FormControl>
              <FormLabel>Number table</FormLabel>
              <Input
                defaultValue={state.no}
                required
                name='no'
                placeholder="Insert number table"
                autoFocus
              />
            </FormControl>
            <FormControl>
              <FormLabel>Capacity</FormLabel>
              <Input
                defaultValue={state.capacity}
                required
                type='number'
                name='capacity'
                placeholder="Insert capacity table"
                slotProps={{
                  input: {
                    min: 1,
                  },
                }}
                endDecorator={<Chip variant='outlined' color='primary'>Person</Chip>}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                defaultValue={state.status}
                required
                name='status'
                placeholder="Select status"
              >
                <Option value='available'>available</Option>
                <Option value='booked'>booked</Option>
                <Option value='used'>used</Option>
              </Select>
            </FormControl>
            <Button type='submit' sx={{ mt: 2, width: '100%' }}>Update</Button>
          </form>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default UpdateTableForm