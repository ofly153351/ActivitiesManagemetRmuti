import React, { useEffect, useState } from 'react';
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
import { creatBranch, getFaculties } from '../Utils/api';
import { checkValidationfacuiltiesAndbraches, handleKeyDown } from '../Utils/onkeyDown';
import { ErrorAlert, SuccessAlert } from './Alert';
import { fontFamily } from '../Utils/font';
import { useStore } from '@/store/useStore';

function CreatBranch({ openDialog, handleCloseDialog, facultiesList = [] }) {

    

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));  // Desktop
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg')); // iPad
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  // iPhone
    const [selectedFaculties, setSelectedFaculties] = useState('');
    const [branchName, setBranchName] = useState('');
    const [branchID, setBranchID] = useState('');
    const [alertMessage, setAlertMessage] = useState(null); // ข้อความ Alert
    const [alertType, setAlertType] = useState("success"); // ประเภท Alert

    const showAlert = (message, type = "success") => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => {
            setAlertMessage(null);
        }, 3000);
    };

    const resetForm = () => {
        setSelectedFaculties('')
        setBranchName('')
        setBranchID('')
    }

    const handleChange = (event) => {
        setSelectedFaculties(event.target.value);
    };

    const onChangeBranchname = (event) => {
        setBranchName(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFaculties || !branchName || !branchID) {
            alert("Please fill in all fields");
            return;
        }

        console.log("Selected Faculty ID:", selectedFaculties);
        console.log("Branch Name:", branchName);
        console.log("Branch ID:", branchID);

        const payload = {
            faculty_id: selectedFaculties,
            branch_name: branchName,
            branch_code: branchID
        };

        try {
            const response = await creatBranch(payload);
            console.log(response.status);

            if (response.status === 201) {
                console.log("Branch created successfully:", response.data);
                resetForm();
                showAlert("เพิ่มสาขาสำเร็จ!", "success");
                // console.log(alertMessage);
            }
            
        } catch (error) {
            console.error('Error during form submission:', error);
            showAlert("เกิดข้อผิดพลาดในการเพิ่มสาขา", "Error");
            // console.log(alertMessage);

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
            {alertMessage != null && (
                <div className="fixed bottom-4 right-[50px]  z-50 w-[300px] duration-150">
                    {alertType === "success" ? (
                        <SuccessAlert label={alertMessage} />
                    ) : (
                        <ErrorAlert label={alertMessage} />
                    )}
                </div>
            )}
            <form>
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    maxWidth="xs"
                    fullWidth={false}
                    sx={{
                        '& .MuiDialog-paper': {
                            width: isDesktop ? '400px' : isTablet ? '300px' : '200px',
                            maxWidth: '100%',
                        },
                    }}
                >
                    <Box
                        sx={{
                            fontSize: 40,
                            px: { xs: 1, sm: 3 },
                            pt: { xs: 3, md: 3 },
                            fontFamily: 'Kanit',
                            textAlign: 'left',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        เพิ่มรายชื่อสาขา
                    </Box>
                    <DialogContent
                        sx={{
                            minWidth: isDesktop ? 300 : isTablet ? 200 : 'auto',
                            padding: isMobile ? 1 : 3,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'grid',
                                flexDirection: isMobile ? 'column' : 'row',
                                gap: 2,
                                mb: 2,
                            }}
                        >
                            <FormControl>
                                <InputLabel id="demo-simple-select-helper-label">ชื่อคณะ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={selectedFaculties}
                                    label="ชื่อคณะ"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>เลือกคณะ</em>
                                    </MenuItem>
                                    {Array.isArray(facultiesList) &&
                                        facultiesList.map((items, index) => (
                                            <MenuItem key={index} value={items.faculty_id}>
                                                {items.faculty_name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                            <TextField
                                id="1"
                                autoFocus
                                type="text"
                                margin="dense"
                                label="ชื่อสาขา"
                                fullWidth
                                variant="outlined"
                                value={branchName}
                                sx={{
                                    fontFamily: 'Kanit, sans-serif',
                                    width: isMobile ? '100%' : '100%',
                                }}
                                onChange={onChangeBranchname}

                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                mb: 2,
                                display: isMobile ? 'grid' : 'flex',
                            }}
                        >
                            <TextField
                                autoFocus
                                margin="dense"
                                label="รหัสสาขา"
                                fullWidth
                                type="text"
                                inputProps={{ min: 1, maxLength: 4 }}
                                variant="outlined"
                                sx={{ width: isDesktop ? '100%' : '100%' }}
                                onKeyDown={handleKeyDown}
                                value={branchID}
                                onChange={(e) => checkValidationfacuiltiesAndbraches(e, setBranchID)}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleCloseDialog}
                            color="primary"
                            sx={{
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
                                fontSize: 20,
                                fontFamily: 'kanit',
                            }}
                        >
                            ยกเลิก
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            color="primary"
                            sx={{
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
                                fontSize: 20,
                                fontFamily: fontFamily.Kanit,
                            }}
                        >
                            ตกลง
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </Dialog>
    );
}

export default CreatBranch;