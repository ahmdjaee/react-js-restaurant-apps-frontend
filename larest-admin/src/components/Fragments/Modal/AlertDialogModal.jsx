import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from "@mui/joy";
import { PiWarning } from "react-icons/pi";

function AlertDialogModal({
    open,
    onClose,
    props = {
        title: 'Delete',
        content: 'Are you sure you want to delete this item?',
        action: 'Delete',
        cancel: 'Cancel',
        icon: <PiWarning />
    },
    onCancel,
    onAction
}) {
    return (
        <Modal sx={{ filter: 'blur(0)' }} open={open} onClose={onClose}>
            <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
                    <PiWarning className="size-5" />
                    {props.title}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    {props.content}
                </DialogContent>
                <DialogActions>
                    <Button variant="solid" color="danger" onClick={onAction}>
                        {props.action}
                    </Button>
                    <Button variant="plain" color="neutral" onClick={onCancel}>
                        {props.cancel}
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
}

export default AlertDialogModal