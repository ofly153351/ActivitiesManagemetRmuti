import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import dayjs from 'dayjs';

export default function BasicTimeField({ label, onChange, }) {
  const [time, setTime] = React.useState(dayjs().format("HH:mm:ss"));

  const handleChangeTime = (newValue) => {
    const formattedTime = dayjs(newValue).format("HH:mm:ss");
    setTime(formattedTime);
    onChange(formattedTime); // ส่งค่าไปยัง parent component
  };



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeField
        sx={{ width: '100%', paddingX: 1, marginY: 1 }}
        label={label}
        value={dayjs(time, "HH:mm:ss")} // ใช้ค่าในรูปแบบ dayjs
        format="HH:mm:ss"
        onChange={handleChangeTime} // ฟังก์ชันแปลงเวลา
      />
    </LocalizationProvider>
  );
}