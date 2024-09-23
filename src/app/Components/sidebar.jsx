import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import Link from 'next/link';
import React from 'react';

export default function sidebar() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const menuPath = [
        {
            name: 'หน้าแรก',
            link: 'Home',
            icon: <HomeIcon />
        },
        {
            name: 'แสดรายชื่อนักศึกษา',
            link: '/Admin/Userlist',
            icon: <PeopleIcon />

        },
        {
            name: 'กิจกรรที่เปิดลงทะเบียน',
            link: '/Admin/Eventlist',
            icon: <EventIcon />

        },
    ];

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List sx={{ fontFamily: 'Kanit, sans-serif' }}>
                {menuPath.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <Link href={item.link}>
                                <ListItemText primary={item.name} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <div className='z-20' >
            <Button onClick={toggleDrawer(true)}><MenuIcon sx={{ fontSize: '40px' }} /></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}