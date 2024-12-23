
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { fontFamily } from '../Utils/font';

function AlertDelete({ isOpen, onClose, onAgree, label }) {

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{label}</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ fontFamily: 'Kanit, sans-serif' }}>
                <Button onClick={onClose} sx={{ fontFamily: fontFamily.Kanit }}>
                    ยกเลิก
                </Button>
                <Button onClick={onAgree} autoFocus sx={{ fontFamily: fontFamily.Kanit }}>
                    ตกลง
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDelete