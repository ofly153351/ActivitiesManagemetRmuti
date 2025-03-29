'use client'
import axios from 'axios'
import React, { useEffect } from 'react'

function page() {


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/protected/student/download/1', {
                    responseType: 'blob',  // Important to handle PDF as binary data
                    withCredentials: true
                });

                // Create a link element to trigger the download
                const link = document.createElement('a');
                const url = window.URL.createObjectURL(new Blob([response.data]));
                link.href = url;
                link.setAttribute('download', 'file.pdf');  // Name of the downloaded file
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error downloading the PDF:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>pagr</div>
    )
}

export default page