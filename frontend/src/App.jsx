import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Login from "./pages/Login.jsx";
import MentorDashboard from "./pages/MentorDashboard.jsx";
import MockInterview from "./pages/MockInterview.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";
import Reports from "./pages/Reports.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import Tasks from "./pages/Tasks.jsx";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const RoleDashboard = () => {
  const { user } = useAuth();
  if (user?.role === "admin") return <AdminDashboard />;
  if (user?.role === "mentor") return <MentorDashboard />;
  return <StudentDashboard />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<RoleDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="interview" element={<MockInterview />} />
        <Route path="reports" element={<Reports />} />
        <Route path="analytics" element={<RoleDashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
