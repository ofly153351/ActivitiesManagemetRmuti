//search function

export const filterActivities = (activities, searchQuery) => {
    return activities.filter(activity =>
        activity.name.toLowerCase().includes(searchQuery.toLowerCase())
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