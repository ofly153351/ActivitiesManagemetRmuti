export const handleApiError = (error) => {
  if (error.response && error.response.data) {
    const errorData = error.response.data;

    // ตรวจสอบกรณี Duplicate Entry
    if (errorData.error && errorData.error.includes('Duplicate entry')) {
      alert('อีเมลนี้ถูกใช้งานไปแล้ว กรุณาใช้อีเมลอื่น');
      return;
    }

    // ตรวจสอบกรณีมี errors แบบ Object
    if (errorData.errors && typeof errorData.errors === 'object') {
      const errorMessages = errorData.errors;
      for (const key in errorMessages) {
        if (errorMessages.hasOwnProperty(key)) {
          alert(`ข้อผิดพลาด: ${errorMessages[key]}`);
        }
      }
    } else if (errorData.error) {
      alert(`ข้อผิดพลาด: ${errorData.error}`);
    } else {
      alert('เกิดข้อผิดพลาดที่ไม่รู้จัก กรุณาลองใหม่อีกครั้ง');
    }
  } else {
    alert('เกิดข้อผิดพลาดที่ไม่รู้จัก กรุณาลองใหม่อีกครั้ง');
  }
};