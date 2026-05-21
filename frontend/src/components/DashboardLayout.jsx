import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import NotificationToast from "./NotificationToast.jsx";

export default function DashboardLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-area">
        <Navbar />
        <section className="page-content">
          <Outlet />
        </section>
      </main>
      <NotificationToast />
    </div>
  );
}
