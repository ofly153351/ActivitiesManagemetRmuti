# Activities Management Frontend

ระบบจัดการกิจกรรม (ฝั่ง Frontend) พัฒนาด้วย Next.js 14 (App Router) และ React 18  
รองรับบทบาทผู้ใช้งานหลัก เช่น `admin`, `teacher`, `student`, `officer`, `superadmin`

## 1) Tech Stack

- Next.js `14.2.x` (App Router)
- React `18`
- Tailwind CSS `3`
- MUI (`@mui/material`, `@mui/x-data-grid`, `@mui/x-date-pickers`, `@mui/x-charts`)
- Zustand (global state)
- Axios (REST API client)
- Jose / JWT (middleware ตรวจสอบ token)
- Radix UI + shadcn-style components บางส่วน

## 2) โครงสร้างโปรเจกต์

```text
.
├── src/
│   ├── app/
│   │   ├── (auth)/                    # กลุ่มหน้า auth
│   │   │   ├── Login/page.jsx
│   │   │   └── Register/
│   │   │       ├── Student/page.jsx
│   │   │       └── Teacher/page.jsx
│   │   ├── (routes)/                  # กลุ่มหน้าหลักหลัง login
│   │   │   ├── Admin/
│   │   │   │   ├── page.jsx
│   │   │   │   ├── Eventlist/page.jsx
│   │   │   │   ├── MyEvent/page.jsx
│   │   │   │   ├── Userlist/page.jsx
│   │   │   │   ├── TeacherList/page.jsx
│   │   │   │   ├── Facultylist/page.jsx
│   │   │   │   ├── Branchlist/page.jsx
│   │   │   │   ├── StudentEvidence/page.jsx
│   │   │   │   └── AllDonesEvidence/page.jsx
│   │   │   └── Information/
│   │   │       ├── page.jsx
│   │   │       └── MyEvent/
│   │   │           ├── page.jsx
│   │   │           └── selectedEvent/[where]/[slug]/page.jsx
│   │   ├── Components/                # shared components ของแอป
│   │   ├── Utils/                     # helper / api / validation / hash
│   │   ├── layout.js                  # root layout
│   │   ├── page.jsx                   # landing / หน้าแรก
│   │   └── globals.css
│   ├── components/
│   │   └── ui/                        # ui primitives (เช่น select, dialog)
│   ├── lib/
│   │   └── utils.js
│   ├── middleware.js                  # route protection
│   └── store/
│       └── useStore.js                # global state (zustand)
├── public/                            # static assets / logo / image
├── next.config.mjs
├── tailwind.config.js
├── components.json                    # shadcn config
├── package.json
└── Dockerfile
```

## 3) โฟลเดอร์สำคัญที่ควรรู้

- `src/app/Utils/api.js`  
  รวม API functions เกือบทั้งหมดของระบบ (auth, event, faculty, branch, evidence, dashboard ฯลฯ)

- `src/store/useStore.js`  
  จัดการ state กลาง เช่น user, role, loading, event list, faculties, branches

- `src/middleware.js`  
  ตรวจ JWT จาก cookie `token` ก่อนเข้าเส้นทาง `/Admin/*` และ `/Information/*`

- `src/app/Components/`  
  component ที่ใช้ซ้ำในหลายหน้า เช่น ตาราง, dialog, dashboard card, upload, evidence

## 4) Environment Variables

สร้างไฟล์ `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_ENCODE_ENV=your_encode_secret
```

ความหมาย:
- `NEXT_PUBLIC_API_URL` base URL ของ backend API
- `NEXT_PUBLIC_JWT_SECRET` ใช้ใน middleware สำหรับ verify JWT
- `NEXT_PUBLIC_ENCODE_ENV` ใช้ใน store/hash logic

## 5) การติดตั้งและรัน

```bash
npm install
npm run dev
```

เปิดที่ `http://localhost:3000`

## 6) Scripts ที่มีในโปรเจกต์

จาก `package.json`:

- `npm run dev` รันโหมดพัฒนา
- `npm run build` build production
- `npm run lint` lint โค้ด
- `npm run start` รัน `node server.js`

## 7) หมายเหตุสำคัญใน repo ปัจจุบัน

- `package.json` ตั้ง `start` เป็น `node server.js` แต่ยังไม่พบไฟล์ `server.js` ใน repository
- `Dockerfile` บรรทัดแรกสะกดเป็น `ROM node:18-alpine` (ควรเป็น `FROM`)

ถ้าต้องการรัน production แบบมาตรฐาน Next.js สามารถใช้คำสั่ง:

```bash
npm run build
npx next start
```

## 8) แนวทางพัฒนาต่อ

- แยก API layer ออกตาม domain (auth/event/admin/student) เพื่อลดขนาดไฟล์ `api.js`
- เพิ่ม ESLint/Prettier workflow ให้สม่ำเสมอ
- เพิ่ม test สำหรับ utility และ store ที่สำคัญ
