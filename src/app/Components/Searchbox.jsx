import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
const Searchbox = ({ label, value, onChange }) => {
    return (
        <div className='flex' >
            <button className='flex justify-center items-center p-2 border-[1px] rounded-l-md'>
                <SearchIcon />
            </button>
            <input
                type="text"
                placeholder={label}
                value={value}
                onChange={onChange}
                className="px-2 py-3 border-spacing-1 border-[1px] 
                border-gray-150 rounded-r-md border-l-0  "
            />
        </div>
    );
};

export default Searchbox;