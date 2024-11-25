import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ActivityAccordion({ activity }) {

    return (
        <div className="my-4">
            <Accordion
                sx={{
                    '&:hover': {
                        backgroundColor: 'rgb(245, 245, 244)', // สีเมื่อ hover
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // เพิ่มเงาเมื่อ hover
                    },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel-content"
                    id="panel-header"
                >
                    <div className="font-kanit">
                        รายละเอียดเพิ่มเติมสำหรับ: {activity.name}
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="font-kanit">
                        <p>
                            {activity.location}
                        </p>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default ActivityAccordion;