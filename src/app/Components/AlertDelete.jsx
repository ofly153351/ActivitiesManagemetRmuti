
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { fontFamily } from '../Utils/font';
import { red } from '@mui/material/colors';


function AlertDelete({ isOpen, onClose, onAgree, label , status }) {

    return (

        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >

            {!status ? (
                <div>
                    <DialogTitle id="alert-dialog-title">{"ยืนยันการลบ"}</DialogTitle>
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
                </div>
            ) : (
                <div>
                    <DialogTitle sx={{ color: 'red' , padding: 2 }} id="alert-dialog-title">{"กรุณาปิดสถานะกิจกรรมก่อนลบ"}</DialogTitle>
                    <div className='w-full flex justify-end items-center p-2' >
                        <Button onClick={onClose} sx={{ fontFamily: fontFamily.Kanit }}>
                            ตกลง
                        </Button>
                    </div>

                </div>
            )}

        </Dialog>
    )
}

export default AlertDelete