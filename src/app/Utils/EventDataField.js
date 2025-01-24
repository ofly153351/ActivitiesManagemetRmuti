const EventDataField = [
    { label: 'ชื่อกิจกรรม', value: (row) => row.event_name },
    { label: 'วันที่เริ่ม', value: (row) => row.start_date },
    { label: 'เวลา', value: (row) => row.start_time },
    { label: 'จำนวนที่ว่าง', value: (row) => row.free_space },
    { label: 'จำนวนที่รับ', value: (row) => row.limit },
    { label: 'สถานที่', value: (row) => row.location },
    { label: 'รายละเอียด', value: (row) => row.detail },
    { label: 'ชั่วโมงทำงาน', value: (row) => row.working_hour },
    { label: 'จัดโดย', value: (row) => `${row.creator.title_name} ${row.creator.first_name} ${row.creator.last_name}` },
    { label: 'เบอร์โทรผู้จัด', value: (row) => row.creator.phone },
    { label: 'ปีการศึกษา', value: (row) => row.years.join(', ') },
    { label: 'แผนก', value: (row) => row.branches.join(', ') },
    { label: 'สถานะ', value: (row) => (row.status ? 'เปิด' : 'ปิด') },
];

export default EventDataField;