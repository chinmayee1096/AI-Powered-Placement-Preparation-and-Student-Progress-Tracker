# AI-Powered Placement Preparation and Student Progress Tracker

Production-style MERN final-year project for placement preparation, AI mock interviews, resume analysis, student progress tracking, mentor review, admin analytics, tasks, notifications-ready schemas, and weekly reports.

## 1. Full Folder Structure

```text
AI-Powered-Placement-Preparation-and-Student-Progress-Tracker/
  backend/
    config/db.js
    config/cloudinary.js
    config/ai.js
    controllers/authController.js
    controllers/studentController.js
    controllers/taskController.js
    controllers/interviewController.js
    controllers/analyticsController.js
    controllers/reportController.js
    middleware/authMiddleware.js
    middleware/roleMiddleware.js
    middleware/errorMiddleware.js
    middleware/validateMiddleware.js
    middleware/rateLimiter.js
    models/User.js
    models/StudentProfile.js
    models/Task.js
    models/MockInterview.js
    models/ProgressLog.js
    models/Feedback.js
    models/Notification.js
    models/Analytics.js
    routes/authRoutes.js
    routes/studentRoutes.js
    routes/taskRoutes.js
    routes/interviewRoutes.js
    routes/analyticsRoutes.js
    routes/reportRoutes.js
    services/aiService.js
    services/analyticsService.js
    services/reportService.js
    utils/generateToken.js
    utils/logger.js
    utils/sampleData.js
    server.js
    package.json
    .env.example
  frontend/
    src/api/axios.js
    src/charts/ProgressChart.jsx
    src/charts/ReadinessChart.jsx
    src/charts/ConsistencyChart.jsx
    src/components/Sidebar.jsx
    src/components/Navbar.jsx
    src/components/DashboardLayout.jsx
    src/components/Loader.jsx
    src/components/EmptyState.jsx
    src/components/Modal.jsx
    src/components/NotificationToast.jsx
    src/context/AuthContext.jsx
    src/forms/LoginForm.jsx
    src/forms/RegisterForm.jsx
    src/forms/TaskForm.jsx
    src/pages/Login.jsx
    src/pages/Register.jsx
    src/pages/StudentDashboard.jsx
    src/pages/MentorDashboard.jsx
    src/pages/AdminDashboard.jsx
    src/pages/Profile.jsx
    src/pages/Tasks.jsx
    src/pages/MockInterview.jsx
    src/pages/Reports.jsx
    src/App.jsx
    src/main.jsx
    src/styles.css
    package.json
    vite.config.js
    .env.example
```

## 2. Backend Package

The backend uses Node.js, Express, Mongoose, JWT, bcrypt, Helmet, CORS, rate limiting, OpenAI, Cloudinary config, and PDFKit. See [backend/package.json](./backend/package.json).

## 3. Backend Environment

