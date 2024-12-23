// utils/validation.js

// ตัวอย่างการตรวจสอบรูปแบบของอีเมล
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// ตัวอย่างการตรวจสอบรูปแบบของเบอร์โทร
export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};


export const handleValidationThai = (value, field, handleChange, setValidationMessage) => {
  const thaiRegex = /^[ก-๙\s]*$/; // ตรวจสอบภาษาไทยและเว้นวรรค
  let message = '';

  // ถ้าไม่ใช่ภาษาไทยให้แสดงข้อความแจ้งเตือน
  if (!thaiRegex.test(value)) {
    message = 'กรุณากรอกเฉพาะตัวอักษรภาษาไทย';
  }

  // อัปเดตข้อความแจ้งเตือน
  setValidationMessage((prev) => ({
    ...prev,
    [field]: message,
  }));

  // ถ้าข้อความแจ้งเตือนไม่มี ให้เปลี่ยนค่า state
  if (message === '') {
    handleChange(value, field);
  }
};
//validation รหัสนักศึกษา

export const validateCodeFormat = (value) => {
  const formatRegex = /^\d{11}-\d{1}$/; // ตัวเลข 11 หลัก + "-" + ตัวเลข 1 หลัก
  return formatRegex.test(value);
};

// ฟังก์ชันสำหรับ Validation และตั้งค่าข้อความแจ้งเตือน
export const handleCodeValidation = (value, setCode, setValidationMessage) => {
  setCode(value); // อัปเดตค่าของ code ก่อนเสมอ
  const isValid = validateCodeFormat(value);

  if (!isValid) {
    setValidationMessage((prev) => ({
      ...prev,
      code: 'รูปแบบไม่ถูกต้อง',
    }));
  } else {
    setValidationMessage((prev) => ({
      ...prev,
      code: '',
    }));
  }
};

export const handlePhoneValidation = (value, setPhone, setValidationMessage) => {
  // อัปเดตค่าของ phone ก่อนเสมอ
  setPhone(value);

  // ตรวจสอบรูปแบบเบอร์โทร
  const phonePattern = /^0\d{9}$/;
  if (!phonePattern.test(value)) {
      setValidationMessage((prev) => ({
          ...prev,
          phone: 'เบอร์โทรต้องเป็นตัวเลข 10 หลักและขึ้นต้นด้วย 0',
      }));
  } else {
      setValidationMessage((prev) => ({
          ...prev,
          phone: '',
      }));
  }
};