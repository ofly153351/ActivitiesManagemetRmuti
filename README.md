# Activities Management Frontend

Activities management system (frontend) built with Next.js 14 (App Router) and React 18.  
Supports major user roles such as `admin`, `teacher`, `student`, `officer`, and `superadmin`.

## 1) Tech Stack

- Next.js `14.2.x` (App Router)
- React `18`
- Tailwind CSS `3`
- MUI (`@mui/material`, `@mui/x-data-grid`, `@mui/x-date-pickers`, `@mui/x-charts`)
- Zustand (global state)
- Axios (REST API client)
- Jose / JWT (middleware token validation)
- Radix UI + some shadcn-style components

## 2) Project Structure

```text
.
├── src/
│   ├── app/
│   │   ├── (auth)/                    # auth pages group
│   │   │   ├── Login/page.jsx
│   │   │   └── Register/
│   │   │       ├── Student/page.jsx
│   │   │       └── Teacher/page.jsx
│   │   ├── (routes)/                  # main pages after login
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
│   │   ├── Components/                # app-level shared components
│   │   ├── Utils/                     # helper / API / validation / hash
│   │   ├── layout.js                  # root layout
│   │   ├── page.jsx                   # landing / home page
│   │   └── globals.css
│   ├── components/
│   │   └── ui/                        # UI primitives (e.g. select, dialog)
│   ├── lib/
│   │   └── utils.js
│   ├── middleware.js                  # route protection
│   └── store/
│       └── useStore.js                # global state (zustand)
├── public/                            # static assets / logos / images
├── next.config.mjs
├── tailwind.config.js
├── components.json                    # shadcn config
├── package.json
└── Dockerfile
```

## 3) Key Folders and Files

- `src/app/Utils/api.js`  
  Contains most of the system API functions (auth, event, faculty, branch, evidence, dashboard, etc.)

- `src/store/useStore.js`  
  Manages global state such as user, role, loading, event list, faculties, and branches

- `src/middleware.js`  
  Validates JWT from the `token` cookie before allowing access to `/Admin/*` and `/Information/*`

- `src/app/Components/`  
  Reusable components used across pages, such as tables, dialogs, dashboard cards, upload, and evidence components

## 4) Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_ENCODE_ENV=your_encode_secret
```

Meaning:
- `NEXT_PUBLIC_API_URL`: Base URL of the backend API
- `NEXT_PUBLIC_JWT_SECRET`: Used in middleware to verify JWT
- `NEXT_PUBLIC_ENCODE_ENV`: Used in store/hash logic

## 5) Install and Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 6) Available Scripts

From `package.json`:

- `npm run dev`: Run in development mode
- `npm run build`: Build for production
- `npm run lint`: Lint source code
- `npm run start`: Run `node server.js`

## 7) Important Notes in the Current Repository

- `package.json` sets `start` to `node server.js`, but `server.js` is not currently found in the repository.
- The first line in `Dockerfile` is `ROM node:18-alpine` (it should be `FROM`).

If you want to run production using the standard Next.js flow, use:

```bash
npm run build
npx next start
```

## 8) Suggested Improvements

- Split the API layer by domain (auth/event/admin/student) to reduce the size of `api.js`.
- Add a consistent ESLint/Prettier workflow.
- Add tests for important utilities and store logic.
