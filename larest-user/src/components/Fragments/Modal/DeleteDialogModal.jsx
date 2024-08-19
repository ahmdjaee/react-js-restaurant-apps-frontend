import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from '@mui/joy';

function DeleteDialogModal({
    dialog,
    onClose,
    props = {
        title: 'Delete',
        content: 'Are you sure you want to delete this item?',
        delete: 'Delete',
        cancel: 'Cancel',
        icon: <i className="fa-solid fa-warning" />
    },
    loading,
    onCancel,
    onDelete
}) {
    return (
        <Modal open={dialog} onClose={onClose}>
            <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>
                    <i>{props.icon}</i>
                    {props.title}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    {props.content}
                </DialogContent>
                <DialogActions>
                    <Button loading={loading} loadingPosition='start' variant="solid" color="danger" onClick={onDelete}>
                        {props.delete}
                    </Button>
                    <Button variant="plain" color="neutral" onClick={onCancel}>
                        {props.cancel}
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
}

export default DeleteDialogModal