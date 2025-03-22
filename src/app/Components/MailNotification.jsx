import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';


function MailNotification() {
    return (
        <Badge badgeContent={1} color="primary">
            <MailIcon color="action" />
        </Badge>
    );

}

export default MailNotification