import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function CreatBranch({ openDialog, handleCloseDialog }) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));  // Desktop
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg')); // iPad
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  // iPhone
    const [Value, setValue] = useState('')
    const [seletedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

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
                    เพิ่มรายชื่อสาขา
                </Box>
                <DialogContent
                    sx={{
                        minWidth: isDesktop ? 300 : isTablet ? 200 : 'auto',
                        padding: isMobile ? 1 : 3
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: 2,
                            mb: 2
                        }}
                    >
                        <FormControl>
                            <InputLabel id="demo-simple-select-helper-label">ชื่อคณะ</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={seletedValue}
                                label="ชื่อคณะ"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="ชื่อสาขา"
                            fullWidth
                            variant="outlined"
                            sx={{
                                fontFamily: 'Kanit, sans-serif',
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
                            label="รหัสสาขา"
                            fullWidth
                            type='text'
                            inputProps={{ min: 1, maxLength: 4 }}
                            variant="outlined"
                            sx={{ width: isDesktop ? '100%' : '100%' }}
                            onKeyDown={(e) => {
                                if(isNaN(e.key) && e.key !== 'Backspace') {
                                    e.preventDefault();
                                  }
                                // if (['e', 'E', '+', '-'].includes(e.key)) {
                                //     e.preventDefault();  // ป้องกันการใส่ e, E, +, -
                                // }
                            }}
                            value={Value}
                            onChange={(e) => {
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

export default CreatBranch
