import { Bell, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <header className="navbar">
      <div className="search-box">
        <Search size={18} />
        <input placeholder="Search tasks, reports, students..." />
      </div>
      <div className="nav-actions">
        <button className="icon-button" title="Notifications">
          <Bell size={18} />
        </button>
        <div className="avatar">{user?.name?.charAt(0) || "U"}</div>
      </div>
    </header>
  );
}
