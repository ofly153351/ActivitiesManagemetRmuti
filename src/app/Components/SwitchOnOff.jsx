import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import React, { useState, useEffect } from 'react';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

function SwitchOnOff({ status: initialStatus, onStatusChange, itemId, pathName }) {
  const [currentStatus, setCurrentStatus] = useState(Boolean(initialStatus));

  useEffect(() => {
    setCurrentStatus(Boolean(initialStatus));
  }, [initialStatus]);

  const handleSwitchChange = async (event) => {
    const newStatus = event.target.checked;
    setCurrentStatus(newStatus);
    try {
      await onStatusChange(itemId, newStatus);
    } catch (error) {
      setCurrentStatus(!newStatus); // Revert if failed
      console.error('Failed to update status:', error);
    }
  };

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      {console.log(pathName)}
      <Typography>{currentStatus ? 'เปิด' : 'ปิด'}</Typography>
      <AntSwitch
        checked={currentStatus}
        onChange={handleSwitchChange}
        inputProps={{ 'aria-label': 'ant design' }}
        disabled={pathName !== '/Admin/MyEvent'}
      />
    </Stack>
  );
}

export default SwitchOnOff;