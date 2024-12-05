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

function Creatfaculty({ openDialog, handleCloseDialog, onSave }) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [facultieName, setFacultieName] = useState('');
    const [facultieID, setFacultieID] = useState('');
    const [error, setError] = useState(null); // Track errors for display

    const resetForm = () => {
        setFacultieName('');
        setFacultieID('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            faculty_id: facultieID,
            faculty_name: facultieName,
        };

        try {
            const response = await creatFaculties(payload);
            console.log('API Response:', response.data); 
            onSave(response.data); 
            resetForm();
            handleCloseDialog();
        } catch (error) {
            console.error('Error during form submission:', error);
            setError('Failed to create faculty. Please try again.');
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