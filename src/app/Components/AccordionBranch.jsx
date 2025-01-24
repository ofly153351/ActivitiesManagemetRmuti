import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function AccordionBranchList({ selectedRowDetails, branches }) {
    const filteredBranches = selectedRowDetails.branches.map(branchId => 
        branches.find(b => b.branch_id === branchId)
    );

    return (
        <div className="">
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
                        สาขาที่สามารถเข้าร่วมได้
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    {filteredBranches.length > 0 ? (
                        filteredBranches.map((branch, index) =>
                            branch ? (
                                <p key={index} className="font-kanit">
                                    {branch.branch_name}
                                </p>
                            ) : (
                                <p key={index} className="font-kanit text-red-500">
                                    ไม่ทราบชื่อสาขา
                                </p>
                            )
                        )
                    ) : (
                        <p className="font-kanit text-red-500">ไม่มีข้อมูลสาขา</p>
                    )}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default AccordionBranchList;