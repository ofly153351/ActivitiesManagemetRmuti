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
import Creatfaculty from './Createfaculty';
import CreatBranch from './CreateBranch';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import { ErrorAlert, SuccessAlert } from './Alert';
import { useStore } from '@/store/useStore';
import { name } from 'dayjs/locale/th';

export default function Sidebar() {
    const { user } = useStore()

    const [open, setOpen] = useState(false);
    const [submenuBranch, setSubmenuBranch] = useState(false);
    const [submenuFaculty, setSubmenuFaculty] = useState(false);
    const [openCreateventDialog, setOpenCreateventDialog] = useState(false);
    const [openCreatfacultyDialog, setOpenCreatfacultyDialog] = useState(false);
    const [openCreatBranchDialog, setOpenCreatBranchDialog] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null); // ข้อความ Alert
    const [alertType, setAlertType] = useState("success"); // ประเภท Alert
    const [submenuUser, setSubmenuUser] = useState(false)
    const [submenuEvent, setSubmenuEvent] = useState(false)

    // console.log(user);

    if (!user || !user.role) {
        return null; // หรือแสดง Loading Indicator เช่น <CircularProgress />
    }

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const showAlert = (message, type = "success") => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => {
            setAlertMessage(null);
        }, 3000); // ปิด Alert อัตโนมัติหลัง 3 วินาที
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

    const toggleSubmenuUser = () => {
        setSubmenuUser((prev) => !prev)
    }

    const toggleSubmenuEvent = () => {
        setSubmenuEvent((prev) => !prev);
    };

    const menuPath = [
        {
            name: 'หน้าแรก',
            link: '/Home',
            icon: <HomeIcon />,
        },
        {
            name: 'รายชื่อ นักศึกษา/ครู',
            icon: submenuUser ? <ExpandLess /> : <ExpandMore />,
            action: toggleSubmenuUser,
            Children: [
                {
                    name: 'ดูรายชื่อนักศึกษา',
                    link: '/Admin/Userlist',
                    icon: <ListIcon sx={{ color: 'gray' }} />,
                },
                {
                    name: 'ดูรายชื่ออาจารย์',
                    link: '/Admin/TeacherList',
                    icon: <ListIcon sx={{ color: 'gray' }} />,
                },
            ],
        },
        {
            name: 'เกี่ยวกับกิจกรรม',
            icon: submenuEvent ? <ExpandLess /> : <ExpandMore />,
            action: toggleSubmenuEvent,
            Children: [
                {
                    name: 'สร้างกิจกรรม',
                    icon: <EditIcon />,
                    action: () => handleDialogToggle('createEvent', true),
                },
                {
                    name: 'ดูรายชื่อกิจกรรม',
                    link: '/Admin/EventList',
                    icon: <ListIcon sx={{ color: 'gray' }} />,
                },
                {
                    name: 'กิจกรรมของฉัน',
                    link: '/Admin/MyEvent',
                    icon: <ListIcon sx={{ color: 'gray' }} />,

                }
            ],
        },

        // เพิ่มเฉพาะถ้า role ไม่ใช่ teacher
        ...(user.role === 'admin'
            ? [
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
            ]
            : []
        ),
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
                                <Link className='w-64' href={item.link} passHref>
                                    <ListItemButton component="div" onClick={toggleDrawer(false)}>
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
                        {item.Children && item.name === 'รายชื่อ นักศึกษา/ครู' && submenuUser && (
                            <List component="div" disablePadding>
                                {item.Children.map((subItem, subIndex) => (
                                    <ListItem key={subIndex} disablePadding>
                                        {subItem.link ? (
                                            <Link className='w-64' href={subItem.link} passHref>
                                                <ListItemButton sx={{ width: 'full' }} omponent="a">
                                                    <ListItemIcon sx={{ pl: 4 }}>{subItem.icon}</ListItemIcon>
                                                    <ListItemText sx={{ pl: 4 }} primary={subItem.name} />
                                                </ListItemButton>
                                            </Link>
                                        ) : (
                                            <ListItemButton onClick={subItem.action}>
                                                <ListItemIcon sx={{ pl: 4 }}>{subItem.icon}</ListItemIcon>
                                                <ListItemText sx={{ pl: 4 }} primary={subItem.name} />
                                            </ListItemButton>
                                        )}
                                    </ListItem>
                                ))}
                            </List>
                        )}
                        {item.Children && item.name === 'เกี่ยวกับกิจกรรม' && submenuEvent && (
                            <List component="div" disablePadding>
                                {item.Children.map((subItem, subIndex) => (
                                    <ListItem key={subIndex} disablePadding>
                                        {subItem.link ? (
                                            <Link className='w-64' href={subItem.link} passHref>
                                                <ListItemButton sx={{ width: 'full' }} omponent="a">
                                                    <ListItemIcon sx={{ pl: 4 }}>{subItem.icon}</ListItemIcon>
                                                    <ListItemText sx={{ pl: 4 }} primary={subItem.name} />
                                                </ListItemButton>
                                            </Link>
                                        ) : (
                                            <ListItemButton onClick={subItem.action}>
                                                <ListItemIcon sx={{ pl: 4 }}>{subItem.icon}</ListItemIcon>
                                                <ListItemText sx={{ pl: 4 }} primary={subItem.name} />
                                            </ListItemButton>
                                        )}
                                    </ListItem>
                                ))}
                            </List>
                        )}
                        {item.Children && item.name === 'จัดการคณะ' && submenuFaculty && user.role === 'admin' && (
                            <List component="div" disablePadding>
                                {item.Children.map((subItem, subIndex) => (
                                    <ListItem key={subIndex} disablePadding>
                                        {subItem.link ? (
                                            <Link className='w-64' href={subItem.link} passHref>
                                                <ListItemButton component="div">
                                                    <ListItemIcon sx={{ pl: 4 }}>{subItem.icon}</ListItemIcon>
                                                    <ListItemText sx={{ pl: 4 }} primary={subItem.name} />
                                                </ListItemButton>
                                            </Link>
                                        ) : (
                                            <ListItemButton onClick={subItem.action}>
                                                <ListItemIcon sx={{ pl: 4 }}>{subItem.icon}</ListItemIcon>
                                                <ListItemText sx={{ pl: 4 }} primary={subItem.name} />
                                            </ListItemButton>
                                        )}
                                    </ListItem>
                                ))}
                            </List>
                        )}
                        {item.Children && item.name === 'จัดการสาขา' && submenuBranch && user.role === 'admin' && (
                            <List component="div" disablePadding>
                                {item.Children.map((subItem, subIndex) => (
                                    <ListItem key={subIndex} disablePadding>
                                        {subItem.link ? (
                                            <Link className='w-64' href={subItem.link} passHref>
                                                <ListItemButton component="div">
                                                    <ListItemIcon sx={{ pl: 4 }}>{subItem.icon}</ListItemIcon>
                                                    <ListItemText sx={{ pl: 4 }} primary={subItem.name} />
                                                </ListItemButton>
                                            </Link>
                                        ) : (
                                            <ListItemButton onClick={subItem.action}>
                                                <ListItemIcon sx={{ pl: 4 }}>{subItem.icon}</ListItemIcon>
                                                <ListItemText sx={{ pl: 4 }} primary={subItem.name} />
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
            {alertMessage && (
                <div className="fixed bottom-4 right-[142px]  z-50 w-[300px] duration-150">
                    {alertType === "success" ? (
                        <SuccessAlert label={alertMessage} />
                    ) : (
                        <ErrorAlert label={alertMessage} />
                    )}
                </div>
            )}
            <Button sx={{
                width: 5, "&:hover": {
                    background: 'none'
                }
            }} onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ fontSize: '32px' }} />
            </Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
            <CreatEventpopup openDialog={openCreateventDialog} handleCloseDialog={() => handleDialogToggle('createEvent', false)} />
            <Creatfaculty
                openDialog={openCreatfacultyDialog}
                handleCloseDialog={() => handleDialogToggle('createFaculty', false)}
                onSave={(newFaculty) => {
                    showAlert("เพิ่มคณะสำเร็จ!", "success");
                    console.log(newFaculty);
                }}
            />
            {
                openCreatBranchDialog && (
                    <CreatBranch openDialog={openCreatBranchDialog} handleCloseDialog={() => handleDialogToggle('createBranch', false)} />

                )
            }
        </div>
    );
}