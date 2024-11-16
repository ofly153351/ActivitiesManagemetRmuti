import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
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
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import Button from '@mui/material/Button';
import CreatEventpopup from './CreatEventpopup';
import Creatfaculty from './Creatfaculty';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CreatBranch from './CreatBranch';

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const [openCreateventDialog, setOpenCreateventDialog] = useState(false);
    const [openCreatfacultyDialog, setOpenCreatfacultyDialog] = useState(false);
    const [openCreatBranchDialog, setOpenCreatBranchDialog] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleDialogToggle = (dialog, state) => {
        switch (dialog) {
            case 'createEvent':
                setOpenCreateventDialog(state);
                break;
            case 'createFaculty':
                setOpenCreatfacultyDialog(state);
                break;
            case 'createBranch':
                setOpenCreatBranchDialog(state);
                break;
            default:
                break;
        }
    };

    const menuPath = [
        {
            name: 'หน้าแรก',
            link: '/Home',
            icon: <HomeIcon />
        },
        {
            name: 'แสดงรายชื่อนักศึกษา',
            link: '/Admin/Userlist',
            icon: <PeopleIcon />
        },
        {
            name: 'กิจกรรมที่เปิดลงทะเบียน',
            link: '/Admin/Eventlist',
            icon: <EventIcon />
        },
        {
            name: 'สร้างกิจกรรม',
            link: '',
            icon: <EditIcon />,
            action: () => handleDialogToggle('createEvent', true)
        },
        {
            name: 'เพิ่มรายชื่อคณะ',
            icon: <AddRoundedIcon />,
            action: () => handleDialogToggle('createFaculty', true)
        },
        {
            name: 'เพิ่มรายชื่อสาขา',
            icon: <AddRoundedIcon />,
            action: () => handleDialogToggle('createBranch', true)
        }
    ];

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List sx={{ fontFamily: 'Kanit, sans-serif' }}>
                <div>
                    <h1 className='text-[40px] w-full text-center text-stone-800'>Menu</h1>
                </div>
                {menuPath.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={item.action || undefined}>
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
        <div className='z-20 w-16'>
            <Button sx={{ width: 5 }} onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ fontSize: '32px' }} />
            </Button>
            <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>

            <CreatEventpopup openDialog={openCreateventDialog} handleCloseDialog={() => handleDialogToggle('createEvent', false)} />
            <Creatfaculty openDialog={openCreatfacultyDialog} handleCloseDialog={() => handleDialogToggle('createFaculty', false)} />
            <CreatBranch openDialog={openCreatBranchDialog} handleCloseDialog={() => handleDialogToggle('createBranch', false)} />
        </div>
    );
}