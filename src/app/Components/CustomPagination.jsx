import React from 'react';
import BasicButtons from './BasicButtons';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-end items-center gap-4 p-4 bg-transparent w-full border-[1px] border-slate-200 ">
            <BasicButtons
                width={10}
                height={40}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md bg-transparent text-black disabled:opacity-50 hover:bg-gray-200 transition-colors duration-200"
                label={'Prev'}
            />
            <span className="text-lg text-black">{`Page ${currentPage} of ${totalPages}`}</span>
            <BasicButtons
                width={10}
                height={40}
                label={'Next'}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-md bg-transparent text-white disabled:opacity-50 hover:bg-[#1e73b8] hover:shadow-xl transition-all duration-200"
            />
        </div>
    );
};

export default Pagination;