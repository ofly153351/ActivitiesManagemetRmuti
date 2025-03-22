import axios from 'axios';
import Cookies from 'js-cookie';
import { Cookie } from 'next/font/google';
import { jwtDecodeToken } from './function';
import { useStore } from '@/store/useStore';

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
    // 1. Login API call
    const response = await axios.post('http://localhost:8080/login', payload, {
      withCredentials: true,
    });

    // 2. Get token from cookies
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('Token not found in Cookies.');
    }

    // 3. Decode JWT
    const decodedJwt = jwtDecodeToken(token);
    if (!decodedJwt) {
      throw new Error('Invalid token structure.');
    }

    // 4. Get store actions
    const { setUser, setUserRole, fetchUserData } = useStore.getState();

    // 5. Set user role from token
    setUserRole({ role: decodedJwt.role }); // เปลี่ยนเป็นการส่ง object

    // 6. Fetch and set user data
    await fetchUserData();

    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

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

export const CreateEvent = async (role, payload) => {

  const url = role === 'teacher' ? 'http://localhost:8080/protected/teacher/event' : 'http://localhost:8080/protected/admin/event'


  try {
    const response = await axios.post(url, payload,
      {
        withCredentials: true, // ส่ง cookie ไปพร้อมกับคำขอ
      }
    );

    console.log("Event created successfully:", response.data);
    return response.data; // ส่งคืนผลลัพธ์เพื่อใช้ในที่อื่น
  } catch (error) {
    if (error.response) {
      console.log("Server Error:", error.response.data);
    } else {
      console.log("Network or Other Error:", error.message);
    }
  }
};

export const getAllevent = async () => {
  try {
    const response = await axios.get('http://localhost:8080/events', {
      withCredentials: true,
    })
    return response
  } catch (error) {
    console.log(error.message);
  }
}

export const getCurrentEvent = async () => {
  try {
    const response = await axios.get('http://localhost:8080/currentevents', {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);

  }
}
export const getAllowedEvent = async () => {
  try {
    const response = await axios.get('http://localhost:8080/allowedevents', {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);

  }
}

export const getAllUser = async () => {
  try {
    const response = await axios.get('http://localhost:8080/protected/admin/students', {
      withCredentials: true
    })
    return response

  } catch (error) {
    console.log(error.message);

  }
}

export const getAllteacher = async () => {
  try {
    const response = await axios.get('http://localhost:8080/protected/admin/teachers', {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);

  }
}

export const deleteEventByAdmin = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/protected/admin/event/${id}`, {
      withCredentials: true
    },)
    return response
  } catch (error) {
    console.log(error.message);

  }
}

export const deleteEventByTeacher = async (id) => {

  try {
    const response = await axios.delete(`http://localhost:8080/protected/teacher/event/${id}`, {
      withCredentials: true
    },)
    return response
  } catch (error) {
    console.log(error);
  }
}

export const getMyEventTeacher = async () => {
  try {
    const response = await axios.get('http://localhost:8080/protected/teacher/myevents', {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);

  }
}

export const getMyEventAdmin = async () => {
  try {
    const response = await axios.get('http://localhost:8080/protected/admin/myevents', {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);

  }
}

export const editStatusEvent = async (role, id, statusData, token) => {
  const url = role === 'admin'
    ? `http://localhost:8080/protected/admin/status/${id}`
    : `http://localhost:8080/protected/teacher/status/${id}`;

  try {
    const response = await axios.put(url, statusData, {
      headers: {
        Authorization: `Bearer ${token}`, // ส่ง token ใน header
      },
      withCredentials: true
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error updating status:', error.response ? error.response.data : error.message);
    if (error.response) {
      console.log('Error Response:', error.response);
    } else {
      console.log('Error Message:', error.message);
    }
    throw error;
  }
}

export const editEventById = async (role, id, data) => {
  const getCookie = (cookieName) => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((row) => row.startsWith(`${cookieName}=`));
    return cookie ? cookie.split('=')[1] : null;
  };
  const token = getCookie('token'); // ดึง token จาก cookie
  if (!token) {
    console.error('Token not found');
    throw new Error('Authentication token is missing');
  }

  // กำหนด URL ตาม role
  const url = role === 'admin'
    ? `http://localhost:8080/protected/admin/event/${id}`
    : `http://localhost:8080/protected/teacher/event/${id}`;

  try {
    const response = await axios.put(
      url,
      data, // ใส่ข้อมูล body ที่ต้องการส่ง
      {
        headers: {
          Authorization: `Bearer ${token}`, // ส่ง token ใน header
        },
        withCredentials: true, // รองรับ cookie
      }
    );

    console.log('Event updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const joinEvent = async (eventId) => {
  const getCookie = (cookieName) => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((row) => row.startsWith(`${cookieName}=`));
    return cookie ? cookie.split('=')[1] : null;
  };

  const token = getCookie('token');  // ดึง token จาก cookie
  // console.log('Token:', token);  // ตรวจสอบ token

  if (!token) {
    console.error('Token not found');
    throw new Error('Authentication token is missing');
  }

  try {
    const response = await axios.post(
      `http://localhost:8080/protected/student/join/${Number(eventId)}`,
      {},  // ไม่มี body ในการส่ง (ถ้า API ต้องการข้อมูลเพิ่มเติมใน body ให้ใส่)
      {
        headers: {
          Authorization: `Bearer ${token}`,  // ใส่ token ใน header
        },
        withCredentials: true,  // ส่ง cookies
      }
    );
    console.log('Event joined successfully:', response);
    return response;
  } catch (error) {
    console.error('Error joining event:', error.response ? error.response.data : error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);  // ดูรายละเอียดเพิ่มเติมจาก response
    }
    throw error; // หากเกิด error จะโยนออกไป
  }
};

export const getUserInEvent = async (role, id) => {
  const url = role === 'admin' ?
    `http://localhost:8080/protected/admin/checklist/${id}` :
    `http://localhost:8080/protected/teacher/checklist/${id}`

  try {
    const response = await axios.get(url, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);
  } throw error
}

export const checkFileStudent = async (role, eventID, userID, payload) => {
  const url = role === 'admin' ?
    `http://localhost:8080/protected/admin/check/${(eventID)}/${userID}` :
    `http://localhost:8080/protected/teacher/check/${eventID}/${userID}`

  try {
    const response = await axios.put(url, payload, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error.message);
  }
}