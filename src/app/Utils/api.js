import axios from 'axios';
//register function api
export const registerUser = async (payload) => {
  try {
    console.log('Payload being sent:', payload);  // Log the payload

    const response = await axios.post('http://localhost:8080/register/student', payload, {
      headers: {
        'Content-Type': 'application/json',
      }, withCredentials: true,
    }
    );
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const registerTeacher = async (payload) => {
  try {
    console.log('Payload being sent:', payload);  // Log the payload

    const response = await axios.post('http://localhost:8080/register/teacher', payload, {
      headers: {
        'Content-Type': 'application/json',
      }, withCredentials: true,
    }
    );
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};



export const loginUser = async (payload) => {
  try {
    const response = await axios.post('http://localhost:8080/login', payload, {
      withCredentials: true
    });
    // console.log(response);
    return response
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

export const creatFaculties = async (payload) => {
  try {
    const response = await axios.post('http://localhost:8080/protected/admin/faculty', payload, {
      withCredentials: true,
    })
    return response
  } catch (error) {
    console.error('Error during login:', error);
    console.log(error.response.data); // Logs the response from the server
    console.log(error.response.status);
    throw error;
  }
}

export const getFaculties = async () => {
  try {
    const response = await axios.get('http://localhost:8080/faculties')
    // console.log(response.data);
    return response
  } catch (error) {
    console.error('Error during login:', error);
    console.log(error.response.data); // Logs the response from the server
    console.log(error.response.status);
    throw error;
  }
}

export const deleteFacultybtID = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/protected/admin/faculty/${id}`, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.error('Error during login:', error);
    console.log(error.response.data.error); 
    console.log(error.response.status);
  }
}

export const editFacultybyID = async (id) => {
  try {
    const response = await axios.put(`http://localhost:8080/protected/admin/faculty/${id}`, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.error('Error during login:', error);
    console.log(error.response.data); 
    console.log(error.response.status);
  }
}


export const creatBranch = async (payload) => {
  try {
    const response = await axios.post('http://localhost:8080/protected/admin/branch', payload, {
      withCredentials: true,
    })
    return response;
  } catch (error) {
    console.error('Error during login:', error);
    console.log(error.response.data); // Logs the response from the server
    console.log(error.response.status);
    throw error;
  }
}

export const getBranches = async () => {
  try {
    const response = await axios.get('http://localhost:8080/branches', {
      withCredentials : true,
    })
    return response
  } catch (error) {
    console.log(error)
    console.log(error.response.data);
    throw error
  }
}

//get ข้อมูลของ user ทุก field
export const getUsernyClaim = async () => {
  try {
    const response = await axios.get('http://localhost:8080/protected/userbyclaim', {
      withCredentials: true,
    })
    return response
  } catch (error) {
    console.error('Error during login:', error);
    console.log(error.response.data); // Logs the response from the server
    console.log(error.response.status);
  }
}


