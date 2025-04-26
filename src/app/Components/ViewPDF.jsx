import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import CustomTextfield from './Textfield';
import BasicButtons from './BasicButtons';
import { useStore } from '@/store/useStore';
import { checkFileStudent, viewFilepath } from '../Utils/api';
import { ErrorAlert, SuccessAlert } from './AlertShow';
import { usePathname } from 'next/navigation';


const ViewPDF = ({ filePath, eventID, userID, selectedStatus }) => {
    const [status, setStatus] = useState(null); // เก็บสถานะ (ผ่าน/ไม่ผ่าน)
    const { user } = useStore()
    const [comment, setComment] = useState(''); // State เก็บความคิดเห็น
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

    console.log(API_BASE);

    const pathName = usePathname()
    if (!filePath) {
        return (
            <div className="w-full max-w-3xl mx-auto p-4">
                <div className="flex items-start gap-4 border rounded-lg p-4 bg-red-50">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-red-900">
                            Error
                        </h3>
                        <p className="text-red-800">No PDF file path provided.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Ensure the path starts with /Admin/uploads/


    // Function เมื่อกรอกความคิดเห็น
    const handleCommentChange = (e) => {
        setComment(e.target.value); // อัปเดตค่า state
    };

    // Function เมื่อกดปุ่ม
    const handleButtonClick = async (statusValue) => {
        setStatus(statusValue); // เก็บสถานะ

        const payload = {
            event_id: eventID,
            user_id: userID,
            comment: comment || (statusValue === false ? 'ไม่ผ่านกิจกรรม' : ''),
            status: statusValue,
        };

        try {
            const response = await checkFileStudent(Number(eventID), Number(userID), payload);
            setSuccessMessage('ตรวจสอบกิจกรรมเรียบร้อยแล้ว');
            setTimeout(() => {
                window.location.reload();
            }, 500);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error.message);
            setErrorMessage('เกิดข้อผิดพลาดในการตรวจสอบ');
            setTimeout(() => {
                setErrorMessage(false);
            }, 3000);
            throw error;
        }
    };



    // const pdfUrl = filePath.startsWith('./uploads')
    //     ? `${API_BASE}${filePath.replace('./', '/')}`
    //     : filePath;

    // console.log(filePath);


    let pdfUrl = '';

    if (pathName === '/Admin/MyEvent') {
        pdfUrl = `${API_BASE}/protected/file/${eventID}/${userID}`;
    } else if (pathName.startsWith('/Information/MyEvent/selectedEvent/')) {
        pdfUrl = `${API_BASE}/protected/file-outside/${eventID}/${userID}`;
    }

    console.log(pdfUrl);

    // console.log(pdfUrl);



    return (
        <div className="w-full max-w-5xl mx-auto xs:p-0  xs:mx-0 ">
            <div className="flex flex-col gap-3">
                {/* PDF Viewer */}
                <iframe
                    src={pdfUrl}
                    className={`w-[100%] ${pathName === '/Admin/StudentEvidence' ? 'h-[700px]' : 'h-[500px]'}  border rounded-lg`}
                />
                {/* Display comment and buttons only if not on selectedEvent page */}
                {(!pathName.startsWith('/Information/MyEvent/selectedEvent/') && !pathName.startsWith('/Admin/StudentEvidence') && !pathName.startsWith('/Admin/AllDonesEvidence')) ? (
                    <>
                        <span className="text-red-500 mx-2 w-full">
                            *กรณีที่ไม่ผ่านกรุณาใส่ความคิดเห็น ({'ส่งไฟล์ใหม่'})
                        </span>
                        <CustomTextfield
                            label={'แสดงความคิดเห็น'}
                            width={'100%'}
                            onChange={handleCommentChange}
                            type={'text'}
                            value={comment}
                        />
                        <div className="flex justify-end gap-5">
                            <div className="flex gap-2">
                                {selectedStatus ? (
                                    <BasicButtons
                                        hover={'#de0a26'}
                                        color={'#f94449'}
                                        label={'ไม่อนุมัติ'}
                                        onClick={() => handleButtonClick(false)}
                                    />
                                ) : (
                                    <>
                                        <BasicButtons
                                            hover={'#de0a26'}
                                            color={'#f94449'}
                                            label={'ไม่อนุมัติ'}
                                            onClick={() => handleButtonClick(false)}
                                        />
                                        <BasicButtons
                                            label={'อนุมัติ'}
                                            onClick={() => handleButtonClick(true)}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                ) : null}
            </div>

            {/* Success or error messages */}
            {successMessage && (
                <div className="fixed right-4 bottom-4">
                    <SuccessAlert label={successMessage} />
                </div>
            )}

            {errorMessage && (
                <div className="fixed right-4 bottom-4">
                    <ErrorAlert label={errorMessage} /> {/* Use ErrorAlert for error message */}
                </div>
            )}
        </div>
    );
};

export default ViewPDF;