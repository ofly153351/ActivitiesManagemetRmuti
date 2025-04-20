import axios from 'axios';
import Cookies from 'js-cookie';
// import { Cookie } from 'next/font/google';
import { jwtDecodeToken } from './function';
import { useStore } from '@/store/useStore';
//register function api

const API_BASE = process.env.NEXT_PUBLIC_API_URL;


export const registerUser = async (payload) => {
  try {
    console.log('Payload being sent:', payload);  // Log the payload

    const response = await axios.post(`${API_BASE}/register/student`, payload, {
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

    const response = await axios.post(`${API_BASE}/register/teacher`, payload, {
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
    const response = await axios.post(`${API_BASE}:8080/login`, payload, {
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
    const response = await axios.post('${API_BASE}/protected/admin/faculty', payload, {
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
    const response = await axios.get('${API_BASE}/faculties')
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
    const response = await axios.delete(`${API_BASE}/protected/admin/faculty/${id}`, {
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
    const response = await axios.put(`${API_BASE}/protected/admin/faculty/${id}`, payload, {
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
    const response = await axios.post('${API_BASE}/protected/admin/branch', payload, {
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
    const response = await axios.get('${API_BASE}/branches', {
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
    const response = await axios.put(`${API_BASE}/protected/admin/branch/${id}`, payload, {
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
    const response = await axios.delete(`${API_BASE}/protected/admin/branch/${id}`,
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
    const response = await axios.get(`${API_BASE}/protected/userbyclaim`, {
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
    const response = await axios.put(`${API_BASE}/protected/student/personalinfo/`, payload, {
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
    const response = await axios.put(`${API_BASE}/protected/teacher/personalinfo`, payload, {
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

export const CreateEvent = async (payload) => {

  console.log(payload);


  try {
    const response = await axios.post(`${API_BASE}/protected/teacher/event`, payload,
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
    const response = await axios.get(`${API_BASE}/events`, {
      withCredentials: true,
    })
    return response
  } catch (error) {
    console.log(error.message);
  }
}

export const getCurrentEvent = async () => {
  try {
    const response = await axios.get(`${API_BASE}/currentevents`, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);

  }
}
export const getAllowedEvent = async () => {
  try {
    const response = await axios.get(`${API_BASE}/allowedevents`, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);

  }
}

export const getAllUser = async () => {
  try {
    const response = await axios.get(`${API_BASE}/protected/admin/students`, {
      withCredentials: true
    })
    return response

  } catch (error) {
    console.log(error.message);

  }
}

export const getAllteacher = async () => {
  try {
    const response = await axios.get(`${API_BASE}/protected/teacher/allteacher`, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);

  }
}

export const deleteEventByAdmin = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE}/protected/admin/event/${Number(id)}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" }
    },)
    return response
  } catch (error) {
    console.log(error.message);
    throw error
  }
}

export const deleteEventByTeacher = async (id) => {

  try {
    const response = await axios.delete(`${API_BASE}/protected/teacher/event/${Number(id)}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" }
    },)
    return response
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const getMyEventTeacher = async () => {
  try {
    const response = await axios.get(`${API_BASE}/protected/teacher/myevents`, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);

  }
}

export const getMyEventAdmin = async () => {
  try {
    const response = await axios.get(`${API_BASE}/protected/teacher/myevents`, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);

  }
}

export const editStatusEvent = async (role, id, statusData, token) => {
  const url = role === 'admin'
    ? `${API_BASE}/protected/admin/status/${id}`
    : `${API_BASE}/protected/teacher/status/${id}`;

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
    ? `${API_BASE}/protected/admin/event/${id}`
    : `${API_BASE}/protected/teacher/event/${id}`;

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
      `${API_BASE}/protected/student/joinevent/${Number(eventId)}`,
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

export const getUserInEvent = async (id) => {
  const url = `${API_BASE}/protected/teacher/checklist/${id}`

  try {
    const response = await axios.get(url, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);
  } throw error
}

export const checkFileStudent = async (eventID, userID, payload) => {
  const url = `${API_BASE}/protected/teacher/check/${eventID}/${userID}`

  try {
    const response = await axios.put(url, payload, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error.message);
  }
}

export const getMyEventStudent = async (currentYear) => {
  try {
    const response = await axios.get(`${API_BASE}/protected/student/myevents/${currentYear}`, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);
  }
}


export const uploadFileMyEvent = async (eventID, file) => {
  try {
    const response = await axios.put(`${API_BASE}/protected/student/upload/${Number(eventID)}`, file, {
      withCredentials: true
    })
    console.log(response);
    return response
  } catch (error) {
    console.log(error);
  }
}

export const uploadFileMyEventOustide = async (eventID, file) => {
  try {
    const response = await axios.put(`${API_BASE}/protected/student/upload-outside/${Number(eventID)}`, file, {
      withCredentials: true
    })
    console.log(response);
    return response
  } catch (error) {
    console.log(error);
  }
}


export const unJoinEvent = async (eventID) => {
  if (eventID) {
    try {
      const response = await axios.delete(`${API_BASE}/protected/student/unjoin/${eventID}`, {
        withCredentials: true
      })
      return response
    } catch (error) {
      console.error(error);
    }
  }
}

export const CreateEventsOutSide = async (payload) => {
  if (payload) {

    try {
      const response = await axios.post('${API_BASE}/protected/student/outside', payload, {
        withCredentials: true
      })
      return response
    } catch (error) {
      console.log(error);

    }
  }
}

export const downloadFileEvents = async (eventID) => {
  if (!eventID) return;

  try {
    const response = await axios.get(
      `${API_BASE}/protected/student/download/${eventID}`,
      {
        withCredentials: true,
        responseType: "blob", // สำคัญ! ให้ Axios รู้ว่ากำลังรับไฟล์
      }
    );

    // สร้าง Blob URL สำหรับไฟล์ที่ได้รับ
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    // สร้างลิงก์ดาวน์โหลด
    const a = document.createElement("a");
    a.href = url;
    a.download = `event_${eventID}.pdf`;
    document.body.appendChild(a);
    a.click();

    // ล้างหน่วยความจำหลังจากดาวน์โหลดเสร็จ
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดาวน์โหลดไฟล์:", error);
  }
};

export const sendSummaryToTeacher = async (year) => {


  const token = Cookies.get('token');

  try {
    const response = await axios.post(
      `${API_BASE}/protected/student/send-event/${year}`,
      {}, // ไม่มี body ก็ส่ง empty object
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      }
    );
    return response;
  } catch (error) {
    console.error("Error from API:", error);
    return { error };
  }
};


export const editRoleByadmin = async (payload) => {
  try {
    const response = await axios.put(`${API_BASE}/protected/admin/role/`, payload, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);
  }
}

export const deleteEventOutside = async (eventID) => {
  try {
    const response = await axios.delete(`${API_BASE}/protected/student/outside/${eventID}`, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);
  }
}

export const getStudentEvidence = async () => {
  try {
    const response = await axios.get(`${API_BASE}/protected/teacher/superuser-check`, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);
  }
}

export const getStudentEvidenceByID = async (userID, year) => {
  try {
    const response = await axios.get(`${API_BASE}/protected/teacher/all-event/${userID}/${year}`, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);
  }
}

export const updatedStatusDonestudent = async (userID, payload) => {
  try {
    const response = await axios.put(`${API_BASE}/protected/teacher/check-all-event/${userID}`, payload, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);
  }
}

export const getAllStudentDonesEvidence = async (year, status, facultyID) => {
  try {
    const response = await axios.get(`${API_BASE}/protected/admin/done?year=${year}&status=${status}&faculty_id=${facultyID}`, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);
  }
}


export const getNews = async () => {
  try {
    const response = await axios.get('${API_BASE}/protected/news', {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);
  }
}

export const ChangeHeaderOffaculty = async (facultyId, payload) => {
  try {
    const response = await axios.put(`${API_BASE}/protected/admin/faculty/${Number(facultyId)}`, payload, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error);
  }
}