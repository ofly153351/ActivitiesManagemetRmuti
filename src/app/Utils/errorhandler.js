// utils/errorHandler.js
export const handleApiError = (error) => {
    if (error.response && error.response.data) {
      const errorData = error.response.data;
  
      if (errorData.errors && typeof errorData.errors === 'object') {
        const errorMessages = errorData.errors;
        for (const key in errorMessages) {
          if (errorMessages.hasOwnProperty(key)) {
            alert(`Error: ${errorMessages[key]}`);
          }
        }
      } else if (errorData.error) {
        alert(`Error: ${errorData.error}`);
      } else {
        alert('An unknown error occurred. Please try again.');
      }
    } else {
      alert('An unknown error occurred. Please try again.');
    }
  };