//search function

export const filterActivities = (activities, searchQuery) => {
    // ตรวจสอบว่า activities เป็นอาร์เรย์
    if (!Array.isArray(activities)) {
        return []; // คืนค่าอาร์เรย์เปล่าถ้าไม่มีข้อมูล
    }

    // กรองเฉพาะ activities ที่ status ไม่ใช่ false
    const filteredActivities = activities.filter(activity => activity.status !== false);

    // ถ้าไม่มี searchQuery หรือเป็นค่าว่าง คืนค่ากิจกรรมที่กรองแล้วทั้งหมด
    if (!searchQuery || searchQuery.trim() === "") {
        return filteredActivities;
    }

    const lowerQuery = searchQuery.toLowerCase(); // แปลง query เป็นตัวพิมพ์เล็ก

    return filteredActivities.filter(activity =>
        Object.values(activity).some(value => {
            if (value === null || value === undefined) {
                return false; // ข้ามค่า null หรือ undefined
            }
            return value.toString().toLowerCase().includes(lowerQuery);
        })
    );
};
export const filterEvent = (events, searchQuery) => {
    return events.filter(events =>
        events.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        events.id.toLowerCase().includes(searchQuery.toLowerCase())

    );
};
export const filterUser = (persons, searchQuery) => {
    return persons.filter(persons =>
        persons.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        persons.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        persons.lastname.toLowerCase().includes(searchQuery.toLowerCase())
    );
};

//show details โชว์รายระเอียดกิจกรรม
export const handleDetails = (index, selectedDetail, setSelectedDetail) => {
    setSelectedDetail(selectedDetail === index ? null : index);
};

export const filterFaculty = (events, searchQuery) => {
    return events.filter(event =>
        (event.faculty_name && typeof event.faculty_name !== 'undefined' && String(event.faculty_name).toLowerCase().includes(searchQuery.toLowerCase())) ||
        (event.faculty_id && typeof event.faculty_id !== 'undefined' && String(event.faculty_id).toLowerCase().includes(searchQuery.toLowerCase()))
    );
};