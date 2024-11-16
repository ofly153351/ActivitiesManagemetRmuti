import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function Creatfaculty({ openDialog, handleCloseDialog }) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));  // Desktop
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg')); // iPad
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  // iPhone
    const [Value , setValue] = useState('')

    return (
        <div className='w-screen' >
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="xs"
                fullWidth={false}
                sx={{
                    '& .MuiDialog-paper': {
                        width: isDesktop ? '400px' : isTablet ? '300px' : '200px',
                        maxWidth: '100%',
                    }
                }}
            >
                <Box
                    sx={{
                        fontSize: 40,
                        px: { xs: 1, sm: 3 },
                        pt: { xs: 3, md: 3 },
                        fontFamily: "Kanit",
                        textAlign: 'left',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    เพิ่มรายชื่อคณะ
                </Box>
                <DialogContent
                    sx={{
                        minWidth: isDesktop ? 300 : isTablet ? 200 : 'auto',
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
                            label="ชื่อคณะ"
                            fullWidth
                            variant="outlined"
                            sx={{
                                width: isMobile ? "100%" : '100%'
                            }}
                        />
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
                            label="รหัสคณะ"
                            fullWidth
                            type='number'
                            inputProps={{ min: 1 ,maxLength: 4 }}
                            variant="outlined"
                            sx={{ width: isDesktop ? '100%' : '100%' }}
                            onKeyDown={(e) => {
                                if (['e', 'E', '+', '-'].includes(e.key)) {
                                    e.preventDefault();  // ป้องกันการใส่ e, E, +, -
                                }
                            }}
                            value={Value}
                            onChange ={(e) => {
                                const inputValue = e.target.value;
                                if (inputValue.length <= 4) {
                                    setValue(inputValue);
                                }
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary"
                        sx={{
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
                            fontSize: 20,
                            fontFamily: 'kanit'
                        }}
                    >
                        ยกเลิก
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary"
                        sx={{
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
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

export default Creatfaculty
