import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';


function MailNotification({ newCount }) {
    return (
        <Badge badgeContent={newCount > 0 ? newCount : 0} color="primary">
            <MailIcon color="action" />
        </Badge>
    );

}

export default MailNotification