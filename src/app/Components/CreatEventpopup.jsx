import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function CreatEventpopup({ openDialog, handleCloseDialog }) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));  // Desktop
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg')); // iPad
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  // iPhone

    return (
        <div className='w-screen'>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="xs" // กำหนดขนาดกรอบให้เล็กลง
                fullWidth={false} // ปิด fullWidth เพื่อให้ขนาด Dialog ไม่เต็มหน้าจอ
                sx={{
                    '& .MuiDialog-paper': {
                        width: isDesktop ? '700px' : isTablet ? '500px' : '400px', // กำหนดขนาดกรอบที่เล็กลงตามหน้าจอ
                        maxWidth: '100%', // ป้องกันการขยายเต็มหน้าจอ
                    }
                }}
            >
                <Box
                    sx={{
                        fontSize: 40,
                        px: { xs: 1, sm: 3 },
                        pt: { xs: 3, md: 3 },
                        fontFamily: "Kanit",
                        textAlign : 'left',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    สร้างกิจกรรม
                </Box>
                <DialogContent
                    sx={{
                        minWidth: isDesktop ? 400 : isTablet ? 400 : 'auto',
                        padding: isMobile ? 1 : 3
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: 2,
                            mb: 2
                        }}
                    >
                        <TextField
                            autoFocus
                            margin="dense"
                            label="ชื่อกิจกรรม"
                            fullWidth
                            variant="outlined"
                            sx={{
                                width: isMobile ? "100%" : '80%'
                            }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="วันที่เริ่มกิจกรรม"
                                sx={{ width: isMobile ? '100%' : '200px', mt: isMobile ? 0 : '8px' }}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 2,
                        display: isMobile ? 'grid' : 'flex'
                    }}
                    >
                        <TextField
                            autoFocus
                            margin="dense"
                            label="จำนวนที่รับ"
                            fullWidth
                            type='number'
                            inputProps={{ min: 1 }}
                            variant="outlined"
                            sx={{ width: isDesktop ? 180 : '100%' }}
                            onKeyDown={(e) => {
                                if (['e', 'E', '+', '-'].includes(e.key)) {
                                    e.preventDefault();  // ป้องกันการใส่ e, E, +, -
                                }
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="จำนวนชั่วโมง"
                            fullWidth
                            variant="outlined"
                            type='number'
                            inputProps={{ min: 1 }}
                            sx={{ width: isDesktop ? 200   : '100%' }}
                            onKeyDown={(e) => {
                                if (['e', 'E', '+', '-'].includes(e.key)) {
                                    e.preventDefault();  // ป้องกันการใส่ e, E, +, -
                                }
                            }}
                        />
                        <TextField
                            autoFocus
                            margin='dense'
                            label='ผู้สร้างกิจกรรม'
                            variant="outlined"
                            fullWidth
                            type='text'
                            sx={{
                                width: isMobile ? '100%' : isTablet ? '100%' : isDesktop ? '100%' : 200
                            }}
                        />
                    </Box>
                    <TextField
                        margin="dense"
                        label="รายละเอียดกิจกรรม"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary"
                        sx={{
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                            fontSize: 20,
                            fontFamily: 'kanit'
                        }}
                    >
                        ยกเลิก
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary"
                        sx={{
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                            fontSize: 20,
                            fontFamily: 'kanit'
                        }}
                    >
                        สร้างกิจกรรม
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreatEventpopup;