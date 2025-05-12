import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <div className="w-screen flex justify-center items-center p-6 bg-gray-100 border-t-[2px] border-blue-500 ">
            <div className="flex flex-col md:flex-row justify-center items-start gap-8 w-full max-w-6xl text-sm text-gray-700">
                <div className="w-full md:w-1/3">
                    <h3 className="font-semibold mb-2">เกี่ยวกับเรา</h3>
                    <p>
                        เว็บแอปพลิเคชันเพื่อเข้าร่วมกิจกรรมจิตอาสาอย่างสะดวก รวดเร็ว และตรวจสอบได้
                        สนับสนุนการมีส่วนร่วมในสังคมอย่างมีระบบ โปร่งใส และเปลี่ยนแปลงสู่อนาคตที่ดีกว่า
                    </p>
                </div>
                <div className="w-full md:w-1/3">
                    <h3 className="font-semibold mb-2">ติดต่อเรา</h3>
                    <p>โทร: 093-212-3213</p>
                    <p>Email: phiraphat.kl@rmuti.ac.th && thanyathon.de@rmuti.ac.th</p>
                </div>
                <div className="w-full md:w-1/3">
                    <h3 className="font-semibold mb-2">เวลาทำการ</h3>
                    <p>จันทร์ - ศุกร์: 08:00 - 16:00</p>
                </div>
            </div>
        </div>
    )
}

export default Footer