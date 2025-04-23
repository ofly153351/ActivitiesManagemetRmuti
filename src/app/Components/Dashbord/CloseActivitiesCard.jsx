import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

function CloseActivitiesCard({ eventName, thaiDate, location, detail, status , space }) {

    console.log(thaiDate);

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    ชื่อกิจกรรม : {eventName}
                </Typography>
                <Typography variant="body2">
                    วันที่ : {thaiDate}
                </Typography>
                <Typography variant="body2">
                    สถานที่ : {location}
                </Typography>
                <Typography variant="body2">
                    รายละเอียด : {detail}
                </Typography>
                <Typography variant="body2">
                    จำนวนผู้ที่เข้าร่วม : {space}
                </Typography>
                <Typography variant="body2">
                    สถานะของกิจกรรม : {status ? <span className='text-green-500' >เปิด</span> : <span className='text-red-500' >ปิด</span>}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CloseActivitiesCard