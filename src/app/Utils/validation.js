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