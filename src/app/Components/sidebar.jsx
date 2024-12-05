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
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import Button from '@mui/material/Button';
import CreatEventpopup from './CreatEventpopup';
import Creatfaculty from './Creatfaculty';
import CreatBranch from './CreatBranch';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import EditOffIcon from '@mui/icons-material/EditOff';

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const [submenuBranch, setSubmenuBranch] = useState(false);
    const [submenuFaculty, setSubmenuFaculty] = useState(false);

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

    const toggleSubmenuFaculty = () => {
        setSubmenuFaculty((prev) => !prev);
    };

    const toggleSubmenuBranch = () => {
        setSubmenuBranch((prev) => !prev);
    };

    const menuPath = [
        {
            name: 'หน้าแรก',
            link: '/Home',
            icon: <HomeIcon />,
        },
        {
            name: 'แสดงรายชื่อนักศึกษา',
            link: '/Admin/Userlist',
            icon: <PeopleIcon />,
        },
        {
            name: 'กิจกรรมที่เปิดลงทะเบียน',
            link: '/Admin/Eventlist',
            icon: <EventIcon />,
        },
        {
            name: 'สร้างกิจกรรม',
            icon: <EditIcon />,
            action: () => handleDialogToggle('createEvent', true),
        },
        {
            name: 'จัดการคณะ',
            icon: submenuFaculty ? <ExpandLess /> : <ExpandMore />,
            action: toggleSubmenuFaculty,
            Children: [
                {
                    name: 'เรียกดูรายชื่อคณะ',
                    link: '/Admin/Facultylist',
                    icon: <ListIcon sx={{ color: 'gray' }} />,
                },
                {
                    name: 'เพิ่มรายชื่อคณะ',
                    action: () => handleDialogToggle('createFaculty', true),
                    icon: <AddIcon sx={{ color: 'gray' }} />,
                },
            ],
        },
        {
            name: 'จัดการสาขา',
            icon: submenuBranch ? <ExpandLess /> : <ExpandMore />,
            action: toggleSubmenuBranch,
            Children: [
                {
                    name: 'เรียกดูรายชื่อสาขา',
                    link: '/Admin/Branchlist',
                    icon: <ListIcon sx={{ color: 'gray' }} />,
                },
                {
                    name: 'เพิ่มรายชื่อสาขา',
                    action: () => handleDialogToggle('createBranch', true),
                    icon: <AddIcon sx={{ color: 'gray' }} />,
                },
            ],
        },
    ];

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <List sx={{ fontFamily: 'Kanit, sans-serif' }}>
                <div>
                    <h1 className="text-[40px] w-full text-center text-stone-800">Menu</h1>
                </div>
                {menuPath.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem disablePadding>
                            {item.link ? (
                                <Link href={item.link} passHref>
                                    <ListItemButton component="a" onClick={toggleDrawer(false)}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                </Link>
                            ) : (
                                <ListItemButton onClick={item.action}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            )}
                        </ListItem>
                        {item.Children && item.name === 'จัดการคณะ' && submenuFaculty && (
                            <List component="div" disablePadding>
                                {item.Children.map((subItem, subIndex) => (
                                    <ListItem key={subIndex} disablePadding>
                                        {subItem.link ? (
                                            <Link href={subItem.link} passHref>
                                                <ListItemButton component="a">
                                                    <ListItemIcon sx={{ pl: 4 }}>{subItem.icon}</ListItemIcon>
                                                    <ListItemText sx={{ pl: 2 }} primary={subItem.name} />
                                                </ListItemButton>
                                            </Link>
                                        ) : (
                                            <ListItemButton onClick={subItem.action}>
                                                <ListItemIcon sx={{ pl: 4 }}>{subItem.icon}</ListItemIcon>
                                                <ListItemText sx={{ pl: 2 }} primary={subItem.name} />
                                            </ListItemButton>
                                        )}
                                    </ListItem>
                                ))}
                            </List>
                        )}
                        {item.Children && item.name === 'จัดการสาขา' && submenuBranch && (
                            <List component="div" disablePadding>
                                {item.Children.map((subItem, subIndex) => (
                                    <ListItem key={subIndex} disablePadding>
                                        {subItem.link ? (
                                            <Link href={subItem.link} passHref>
                                                <ListItemButton component="a">
                                                    <ListItemIcon sx={{ pl: 4 }}>{subItem.icon}</ListItemIcon>
                                                    <ListItemText sx={{ pl: 2 }} primary={subItem.name} />
                                                </ListItemButton>
                                            </Link>
                                        ) : (
                                            <ListItemButton onClick={subItem.action}>
                                                <ListItemIcon sx={{ pl: 4 }}>{subItem.icon}</ListItemIcon>
                                                <ListItemText sx={{ pl: 2 }} primary={subItem.name} />
                                            </ListItemButton>
                                        )}
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </React.Fragment>
                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <div className="z-20 w-16">
            <Button sx={{ width: 5 , "&:hover" : {
                background : 'none'
            }}} onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ fontSize: '32px' }} />
            </Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
            <CreatEventpopup openDialog={openCreateventDialog} handleCloseDialog={() => handleDialogToggle('createEvent', false)} />
            <Creatfaculty openDialog={openCreatfacultyDialog} handleCloseDialog={() => handleDialogToggle('createFaculty', false)} />
            <CreatBranch openDialog={openCreatBranchDialog} handleCloseDialog={() => handleDialogToggle('createBranch', false)} />
        </div>
    );
}