import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { AlertCircle } from 'lucide-react';
import ViewPDF from './ViewPDF'; // Your PDF viewer component

const ViewPDFdialog = ({ open, onClose, filePath, eventID, userID, status, firstName, lastName }) => {

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>

            <DialogContent>
                {filePath ? (
                    <div className="">
                        <div className='px-4 text-xl' >
                            <div>
                                เอกสารของ : {firstName} {lastName}
                            </div>
                            <div className='flex' >
                                สถานะ :  {status === true ? <p className='text-green-500 px-2' >อนุมัติ</p> : <p className='text-red-500 px-2' > ไม่อนุมัติ</p>}
                            </div>
                        </div>
                        <ViewPDF filePath={filePath} eventID={eventID} userID={userID} setlecedStatus={status} />

                    </div>

                ) : (
                    <div className="flex items-start gap-4 border rounded-lg p-4 bg-red-50">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-red-900">Error</h3>
                            <p className="text-red-800">No PDF file path provided.</p>
                        </div>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );
};

export default ViewPDFdialog;