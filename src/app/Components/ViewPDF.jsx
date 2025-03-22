import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import CustomTextfield from './Textfield';
import BasicButtons from './BasicButtons';
import { useStore } from '@/store/useStore';
import { checkFileStudent } from '../Utils/api';
import { ErrorAlert, SuccessAlert } from './Alert';

const ViewPDF = ({ filePath, eventID, userID, setlecedStatus }) => {
    const [status, setStatus] = useState(null); // เก็บสถานะ (ผ่าน/ไม่ผ่าน)
    const { user } = useStore()
    const [comment, setComment] = useState(''); // State เก็บความคิดเห็น
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

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
    const pdfUrl = filePath.startsWith('/Admin/uploads/')
        ? filePath
        : `/Admin/uploads${filePath.startsWith('/') ? filePath : '/' + filePath}`;

    // Function เมื่อกรอกความคิดเห็น
    const handleCommentChange = (e) => {
        setComment(e.target.value); // อัปเดตค่า state
    };

    // Function เมื่อกดปุ่ม
    const handleButtonClick = async (statusValue) => {
        setStatus(statusValue); // เก็บสถานะ
        const payload = {
            event_id: eventID,    // Map ชื่อ key ให้ตรงกับ database
            user_id: userID,
            comment: comment,
            status: statusValue,
        };

        try {
            const response = await checkFileStudent(user.role, Number(eventID), Number(userID), payload)
            setSuccessMessage('ตรวจสอบกิจกรรมเรียบร้อยแล้ว')
            setTimeout(() => {
                window.location.reload();
            }, 500)
            return response
        } catch (error) {
            console.log(error.message);
            setErrorMessage('เกิดข้อผิดพลาดในการตรวจสอบ')
            setTimeout(() => {
                setErrorMessage(false)
            }, 3000)
            throw error
        }

    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            <div className="flex flex-col gap-4">
                {/* PDF Viewer */}
                <iframe
                    src={pdfUrl}
                    className="w-[100%] h-[500px] border rounded-lg"
                    frameBorder="0"
                />

                {/* ช่องแสดงความคิดเห็น */}
                <CustomTextfield
                    label={'แสดงความคิดเห็น'}
                    width={'100%'}
                    onChange={handleCommentChange} // ส่ง callback เพื่ออัปเดต state
                    type={'text'}
                    value={comment} // ผูกกับ state 'comment'
                />
                <div className="flex justify-end gap-5">

                    {!setlecedStatus ? (
                        <BasicButtons
                            label={'ผ่าน'}
                            onClick={() => handleButtonClick(true)} // เมื่อกดปุ่ม 'ผ่าน'
                        />
                    ) : (
                        <BasicButtons
                            hover={'#de0a26'}
                            color={'#f94449'}
                            label={'ไม่ผ่าน'}
                            onClick={() => handleButtonClick(false)} // เมื่อกดปุ่ม 'ไม่ผ่าน'
                        />
                    )}
                </div>

            </div>
            {successMessage && (
                <div className='fixed right-4 bottom-4' >
                    <SuccessAlert label={successMessage} />
                </div>
            )}
            {errorMessage && (
                <div className='fixed right-4 bottom-4' >
                    <SuccessAlert label={errorMessage} />
                </div>
            )}

        </div>
    );
};

export default ViewPDF;