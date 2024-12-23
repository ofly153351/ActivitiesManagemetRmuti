import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { creatFaculties } from '../Utils/api';
import { checkValidationfacuiltiesAndbraches, handleKeyDown } from '../Utils/onkeyDown';

function Creatfaculty({ openDialog, handleCloseDialog, onSave = () => { }, showAlert = () => { } }) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [facultieName, setFacultieName] = useState('');
    const [facultieID, setFacultieID] = useState('');
    const [error, setError] = useState(null);

    const resetForm = () => {
        setFacultieName('');
        setFacultieID('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            faculty_code: facultieID,
            faculty_name: facultieName,
        };
        console.log('[Creatfaculty] Payload:', payload);

        try {
            const response = await creatFaculties(payload);
            console.log("[Creatfaculty] handleCreateFaculty status:", response.status);
            if (response.status === 201) {
                console.log('[Creatfaculty] Calling showAlert with success');
                resetForm();
                onSave(response.data);
                handleCloseDialog();
                showAlert("เพิ่มคณะสำเร็จ!", "success");
            }
        } catch (error) {
            console.log('[Creatfaculty] Calling showAlert with error');
            console.error('Error during form submission:', error);
            setError(`เกิดข้อผิดพลาดในการเพิ่มรายชื่อคณะ (รหัสคณะ ${facultieID})`);
            showAlert("เกิดข้อผิดพลาดในการเพิ่มคณะ", "error");
        }
    };

    return (
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="xs"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    width: isDesktop ? '400px' : isTablet ? '300px' : '200px',
                },
            }}
        >
            <Box sx={{ px: 3, pt: 3, fontFamily: 'Kanit', fontSize: 24, textAlign: 'left' }}>
                เพิ่มรายชื่อคณะ
            </Box>
            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ padding: isMobile ? 1 : 3 }}>
                    <TextField
                        label="ชื่อคณะ"
                        value={facultieName}
                        onChange={(e) => setFacultieName(e.target.value)}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        required
                    />
                    <TextField
                        label="รหัสคณะ"
                        value={facultieID}
                        onChange={(e) => checkValidationfacuiltiesAndbraches(e, setFacultieID)}
                        onKeyDown={handleKeyDown}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        inputProps={{ maxLength: 4 }}
                        required
                    />
                    {error && (
                        <Box sx={{ color: 'red', mt: 1, fontSize: 14 }}>
                            {error}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ fontFamily: 'Kanit' }}>
                        ยกเลิก
                    </Button>
                    <Button type="submit" color="primary" sx={{ fontFamily: 'Kanit' }}>
                        สร้างกิจกรรม
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default Creatfaculty;