Copy [backend/.env.example](./backend/.env.example) to `backend/.env` and set:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/placement_tracker?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret
OPENAI_API_KEY=sk-your-openai-key
CLIENT_URL=http://localhost:5173
```

## 4. MongoDB Connection

[backend/config/db.js](./backend/config/db.js) connects Mongoose to MongoDB Atlas using `MONGO_URI`. Models define collections and indexes. Controllers call models through Mongoose queries. Routes expose those controllers under `/api/*`.

## 5. Models

Collections implemented with Mongoose:

- `users`: auth, roles, active status, hashed password
- `studentprofiles`: placement profile, readiness, resume score
- `tasks`: planner items with status, deadlines, priority
- `mockinterviews`: generated questions, answers, AI feedback
- `progresslogs`: study logs and consistency tracking
- `feedbacks`: mentor feedback
- `notifications`: reminders and alerts
- `analytics`: scalable analytics snapshots

Indexes are defined on `userId`, `studentId`, `createdAt`, `status`, and other query-heavy fields.

## 6. Middleware

Implemented middleware:

- JWT auth: `protect`
- Role-based access: `authorize`
- Central errors: `ApiError`, `errorHandler`, `notFound`
- Validation helpers: `requiredFields`, `validate`
- Rate limiters: general, auth, and AI endpoint limits

## 7. Controllers

Controllers are modular and async/await based:

- Auth registration/login/me
- Student profile, progress logs, resume analysis
- Task CRUD with filtering/pagination
- AI interview generation and answer evaluation
- Student/platform analytics
- Weekly report JSON and PDF export

## 8. Routes

API routes:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
GET  /api/students/profile
PUT  /api/students/profile
POST /api/students/progress
POST /api/students/resume/analyze
GET  /api/tasks
POST /api/tasks
PUT  /api/tasks/:id
DELETE /api/tasks/:id
GET  /api/interviews
POST /api/interviews/generate
POST /api/interviews/:id/submit
GET  /api/analytics/student
GET  /api/analytics/platform
GET  /api/reports/weekly
GET  /api/reports/weekly/pdf
```

## 9. Services

- `aiService.js`: OpenAI interview questions, answer evaluation, resume analysis, improvement plan
- `analyticsService.js`: readiness, task completion, consistency, platform metrics
- `reportService.js`: weekly report builder and PDF stream

## 10. Frontend Package

The frontend uses React, Vite, React Router, Axios, Recharts, and Lucide icons. See [frontend/package.json](./frontend/package.json).

## 11. Frontend Components

Reusable UI components include sidebar navigation, navbar, dashboard layout, loader, empty state, modal, and toast root.

## 12. Frontend Pages

Pages implemented:

- Login
- Register
- Student Dashboard
- Mentor Dashboard
- Admin Dashboard
- Profile
- Tasks
- Mock Interview
- Reports

## 13. Charts

Recharts components:

- Progress line chart
- Readiness donut chart
- Consistency bar chart

## 14. API Integration

[frontend/src/api/axios.js](./frontend/src/api/axios.js) centralizes API calls, base URL, JWT bearer token injection, and error normalization.

## 15. Sample MongoDB Documents

```json
{
  "users": {
    "name": "Aarav Student",
    "email": "student@demo.edu",
    "role": "student",
    "department": "Computer Science",
    "isActive": true
  },
  "studentprofiles": {
    "department": "Computer Science",
    "semester": 7,
    "targetRole": "MERN Stack Developer",
    "targetCompanies": ["TCS", "Infosys", "Zoho"],
    "skills": ["React", "Node.js", "MongoDB", "DSA"],
    "weakTopics": ["System design", "Dynamic programming"],
    "readinessScore": 74,
    "resumeScore": 69
  },
  "tasks": {
    "title": "Solve 5 array problems",
    "category": "coding",
    "priority": "high",
    "status": "in-progress"
  }
}
```

Run the seed script after configuring MongoDB:

```bash
cd backend
npm run seed
```

Demo credentials:

```text
admin@demo.edu / Password123
mentor@demo.edu / Password123
student@demo.edu / Password123
```

## 16. README

This file documents the complete generated codebase, local setup, MongoDB Atlas, deployment, security, and API architecture.

## 17. Setup Instructions

Backend:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Frontend:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Local URLs:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:5000/api/health
```

## 18. MongoDB Atlas Setup

1. Create a MongoDB Atlas account.
2. Create a free or dedicated cluster.
3. Create a database user with read/write access.
4. Add your IP address to Network Access, or use `0.0.0.0/0` for managed deployment testing.
5. Copy the Node.js connection string.
6. Replace username, password, and cluster URL in `MONGO_URI`.
7. Start the backend. Mongoose will create collections and indexes from schemas.

## 19. Deployment Instructions

Render backend:

1. Push this project to GitHub.
2. Create a Render Web Service.
3. Root directory: `backend`.
4. Build command: `npm install`.
5. Start command: `npm start`.
6. Add env vars from `backend/.env.example`.
7. Set `CLIENT_URL` to your Vercel frontend URL.

Vercel frontend:

1. Import the GitHub repo in Vercel.
2. Root directory: `frontend`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add `VITE_API_URL=https://your-render-service.onrender.com/api`.
6. Deploy.

## Security Notes

- Passwords are hashed with bcrypt.
- JWT is required for protected routes.
- Admin accounts are not publicly self-registerable.
- AI endpoints have a dedicated rate limiter.
- Helmet and CORS are enabled.
- Secrets belong only in `.env`, never in source.

## NoSQL Compliance

This project uses MongoDB Atlas and Mongoose only. It does not use SQL, Sequelize, MySQL, PostgreSQL, or SQLite.
