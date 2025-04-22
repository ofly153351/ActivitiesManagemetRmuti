import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Kanit } from 'next/font/google';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
    padding: 0,
});


function InputUploadfile({ onFileChange }) {
    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ fontFamily: 'Kanit', height: 50 }}
        >
            เลือกไฟล์
            <VisuallyHiddenInput
                type="file"
                onChange={(event) => {
                    const file = event.target.files?.[0]; // ถ้าเอาแค่ไฟล์เดียว
                    if (file) onFileChange(file);
                }}
            />
        </Button>
    );
}
export default InputUploadfile