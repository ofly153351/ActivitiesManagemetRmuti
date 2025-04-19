import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { fontFamily } from '@/app/Utils/font';
import BasicTable from './BasicTable';
import { getStudentEvidenceByID } from '@/app/Utils/api';
import ViewPDFdialog from '../ViewPDFdialog';
ViewPDFdialog
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({ userID, studentYears }) {
    let year = new Date().getFullYear();
    const years = [{ label: year + 542 }, { label: year + 543 }, { label: year + 544 }];
    const [value, setValue] = React.useState(studentYears);
    const [studentEvidence, setStudentEvidence] = React.useState([]);
    const [insideEvents, setInsideEvents] = React.useState([]);
    const [outSideEvents, setOutsideEvents] = React.useState([]);
    const [filePath, setFilePath] = React.useState(null);

    console.log(studentYears);


    useEffect(() => {
        console.log(value);

        const fetchData = async () => {
            try {
                const response = await getStudentEvidenceByID(userID, value)
                setStudentEvidence(response.data);
                setInsideEvents(response.data.inside_events || []);
                setOutsideEvents(response.data.outside_events || [])  // อัปเดตค่าใหม่ทุกครั้ง
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])


    console.log(insideEvents);



    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue);
        if (newValue === undefined) return;
        if (userID) {
            try {
                const fetchData = async () => {
                    const response = await getStudentEvidenceByID(userID, newValue)
                    setStudentEvidence(response.data);
                    setInsideEvents(response.data.inside_events || []);
                    setOutsideEvents(response.data.outside_events || [])
                }
                fetchData()
            } catch (error) {
                console.log(error);
            }
        }


    };

    const handleViewPDF = (file) => {
        console.log(file);
        setFilePath(file)
    }

    const columns = [
        { label: "ชื่อกิจกรรม", value: "event_name" },
        { label: "สถานที่", value: "location" },
        { label: "ชั่วโมงกิจกรรม", value: "working_hour" },
        { label: "สถานะ", value: "status" },
        { label: "ไฟล์เอกสาร", value: "file" },
    ]

    console.log(filePath);


    return (
        <Box sx={{ width: '100%', fontFamily: fontFamily.Kanit }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {years.map((item, index) => (
                        <Tab key={index} value={item.label} label={item.label} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>
            <div className='p-4' >
                <BasicTable column={columns} insideEvents={insideEvents} outsideEvent={outSideEvents} showViewPDF={handleViewPDF} />

            </div>
            {
                filePath && (
                    <ViewPDFdialog
                        open={filePath !== null}
                        filePath={filePath}
                        onClose={() => setFilePath(null)}
                    />
                )
            }
        </Box >
    );
}