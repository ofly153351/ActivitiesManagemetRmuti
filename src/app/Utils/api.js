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

export const editFacultybyID = async (id, payload) => {
  try {
    const response = await axios.put(`http://localhost:8080/protected/admin/faculty/${id}`, payload, {
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
      withCredentials: true,
    })
    return response
  } catch (error) {
    console.log(error)
    console.log(error.response.data);
    throw error
  }
}

export const EditBranchbyID = async (id, payload) => {
  try {
    const response = await axios.put(`http://localhost:8080/protected/admin/branch/${id}`, payload, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const DeleteBranchbyID = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/protected/admin/branch/${id}`,
      {
        withCredentials: true
      }
    )
    return response
  } catch (error) {
    console.log(error.response.status);
    throw error
    Í
  }

}

//get ข้อมูลของ user ทุก field
export const getUserbyClaim = async () => {
  try {
    const response = await axios.get('http://localhost:8080/protected/userbyclaim', {
      withCredentials: true,
    })
    return response
  } catch (error) {
    if (error.response) {
      console.log('Response Error:', error.response.data);
      console.log('Status Code:', error.response.status);
    } else if (error.request) {
      console.log('Request Error:', error.request);
    } else {
      console.log('Error Message:', error.message);
    }
  }
}

export const updateUser = async (payload) => {
  //   {
  //     "user_id":11,
  //     "title_name":"Mr.",
  //     "first_name":"Kaka",
  //     "last_name":"Dev",
  //     "phone":"12341345",
  //     "code":"65172310413-2",
  //     "year":3,
  //     "branch_id":1733
  // }
  try {
    const response = await axios.put('http://localhost:8080/protected/student/personalinfo/', payload, {
      withCredentials: true
    })
    console.log(response.status);
    return response
  } catch (error) {
    if (error.response) {
      console.log('Response Error:', error.response.data);
      console.log('Status Code:', error.response.status);
    } else if (error.request) {
      console.log('Request Error:', error.request);
    } else {
      console.log('Error Message:', error.message);
    }
  }

}

export const updateTeacher = async (payload) => {
  try {
    const response = await axios.put('http://localhost:8080/protected/teacher/personalinfo', payload, {
      withCredentials: true,
    })
    console.log(response.status);
    return response
  } catch (error) {
    if (error.response) {
      console.log('Response Error:', error.response.data);
      console.log('Status Code:', error.response.status);
    } else if (error.request) {
      console.log('Request Error:', error.request);
    } else {
      console.log('Error Message:', error.message);
    }
  }
}