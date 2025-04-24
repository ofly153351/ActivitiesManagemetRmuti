import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import { ErrorAlert, SuccessAlert } from './AlertShow';
import { useStore } from '@/store/useStore';
import { getFaculties, getBranches } from '../Utils/api';
import SelectedAllDones from './AllDonesList/SelectedAllDones';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function Sidebar() {
    const { user, branchesList, facultiesList, setBranchesList, setFacultiesList, userRoleHash, initUserRoleHash } = useStore();
    const [open, setOpen] = useState(false);
    const [submenuBranch, setSubmenuBranch] = useState(false);
    const [submenuFaculty, setSubmenuFaculty] = useState(false);
    const [openCreateventDialog, setOpenCreateventDialog] = useState(false);
    const [openCreatfacultyDialog, setOpenCreatfacultyDialog] = useState(false);
    const [openCreatBranchDialog, setOpenCreatBranchDialog] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState("success");
    const [submenuUser, setSubmenuUser] = useState(false);
    const [submenuEvent, setSubmenuEvent] = useState(false);
    // const [facultiesList, setFacultiesList] = useState([]);
    // const [branchesList, setBranchesList] = useState([]);
    // const [faculties, setFaculties] = useState(null);
    const [openSelectedAllDones, setSelectedAllDones] = useState(false);

    useEffect(() => {
        initUserRoleHash()
    }, [userRoleHash])

    const toggleDrawer = useCallback((newOpen) => () => {
        setOpen(newOpen);
    }, []);


    const showAlert = useCallback((message, type = "success") => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => {
            setAlertMessage(null);
        }, 3000);
    }, []);

    const handleDialogToggle = useCallback((dialog, state) => {
        switch (dialog) {
            case "createEvent":
                if (facultiesList.length === 0) { // ตรวจสอบค่าก่อนเรียก API
                    getFaculties()
                        .then((responseFaculties) => setFacultiesList(responseFaculties.data))
                        .catch(console.error);

                    getBranches()
                        .then((responseBranches) => setBranchesList(responseBranches.data))
                        .catch(console.error);
                }
                setOpenCreateventDialog(state);
                break;

            case "createFaculty":
                setOpenCreatfacultyDialog(state);
                break;

            case "createBranch":
                if (facultiesList.length === 0) {
                    getFaculties()
                        .then((response) => {
                            setFacultiesList(response.data);
                        })
                        .catch(console.error);
                }
                setOpenCreatBranchDialog(state);
                break;
            case "AllDones":
                setSelectedAllDones(state);
                break;
            default:
                break;
        }
    }, [facultiesList]);

    const toggleSubmenuFaculty = useCallback(() => {
        setSubmenuFaculty((prev) => !prev);
    }, []);

    const toggleSubmenuBranch = useCallback(() => {
        setSubmenuBranch((prev) => !prev);
    }, []);

    const toggleSubmenuUser = useCallback(() => {
        setSubmenuUser((prev) => !prev);
    }, []);

    const toggleSubmenuEvent = useCallback(() => {
        setSubmenuEvent((prev) => !prev);
    }, []);

    // ย้าย useMemo ให้ทำงานเฉพาะเมื่อมี user และ userRoleHash
    const menuPath = useMemo(() => {
        if (!user || !userRoleHash) return [];

        
        return [
            {
                name: 'หน้าแรก',
                link: '/',
                icon: <HomeIcon />,
            },
            {
                name: 'Dashboard',
                link: '/Admin',
                icon: <DashboardIcon />,
            },

            {
                name: 'รายชื่อ นักศึกษา/อาจารย์',
                icon: submenuUser ? <ExpandLess /> : <ExpandMore />,
                action: toggleSubmenuUser,
                Children: [
                    {
                        name: 'รายชื่อนักศึกษา',
                        link: '/Admin/Userlist',
                        icon: <ListIcon sx={{ color: 'gray' }} />,
                    },
                    {
                        name: 'รายชื่ออาจารย์',
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
                        link: '/Admin/Eventlist',
                        icon: <ListIcon sx={{ color: 'gray' }} />,
                    },
                    {
                        name: 'กิจกรรมของฉัน',
                        link: '/Admin/MyEvent',
                        icon: <ListIcon sx={{ color: 'gray' }} />,
                    }
                ],
            },
            ...(user?.superUser ? [
                {
                    name: 'นักศึกษาที่ส่งหลักฐานกิจกรรมภายในคณะ',
                    link: '/Admin/StudentEvidence',
                    icon: <ListIcon sx={{ color: 'gray' }} />,
                },
            ] : []),


            // เพิ่มเฉพาะถ้า role ไม่ใช่ teacher
            ...(userRoleHash === 'admin'
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
                    {
                        name: 'สรุปผลการทำกิจกรรม',
                        // link: '/Admin/AllDonesEvidence',
                        icon: <ListIcon sx={{ color: 'gray' }} />,
                        action: () => setSelectedAllDones('break', true),
                    },
                ]
                : []
            ),
        ];
    }, [submenuUser, submenuEvent, submenuFaculty, submenuBranch, user, toggleSubmenuUser, toggleSubmenuEvent, toggleSubmenuFaculty, toggleSubmenuBranch, handleDialogToggle]);

    // ย้าย DrawerList ให้ทำงานเฉพาะเมื่อมี menuPath (ซึ่งจะมีค่าก็ต่อเมื่อมี user และ userRoleHash)
    const DrawerList = useMemo(() => {
        if (!menuPath || menuPath.length === 0) return null;

        return (
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
                            {item.Children && item.name === 'รายชื่อ นักศึกษา/อาจารย์' && submenuUser && (
                                <List component="div" disablePadding>
                                    {item.Children.map((subItem, subIndex) => (
                                        <ListItem key={subIndex} disablePadding>
                                            {subItem.link ? (
                                                <Link className='w-64' href={subItem.link} passHref>
                                                    <ListItemButton sx={{ width: 'full' }} component="div">
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
                                                    <ListItemButton sx={{ width: 'full' }} component="div">
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
                            {item.Children && item.name === 'จัดการคณะ' && submenuFaculty && user && userRoleHash === 'admin' && (
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
                            {item.Children && item.name === 'จัดการสาขา' && submenuBranch && user && userRoleHash === 'admin' && (
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
    }, [menuPath, submenuUser, submenuEvent, submenuFaculty, submenuBranch, toggleDrawer, user]);

    // ถ้าไม่มี user หรือ userRoleHash ให้ return null เลย
    if (!user || !userRoleHash) {
        return null;
    }

    // Return สุดท้ายเฉพาะเมื่อมี user และ userRoleHash แล้วเท่านั้น
    return (
        <div className="z-20 w-16">
            {alertMessage && (
                <div className="fixed bottom-4 right-[142px] z-50 w-[300px] duration-150">
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
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
            <CreatEventpopup
                openDialog={openCreateventDialog}
                handleCloseDialog={() => handleDialogToggle('createEvent', false)
                }
                facultiesList={facultiesList}
                branchesList={branchesList} />
            <Creatfaculty
                openDialog={openCreatfacultyDialog}
                handleCloseDialog={() => handleDialogToggle('createFaculty', false)}
                onSave={(newFaculty) => {
                    showAlert("เพิ่มคณะสำเร็จ!", "success");
                    console.log(newFaculty);
                }}
            />
            <CreatBranch
                openDialog={openCreatBranchDialog}
                handleCloseDialog={() => handleDialogToggle('createBranch', false,)}
                facultiesList={facultiesList} />
            {openSelectedAllDones && (
                <SelectedAllDones
                    facultiesList={facultiesList}
                    setOpen={setSelectedAllDones}
                    open={openSelectedAllDones}
                />
            )}

        </div>
    );
}