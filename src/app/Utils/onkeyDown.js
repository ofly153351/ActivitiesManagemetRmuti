// ป้องกันการกรอกตัวอักษรที่ไม่ต้องการ
export const handleKeyDown = (e) => {
    if (isNaN(e.key) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
        e.preventDefault();
    }
};

// Function to validate the input and set the Facultie ID
export const checkValidationfacuiltiesAndbraches = (e, setFacultieID) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && inputValue.length <= 4) {
        setFacultieID(Number(inputValue));  // Update the Facultie ID state
    }
}