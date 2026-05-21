import { BarChart3, Bot, ClipboardCheck, FileText, LayoutDashboard, LogOut, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tasks", label: "Tasks", icon: ClipboardCheck },
  { to: "/interview", label: "Interview", icon: Bot },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: UserRound }
];

export default function Sidebar() {
  const { logout, user } = useAuth();
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">AI</span>
        <div>
          <strong>Placement Prep</strong>
          <small>{user?.role || "student"} workspace</small>
        </div>
      </div>
      <nav>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <button className="logout-button" onClick={logout}>
        <LogOut size={18} />
        Sign out
      </button>
    </aside>
  );
}
