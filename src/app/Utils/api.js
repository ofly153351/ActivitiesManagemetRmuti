import axios from 'axios';
//register function api
export const registerUser = async (payload) => {
  try {
    const response = await axios.post('http://localhost:8000/register', payload);
    return response;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

//login function api
export const loginUser = async (payload) => {
  try {
     const response = await axios.post('http://localhost:8000/login', payload, {
      withCredentials: true
     });
     console.log(response);
    return response
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}